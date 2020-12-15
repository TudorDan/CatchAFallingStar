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
  console.log(`school: ${school}`);
  return (
    <div className="container school-list text-center">
      <h1 className="font-weight-bolder" id="school-title">
        {school.name}
      </h1>
      <div className="underline mb-3"></div>

      <h3 className="mt-4">
        <span id="form-subtitle">Update School</span>
      </h3>
      <div className="text-center">
        <Link to={linkToSchools} className="btn custom-btn">
          Back to schools
        </Link>
      </div>
      <div className="card mb-3 mt-5">
        <Formik
          className="mt-2"
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
                  placeholder={school.name}
                  required
                />
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Current School Photo:
                </label>
                &nbsp;&nbsp;
                <span className="mt-1 text-muted">{school.photo}</span>
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
                <label
                  htmlFor="principalName"
                  className="col-sm-2 col-form-label"
                >
                  Principal Name:
                </label>
                <Field
                  type="text"
                  name="Principal.Name"
                  className="col-sm-9 form-control mt-1"
                  id="principalName"
                  placeholder={school.principal?.name}
                  required
                />
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Current Principal Photo:
                </label>
                &nbsp;&nbsp;
                <span className="mt-1 text-muted">
                  {school.principal?.photo}
                </span>
              </div>
              <div className="form-group row">
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
                  className="col-sm-9 form-control mt-1"
                  id="photo"
                  required
                />
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Current Principal BirthDate:
                </label>
                &nbsp;&nbsp;
                <span className="mt-1 text-muted">
                  {school.principal.birthDate
                    ? school.principal.birthDate.substr(0, 10)
                    : null}
                </span>
              </div>
              <div className="form-group row">
                <label htmlFor="birthDate" className="col-sm-2 col-form-label">
                  New BirthDate:
                </label>
                <Field
                  type="date"
                  name="Principal.BirthDate"
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
                    Update School
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

export default UpdateSchoolPage;
