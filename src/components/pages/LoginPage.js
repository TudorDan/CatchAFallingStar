import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useHistory } from "react-router-dom";
import Api from "../utils/Api";
import swal2 from "sweetalert2";
import Loading from "../utils/Loading";
import { useGlobalUser } from "../utils/AuthContext";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const linkToHome = `/`;
  const linkForPost = `/authentication/login`;
  const { login } = useGlobalUser();
  const history = useHistory();

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>Login</h2>
          <p>E-learning App Login</p>
        </div>
      </div>

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title mt-5 mb-5">
            <h2>Login</h2>
            <p>Login a user</p>
          </div>

          <Formik
            className="mt-5 mt-lg-0"
            initialValues={{
              Username: "",
              Password: "",
            }}
            onSubmit={async (userData) => {
              console.log(userData);

              setLoading(true);
              try {
                const response = await Api.post(linkForPost, userData);
                if (response.status === 200) {
                  swal2
                    .fire({
                      title: "Sign in!",
                      text: "User has logged in",
                      icon: "success",
                    })
                    .then(function () {
                      login(userData.Username);

                      history.push("/");
                    });
                  console.log("success");
                }
                const userFromApi = response.data;
                console.log(userFromApi);

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
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>

      <div className="why-us">
        <div className="content text-center">
          <Link to={linkToHome} className="more-btn">
            <i className="bx bx-chevron-left"></i> Cancel
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
