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
    <div className="container school-list text-center">
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
                <label htmlFor="birthDate" className="col-sm-2 col-form-label">
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
  );
};

export default AddPersonPage;
