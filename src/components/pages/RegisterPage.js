import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Api from "../utils/Api";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import swal2 from "sweetalert2";


const RegisterPage = () => {
    const [loading, setLoading] = useState(true);
    const linkToSchool = `/`;
    const linkForPost = `/authentication/register`;

    return(<>
    <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>Register</h2>
          <p>E-learning App Registration</p>
        </div>
      </div>

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
            <div className="section-title mt-5 mb-5">
                <h2>User</h2>
                <p>Add new User</p>
            </div>

            <Formik
            className="mt-5 mt-lg-0"
            initialValues={{
              Username: "",
              Email: "",
              Password: "",
            }}
            onSubmit={async (userData) => {
            //   userData.Name = userData.Name.toUpperCase();
              console.log(userData);

              setLoading(true);
              try {
                const response = await Api.post(linkForPost, userData);
                if (response.status === 201) {
                  swal({
                    title: "Good job!",
                    text: "Your user was registered",
                    icon: "success",
                  }).then(function () {
                    window.location = `/`;
                  });
                  console.log("success");
                }
                const userFromApi = response.data;
                console.log(userFromApi);

                setLoading(false);
              } catch (error) {
                console.log(error.response);
                const response = error.response;
                let userEmail = "";

                if (response.status === 409) {
                  swal2
                    .fire({
                      title: `Email ${userEmail} already exists in this school!`,
                      text: "Choose something else!",
                    })
                    .then(function () {
                      window.location = `/`;
                    });
                }
                if (response.status === 500) {
                  swal2
                    .fire({
                      title: `Error!`,
                      text: "User creation Failed!",
                    })
                    .then(function () {
                      window.location = `/`;
                    });
                }

                setLoading(true);
              }
            }}
          >
            {() => (
              <Form className="php-email-form">
                <div className="form-group d-flex flex-row">
                  <label htmlFor="username" className="col-sm-2 col-form-label">
                    Username:
                  </label>

                  <Field
                    type="text"
                    name="Username"
                    className="w-100 form-control"
                    placeholder="Username"
                    required
                    id="username"
                  />
                </div>

                <div className="form-group d-flex flex-row">
                  <label htmlFor="email" className="col-sm-2 col-form-label">
                    Email:
                  </label>

                  <Field
                    type="text"
                    name="Email"
                    className="w-100 form-control"
                    placeholder="New Email"
                    required
                    id="email"
                  />
                </div>

                <div className="form-group d-flex flex-row">
                  <label htmlFor="password" className="col-sm-2 col-form-label">
                    Password:
                  </label>

                  <Field
                    type="text"
                    name="Password"
                    className="w-100 form-control"
                    placeholder="New Password"
                    required
                    id="password"
                  />
                </div>

                <div className="text-center mt-5 mb-4">
                  <button type="submit" className="btn-add">
                    Register
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
    </>)
};

export default RegisterPage;