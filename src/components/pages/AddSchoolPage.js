import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const AddSchoolPage = () => {
  const linkToSchools = `/schools`;
  const [loading, setLoading] = useState(false);
  const linkForPost = "";

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-center">
      <h1 className="font-weight-bolder" id="school-title">
        Add new School
      </h1>
      <div className="underline mb-3"></div>

      <div className="text-center">
        <Link to={linkToSchools} className="btn custom-btn">
          Back to schools menu
        </Link>
      </div>
      <div className="card mb-3 mt-5">
        <Formik
          className="mt-2"
          initialValues={{
            Name: "",
          }}
          onSubmit={async (schoolData) => {
            console.log(schoolData);
            setLoading(true);
            try {
              const response = await Api.post(linkForPost, schoolData);
              if (response.status === 201) {
                swal({
                  title: "Good job!",
                  text: "Your person was added",
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
                <div className="col-sm-12">
                  <button type="submit" className="btn custom-btn">
                    Add School
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

export default AddSchoolPage;
