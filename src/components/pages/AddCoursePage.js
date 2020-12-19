import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const AddCoursePage = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const schoolID = useParams().id;
  const schoolName = props.location.schoolData.schoolTitle;
  const linkToSchool = `/schools/${schoolID}`;
  const linkForPost = `/schools/${schoolID}/courses`;

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/subjects`);
        const subjectsFromApi = response.data;
        setSubjects(subjectsFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSubjects();
  }, [schoolID]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-center">
      <h1 className="font-weight-bolder" id="school-title">
        {schoolName}
      </h1>
      <div className="underline mb-3"></div>
      <h3 className="mt-4">Add new Course</h3>
      <Link to={linkToSchool} className="btn custom-btn">
        Back to school menu
      </Link>

      <div className="card mb-3 mt-5">
        <Formik
          className="mt-2"
          initialValues={{
            Name: "",
            SubjectId: "",
            Description: "",
            Documents: [],
          }}
          onSubmit={async (courseData) => {
            courseData.SubjectId = parseInt(courseData.SubjectId);
            console.log(courseData);

            setLoading(true);
            try {
              const response = await Api.post(linkForPost, courseData);
              if (response.status === 201) {
                swal({
                  title: "Good job!",
                  text: "Your course was added",
                  icon: "success",
                }).then(function () {
                  window.location = `/schools/${schoolID}`;
                });
                console.log("success");
              }
              const courseFromApi = response.data;
              console.log(courseFromApi);

              setLoading(false);
            } catch (error) {
              console.log(error.response);
              setLoading(true);
            }
          }}
        >
          {() => (
            <Form className="mt-2">
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name:
                </label>
                <Field
                  type="text"
                  name="Name"
                  className="col-sm-9 form-control mt-1"
                  id="name"
                  placeholder="Course name"
                  required
                />
              </div>
              <div className="form-group row">
                <label htmlFor="subject" className="col-sm-2 col-form-label">
                  Course Subject:
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
                  required
                />
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <button type="submit" className="btn custom-btn">
                    Add Course
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

export default AddCoursePage;
