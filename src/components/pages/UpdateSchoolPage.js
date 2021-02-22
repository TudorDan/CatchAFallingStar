import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const UpdateSchoolPage = () => {
  const schoolId = window.location.href.split("/")[4];
  const [school, setSchool] = useState([]);
  const [loading, setLoading] = useState(true);
  const linkToSchool = `/schools/${schoolId}`;
  const linkToSchools = `/schools`;

  useEffect(() => {
    const getSchool = async () => {
      setLoading(true);
      try {
        const response = await Api.get(linkToSchool);
        const schoolFromApi = response.data;
        console.log(schoolFromApi);
        setSchool(schoolFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchool();
  }, [linkToSchool]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>Schools Form</h2>
          <p>For administrators only</p>
        </div>
      </div>

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Schools</h2>
            <p>Update shool</p>
          </div>

          <Formik
            className="mt-5 mt-lg-0"
            initialValues={{
              Name: "",
              Photo: "",
              Principal: {
                Name: "",
                Photo: "",
                BirthDate: "",
                AccessRights: 2,
              },
            }}
            onSubmit={async (schoolData) => {
              console.log(schoolData);
              setLoading(true);

              try {
                const response = await Api.put(linkToSchool, schoolData);
                if (response.status === 204) {
                  swal({
                    title: "Good job!",
                    text: "Your school was updated",
                    icon: "success",
                  }).then(function () {
                    window.location = `/schools`;
                  });
                  console.log("success");
                }
                const personFromApi = response.data;
                console.log(personFromApi);

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
                      window.location = `/schools`;
                    });
                }

                setLoading(true);
              }
            }}
          >
            {({ setFieldValue }) => (
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
                    placeholder={school.name}
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label className="col-sm-2 col-form-label">
                    Current School Photo:
                  </label>
                  &nbsp;&nbsp;
                  <span className="w-100 text-muted">{school.photo}</span>
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label htmlFor="photo" className="col-sm-2 col-form-label">
                    New Photo:
                  </label>

                  <input
                    type="file"
                    name="Photo"
                    onChange={(event) => {
                      if (event.target.files[0]) {
                        setFieldValue("Photo", event.target.files[0].name);
                      } else {
                        setFieldValue("Photo", "");
                      }
                    }}
                    className="w-100 form-control form-control-lg"
                    id="photo"
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label
                    htmlFor="principalName"
                    className="col-sm-2 col-form-label"
                  >
                    Principal Name:
                  </label>

                  <Field
                    type="text"
                    name="Principal.Name"
                    className="w-100 form-control"
                    id="principalName"
                    placeholder={school.principal?.name}
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label className="col-sm-2 col-form-label">
                    Current Principal Photo:
                  </label>
                  &nbsp;&nbsp;
                  <span className="w-100 text-muted">
                    {school.principal?.photo}
                  </span>
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label htmlFor="photo" className="col-sm-2 col-form-label">
                    New Principal Photo:
                  </label>

                  <input
                    type="file"
                    name="Principal.Photo"
                    onChange={(event) => {
                      if (event.target.files[0]) {
                        setFieldValue(
                          "Principal.Photo",
                          event.target.files[0].name
                        );
                      } else {
                        setFieldValue("Principal.Photo", "");
                      }
                    }}
                    className="w-100 form-control form-control-lg"
                    id="photo"
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label className="col-sm-2 col-form-label">
                    Current Principal BirthDate:
                  </label>
                  &nbsp;&nbsp;
                  <span className="w-100 text-muted">
                    {school.principal.birthDate
                      ? school.principal.birthDate.substr(0, 10)
                      : null}
                  </span>
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label
                    htmlFor="birthDate"
                    className="col-sm-2 col-form-label"
                  >
                    New BirthDate:
                  </label>

                  <Field
                    type="date"
                    name="Principal.BirthDate"
                    min="1901-01-01"
                    max="2014-01-01"
                    className="w-100 form-control"
                    id="birthDate"
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn-add">
                    Update School
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>

      <div className="why-us">
        <div className="content text-center">
          <Link to={linkToSchools} className="more-btn">
            <i className="bx bx-chevron-left"></i> Cancel
          </Link>
        </div>
      </div>
    </>
  );
};

export default UpdateSchoolPage;
