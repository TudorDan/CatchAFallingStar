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
        setSubjects([
          { id: null, name: "Please choose an option" },
          ...subjectsFromApi,
        ]);

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
    <>
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>{school.name}</h2>
          <p>Motto: Audaces fortuna juvat</p>
        </div>
      </div>

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Courses</h2>
            <p>Update course</p>
          </div>

          <Formik
            className="mt-5 mt-lg-0"
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
              <Form className="php-email-form">
                <div className="form-group d-flex flex-row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">
                    Name:
                  </label>

                  <Field
                    type="text"
                    name="Name"
                    className="w-100 form-control"
                    id="name"
                    placeholder={course.name}
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label className="col-sm-2 col-form-label">
                    Current Course Subject:
                  </label>
                  &nbsp;&nbsp;
                  <span className="w-100 text-muted">
                    {course.subject.name}
                  </span>
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label htmlFor="subject" className="col-sm-2 col-form-label">
                    New Course Subject:
                  </label>

                  <Field
                    component="select"
                    name="SubjectId"
                    className="w-100 form-control"
                    id="subject"
                    required
                  >
                    {subjects.map((subject) => {
                      const { id, name } = subject;

                      return (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      );
                    })}
                  </Field>
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label
                    htmlFor="description"
                    className="col-sm-2 col-form-label"
                  >
                    Description:
                  </label>

                  <Field
                    type="text"
                    name="Description"
                    className="w-100 form-control"
                    id="description"
                    placeholder={course.description}
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn-add">
                    Update Course
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>

      <div className="why-us">
        <div className="content text-center">
          <Link to={linkToSchool} className="more-btn">
            <i className="bx bx-chevron-left"></i> Cancel
          </Link>
        </div>
      </div>
    </>
  );
};

export default UpdateCoursePage;
