import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const AddCoursePage = (props) => {
  const [loading, setLoading] = useState(false);
  const schoolID = useParams().id;
  const schoolName = props.location.schoolData.schoolTitle;
  const linkToSchool = `/schools/${schoolID}`;
  const linkForPost = `/schools/${schoolID}/catalogues`;

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-center">
      <h1 className="font-weight-bolder" id="school-title">
        {schoolName}
      </h1>
      <div className="underline mb-3"></div>
      <h3 className="mt-4">Add new Course</h3>
      <Link to={linkToSchool} className="btn custom-btn">
        Back to school menu
      </Link>

      <div className="card mb-3 mt-5">
        <Formik
          className="mt-2"
          initialValues={{
            ClassName: "",
            ClassMentors: [],
            ClassStudents: [],
            ClassCourses: [],
            ClassGrades: [],
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
            <Form className="mt-2">
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name:
                </label>
                <Field
                  type="text"
                  name="ClassName"
                  className="col-sm-9 form-control mt-1"
                  id="name"
                  placeholder="School Class name"
                  required
                />
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <button type="submit" className="btn custom-btn">
                    Add School Class
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

export default AddCoursePage;
