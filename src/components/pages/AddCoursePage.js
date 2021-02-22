import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const AddCoursePage = (props) => {
  const [school, setSchool] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const schoolId = window.location.href.split("/")[4];
  const linkForSchool = `/schools/${schoolId}`;
  const linkForPost = `/schools/${schoolId}/courses`;
  const linkForSubjects = `/schools/${schoolId}/subjects`;

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const responseSchool = await Api.get(linkForSchool);
        const responseSubjects = await Api.get(linkForSubjects);

        const schoolFromApi = responseSchool.data;
        const subjectsFromApi = responseSubjects.data;

        setSchool(schoolFromApi);
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

    getSubjects();
  }, [linkForSchool, linkForSubjects]);

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
          <div className="section-title mt-5">
            <h2>Courses</h2>
            <p>Add new course</p>
          </div>

          <Formik
            className="mt-5 mt-lg-0"
            initialValues={{
              Name: "",
              SubjectId: "",
              Description: "",
              Documents: [],
            }}
            onSubmit={async (courseData) => {
              console.log(courseData);
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
                      title: `No subject was selected!`,
                      text: "Please choose something!",
                    })
                    .then(function () {
                      window.location = `/schools/${schoolId}/courses`;
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
                    placeholder="Course name"
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label htmlFor="subject" className="col-sm-2 col-form-label">
                    Course Subject:
                  </label>

                  <Field
                    component="select"
                    name="SubjectId"
                    className="w-100 form-control"
                    id="subject"
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
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn-add">
                    Add Course
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>

      <div className="why-us">
        <div className="content text-center">
          <Link to={linkForSchool} className="more-btn">
            <i className="bx bx-chevron-left"></i> Cancel
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddCoursePage;
