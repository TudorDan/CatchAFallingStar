import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const UpdateCoursePage = () => {
  const [school, setSchool] = useState([]);
  const [course, setCourse] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolId = window.location.href.split("/")[4];
  const courseId = window.location.href.split("/")[6];
  const linkToSchool = `/schools/${schoolId}`;
  const linkToCourse = `/schools/${schoolId}/courses/${courseId}`;
  const linkToSubjects = `/schools/${schoolId}/subjects`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseSchool = await Api.get(linkToSchool);
        const responseCourse = await Api.get(linkToCourse);
        const responseSubjects = await Api.get(linkToSubjects);

        const schoolFromApi = responseSchool.data;
        const courseFromApi = responseCourse.data;
        const subjectsFromApi = responseSubjects.data;

        setSchool(schoolFromApi);
        setCourse(courseFromApi);
        setSubjects(subjectsFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchData();
  }, [linkToSchool, linkToCourse, linkToSubjects]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-center">
      <h1 className="font-weight-bolder" id="school-title">
        {school.name}
      </h1>
      <div className="underline mb-3"></div>

      <h3 className="mt-4">
        <span id="form-subtitle">Update Course</span>
      </h3>
      <div className="text-center">
        <Link to={linkToSchool} className="btn custom-btn">
          Back to school
        </Link>
      </div>
      <div className="card mb-3 mt-5">
        <Formik
          className="mt-2"
          initialValues={{
            Name: "",
            SubjectId: "",
            Description: "",
          }}
          onSubmit={async (courseData) => {
            courseData.SubjectId = parseInt(courseData.SubjectId);
            console.log(courseData);
            setLoading(true);

            try {
              const response = await Api.put(linkToCourse, courseData);
              if (response.status === 204) {
                swal({
                  title: "Good job!",
                  text: "Your course was updated",
                  icon: "success",
                }).then(function () {
                  window.location = `/schools/${schoolId}`;
                });
                console.log("success");
              }
              const courseFromApi = response.data;
              console.log(courseFromApi);

              setLoading(false);
            } catch (error) {
              console.log(error.response);
              const response = error.response;
              if (response.status === 400) {
                swal2
                  .fire({
                    title: `One or more form fields was not completed!`,
                    text: "Please fill out all fields!",
                  })
                  .then(function () {
                    window.location = `/schools/${schoolId}/courses/${courseId}/update`;
                  });
              }

              setLoading(true);
            }
          }}
        >
          {() => (
            <Form className="mt-2 ml-3">
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name:
                </label>
                <Field
                  type="text"
                  name="Name"
                  className="col-sm-9 form-control mt-1"
                  id="name"
                  placeholder={course.name}
                  required
                />
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Current Course Subject:
                </label>
                &nbsp;&nbsp;
                <span className="mt-1 text-muted">
                  {course.subject.subjectName}
                </span>
              </div>
              <div className="form-group row">
                <label htmlFor="subject" className="col-sm-2 col-form-label">
                  New Course Subject:
                </label>
                <Field
                  component="select"
                  name="SubjectId"
                  className="col-sm-9 form-control mt-1"
                  id="subject"
                >
                  {subjects.map((subject) => {
                    const { id, subjectName } = subject;

                    return (
                      <option key={id} value={id}>
                        {subjectName}
                      </option>
                    );
                  })}
                </Field>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="description"
                  className="col-sm-2 col-form-label"
                >
                  Description:
                </label>
                <Field
                  type="text"
                  name="Description"
                  className="col-sm-9 form-control mt-1"
                  id="description"
                  placeholder={course.description}
                  required
                />
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <button type="submit" className="btn custom-btn">
                    Update Course
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateCoursePage;
