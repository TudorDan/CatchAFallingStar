import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const UpdateSubjectPage = () => {
  const [school, setSchool] = useState([]);
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(false);
  const schoolId = window.location.href.split("/")[4];
  const subjectId = window.location.href.split("/")[6];
  const linkForSchool = `/schools/${schoolId}`;
  const linkForSubject = `/schools/${schoolId}/subjects/${subjectId}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseSchool = await Api.get(linkForSchool);
        const responseSubject = await Api.get(linkForSubject);

        const schoolFromApi = responseSchool.data;
        const subjectFromApi = responseSubject.data;

        setSchool(schoolFromApi);
        setSubject(subjectFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    fetchData();
  }, [linkForSchool, linkForSubject]);

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
            <p>Update subject</p>
          </div>

          <Formik
            className="mt-5 mt-lg-0"
            initialValues={{
              Name: "",
            }}
            onSubmit={async (subjectData) => {
              subjectData.Name = subjectData.Name.toUpperCase();
              console.log(subjectData);

              const response = await Api.put(linkForSubject, subjectData);
              if (response.status === 204) {
                swal({
                  title: "Good job!",
                  text: "Your school subject was updated",
                  icon: "success",
                }).then(function () {
                  window.location = `/schools/${schoolId}`;
                });
                console.log("success");
              }
              const subjectFromApi = response.data;
              console.log(subjectFromApi);

              setLoading(true);
              try {
                setLoading(false);
              } catch (error) {
                console.log(error.response);
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
                    placeholder={subject.name}
                    required
                  />
                </div>

                <div className="text-center mt-5 mb-4">
                  <button type="submit" className="btn-add">
                    Update Subject
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

export default UpdateSubjectPage;
