import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const AddCataloguePage = (props) => {
  const [loading, setLoading] = useState(false);
  const schoolID = useParams().id;
  const schoolName = props.location.schoolData.schoolTitle;
  const linkToSchool = `/schools/${schoolID}`;
  const linkForPost = `/schools/${schoolID}/catalogues`;

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
          <div className="section-title mt-5 mb-5">
            <h2>School Classes</h2>
            <p>Add new school class</p>
          </div>

          <Formik
            className="mt-5 mt-lg-0"
            initialValues={{
              Name: "",
              Mentors: [],
              Students: [],
              Courses: [],
              Grades: [],
            }}
            onSubmit={async (catalogueData) => {
              console.log(catalogueData);

              setLoading(true);
              try {
                const response = await Api.post(linkForPost, catalogueData);
                if (response.status === 201) {
                  swal({
                    title: "Good job!",
                    text: "Your school class was added",
                    icon: "success",
                  }).then(function () {
                    window.location = `/schools/${schoolID}`;
                  });
                  console.log("success");
                }
                const catalogueFromApi = response.data;
                console.log(catalogueFromApi);

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
                    placeholder="School Class name"
                    required
                  />
                </div>

                <div className="text-center mt-5 mb-4">
                  <button type="submit" className="btn-add">
                    Add School Class
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

export default AddCataloguePage;
