import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const AddSchoolPage = () => {
  const linkToSchools = `/schools`;
  const [loading, setLoading] = useState(false);

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
            <p>Add new shool</p>
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
              Mentors: [],
              Students: [],
              Courses: [],
              Catalogues: [],
              Subjects: [],
            }}
            onSubmit={async (schoolData) => {
              console.log(schoolData);
              setLoading(true);

              try {
                const response = await Api.post("/schools", schoolData);
                if (response.status === 201) {
                  swal({
                    title: "Good job!",
                    text: "Your school has been added",
                    icon: "success",
                  }).then(function () {
                    window.location = `/schools`;
                  });
                  console.log("success");
                }
                const schoolFromApi = response.data;
                console.log(schoolFromApi);

                setLoading(false);
              } catch (error) {
                console.log(error.response);
                setLoading(true);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form className="php-email-form">
                <div className="form-group d-flex flex-row">
                  <label
                    htmlFor="schoolName"
                    className="col-sm-2 col-form-label"
                  >
                    School Name:
                  </label>

                  <Field
                    type="text"
                    name="Name"
                    className="w-100 form-control"
                    id="schoolName"
                    placeholder="School name"
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label
                    htmlFor="schoolPhoto"
                    className="col-sm-2 col-form-label"
                  >
                    School Photo:
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
                    id="schoolPhoto"
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
                    placeholder="Principal name"
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label
                    htmlFor="principalPhoto"
                    className="col-sm-2 col-form-label"
                  >
                    Principal Photo:
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
                    id="principalPhoto"
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label
                    htmlFor="birthDate"
                    className="col-sm-2 col-form-label"
                  >
                    Principal BirthDate:
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
                    Add School
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

export default AddSchoolPage;
