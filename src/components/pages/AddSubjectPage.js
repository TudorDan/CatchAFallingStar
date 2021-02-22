import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const AddSubjectPage = (props) => {
  const [school, setSchool] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolId = window.location.href.split("/")[4];
  const linkToSchool = `/schools/${schoolId}`;
  const linkForPost = `/schools/${schoolId}/subjects`;
  const linkGetSubjects = `/schools/${schoolId}/subjects`;

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const responseSchool = await Api.get(linkToSchool);
        const response = await Api.get(linkGetSubjects);

        const schoolFromApi = responseSchool.data;
        const subjectsFromAPI = response.data;

        setSchool(schoolFromApi);
        setSubjects(subjectsFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error.response);
        setLoading(true);
      }
    };

    getSubjects();
  }, [linkToSchool, linkGetSubjects]);

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
          <div className="section-title mt-5 mb-5">
            <h2>Subjects</h2>
            <p>Add new subject</p>
          </div>

          <Formik
            className="mt-5 mt-lg-0"
            initialValues={{
              Name: "",
            }}
            onSubmit={async (subjectData) => {
              subjectData.Name = subjectData.Name.toUpperCase();
              console.log(subjectData);

              setLoading(true);
              try {
                const response = await Api.post(linkForPost, subjectData);
                if (response.status === 201) {
                  swal({
                    title: "Good job!",
                    text: "Your subject was added",
                    icon: "success",
                  }).then(function () {
                    window.location = `/schools/${schoolId}`;
                  });
                  console.log("success");
                }
                const subjectFromApi = response.data;
                console.log(subjectFromApi);

                setLoading(false);
              } catch (error) {
                console.log(error.response);
                const response = error.response;
                let subjectName = "";

                subjects.map((subject) => {
                  if (subject.name === subjectData.Name) {
                    subjectName = subject.name;
                  }
                  return "subject check finished";
                });
                if (response.status === 409) {
                  swal2
                    .fire({
                      title: `Subject ${subjectName} already exists in this school!`,
                      text: "Choose something else!",
                    })
                    .then(function () {
                      window.location = `/schools/${schoolId}/subjects`;
                    });
                }
                if (response.status === 400) {
                  swal2
                    .fire({
                      title: `No subject was selected!`,
                      text: "Please choose something!",
                    })
                    .then(function () {
                      window.location = `/schools/${schoolId}/subjects`;
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
                    placeholder="New Subject"
                    required
                    id="name"
                  />
                </div>

                <div className="text-center mt-5 mb-4">
                  <button type="submit" className="btn-add">
                    Add Subject
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

export default AddSubjectPage;
