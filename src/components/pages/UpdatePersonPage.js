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
              Update{" "}
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
                    placeholder={person.name}
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label className="col-sm-2 col-form-label">
                    Current Photo:
                  </label>
                  &nbsp;&nbsp;
                  <span className="w-100 text-muted">{person.photo}</span>
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
                  <label className="col-sm-2 col-form-label">
                    Current BirthDate:
                  </label>
                  &nbsp;&nbsp;
                  <span className="w-100 text-muted">
                    {person.birthDate ? person.birthDate.substr(0, 10) : null}
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
                    Update{" "}
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
    </>
  );
};

export default UpdatePersonPage;
