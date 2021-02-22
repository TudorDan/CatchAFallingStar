import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const AddPersonPage = (props) => {
  const schoolID = useParams().id;
  const schoolName = props.location.schoolData.schoolTitle;
  const personType = props.location.schoolData.accessRights;
  const linkToSchool = `/schools/${schoolID}`;
  const [loading, setLoading] = useState(false);
  const linkForPost =
    personType === 0
      ? `/schools/${schoolID}/mentors`
      : personType === 1
      ? `/schools/${schoolID}/students`
      : `/schools/${schoolID}/principal`;

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>{schoolName}</h2>
          <p>Motto: Audaces fortuna juvat</p>
        </div>
      </div>

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title mt-5">
            <h2>Persons</h2>
            <p>
              Add new{" "}
              {personType === 0
                ? "mentor"
                : personType === 1
                ? "student"
                : "principal"}
            </p>
          </div>

          <Formik
            className="mt-5 mt-lg-0"
            initialValues={{
              Name: "",
              Photo: "",
              BirthDate: "",
              AccessRights: personType,
            }}
            onSubmit={async (personData) => {
              console.log(personData);

              setLoading(true);
              try {
                const response = await Api.post(linkForPost, personData);
                if (response.status === 201) {
                  swal({
                    title: "Good job!",
                    text: "Your person was added",
                    icon: "success",
                  }).then(function () {
                    window.location = `/schools/${schoolID}`;
                  });
                  console.log("success");
                }
                const personFromApi = response.data;
                console.log(personFromApi);

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
                  <label htmlFor="name" className="col-sm-2 col-form-label">
                    Name:
                  </label>

                  <Field
                    type="text"
                    name="Name"
                    className="w-100 form-control"
                    id="name"
                    placeholder="Person name"
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label htmlFor="photo" className="col-sm-2 col-form-label">
                    Photo:
                  </label>

                  <input
                    type="file"
                    name="Photo"
                    onChange={(event) => {
                      console.log(event.target.files[0].name);
                      setFieldValue("Photo", event.target.files[0].name);
                    }}
                    className="w-100 form-control form-control-lg"
                    id="photo"
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label
                    htmlFor="birthDate"
                    className="col-sm-2 col-form-label"
                  >
                    BirthDate:
                  </label>

                  <Field
                    type="date"
                    name="BirthDate"
                    min="1901-01-01"
                    max="2014-01-01"
                    className="w-100 form-control"
                    id="birthDate"
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn-add">
                    Add{" "}
                    {personType === 0
                      ? "Mentor"
                      : personType === 1
                      ? "Student"
                      : "Principal"}
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

      {/* OLD VERSION BELOW */}
      {/* <div className="container school-list text-center">
        <h1 className="font-weight-bolder" id="school-title">
          {schoolName}
        </h1>
        <div className="underline mb-3"></div>

        <h3 className="mt-4">
          <span id="form-subtitle">
            Add new{" "}
            {personType === 0
              ? "Mentor"
              : personType === 1
              ? "Student"
              : "Principal"}
          </span>
        </h3>
        <div className="text-center">
          <Link to={linkToSchool} className="btn custom-btn">
            Back to school menu
          </Link>
        </div>
        <div className="card mb-3 mt-5">
          <Formik
            className="mt-2"
            initialValues={{
              Name: "",
              Photo: "",
              BirthDate: "",
              AccessRights: personType,
            }}
            onSubmit={async (personData) => {
              console.log(personData);

              setLoading(true);
              try {
                const response = await Api.post(linkForPost, personData);
                if (response.status === 201) {
                  swal({
                    title: "Good job!",
                    text: "Your person was added",
                    icon: "success",
                  }).then(function () {
                    window.location = `/schools/${schoolID}`;
                  });
                  console.log("success");
                }
                const personFromApi = response.data;
                console.log(personFromApi);

                setLoading(false);
              } catch (error) {
                console.log(error.response);
                setLoading(true);
              }
            }}
          >
            {({ setFieldValue }) => (
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
                    placeholder="Person name"
                    required
                  />
                </div>

                <div className="form-group row">
                  <label htmlFor="photo" className="col-sm-2 col-form-label">
                    Photo:
                  </label>
                  <input
                    type="file"
                    name="Photo"
                    onChange={(event) => {
                      console.log(event.target.files[0].name);
                      setFieldValue("Photo", event.target.files[0].name);
                    }}
                    className="col-sm-9 form-control mt-1"
                    id="photo"
                    required
                  />
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="birthDate"
                    className="col-sm-2 col-form-label"
                  >
                    BirthDate:
                  </label>
                  <Field
                    type="date"
                    name="BirthDate"
                    min="1901-01-01"
                    max="2014-01-01"
                    className="col-sm-9 form-control mt-1"
                    id="birthDate"
                    required
                  />
                </div>

                <div className="form-group row">
                  <div className="col-sm-12">
                    <button type="submit" className="btn custom-btn">
                      Add{" "}
                      {personType === 0
                        ? "Mentor"
                        : personType === 1
                        ? "Student"
                        : "Principal"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
     */}
    </>
  );
};

export default AddPersonPage;
