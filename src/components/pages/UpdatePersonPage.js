import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import Api from "../utils/Api";
import Loading from "../utils/Loading";
import swal2 from "sweetalert2";

const UpdatePersonPage = (props) => {
  const { schoolId, personId } = useParams();
  const schoolName = props.location.schoolData.schoolTitle;
  const personType = props.location.schoolData.accessRights;
  const linkToSchool = `/schools/${schoolId}`;
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(false);
  const linkForPut =
    personType === 0
      ? `/schools/${schoolId}/mentors/${personId}`
      : personType === 1
      ? `/schools/${schoolId}/students/${personId}`
      : `/schools/${schoolId}/principal/${personId}`;

  useEffect(() => {
    const getPerson = async () => {
      try {
        const response = await Api.get(linkForPut);
        const personFromApi = response.data;
        console.log(personFromApi);
        setPerson(personFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getPerson();
  }, [schoolId, linkForPut]);

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
          Update{" "}
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
              const response = await Api.put(linkForPut, personData);
              if (response.status === 204) {
                swal({
                  title: "Good job!",
                  text: "Your person was updated",
                  icon: "success",
                }).then(function () {
                  window.location = `/schools/${schoolId}`;
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
                    window.location = `/schools/${schoolId}`;
                  });
              }

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
                  placeholder={person.name}
                  required
                />
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Current Photo:
                </label>
                &nbsp;&nbsp;
                <span className="mt-1 text-muted">{person.photo}</span>
              </div>
              <div className="form-group row">
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
                  className="col-sm-9 form-control mt-1"
                  id="photo"
                  required
                />
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Current BirthDate:
                </label>
                &nbsp;&nbsp;
                <span className="mt-1 text-muted">
                  {person.birthDate ? person.birthDate.substr(0, 10) : null}
                </span>
              </div>
              <div className="form-group row">
                <label htmlFor="birthDate" className="col-sm-2 col-form-label">
                  New BirthDate:
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
                    Update{" "}
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

export default UpdatePersonPage;
