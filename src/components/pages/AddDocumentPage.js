import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const AddDocumentPage = () => {
  const [school, setSchool] = useState([]);
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const schoolId = window.location.href.split("/")[4];
  const courseId = window.location.href.split("/")[6];
  const linkForSchool = `/schools/${schoolId}`;
  const linkForCourse = `/schools/${schoolId}/courses/${courseId}`;
  const linkForPost = `/schools/${schoolId}/courses/${courseId}/documents`;

  useEffect(() => {
    const getCourse = async () => {
      try {
        const responseSchool = await Api.get(linkForSchool);
        const responseCourse = await Api.get(linkForCourse);

        const schoolFromApi = responseSchool.data;
        const courseFromApi = responseCourse.data;

        setSchool(schoolFromApi);
        setCourse(courseFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getCourse();
  }, [linkForSchool, linkForCourse]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-center">
      <h1 className="font-weght-bolder" id="school-title">
        {school.name}
      </h1>
      <div className="underline mb-3"></div>
      <h3 className="mt-4">Add new Document for {course.name}</h3>
      <Link to={linkForCourse} className="btn custom-btn">
        Back to course menu
      </Link>

      <div className="card mb-3 mt-5">
        <Formik
          className="mt-2"
          initialValues={{
            Name: "",
            Link: "",
          }}
          onSubmit={async (documentData) => {
            console.log(documentData);

            setLoading(true);
            try {
              const response = await Api.post(linkForPost, documentData);

              if (response.status === 201) {
                swal({
                  title: "Good job!",
                  text: "Your document was added",
                  icon: "success",
                }).then(function () {
                  window.location = linkForCourse;
                });
                console.log("success");
              }

              const documentFromApi = response.data;
              console.log(documentFromApi);

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
                  name="Name"
                  className="col-sm-9 form-control mt-1"
                  id="name"
                  placeholder="Document name"
                  required
                />
              </div>

              <div className="form-group row">
                <label htmlFor="link" className="col-sm-2 col-form-label">
                  Link
                </label>
                <Field
                  type="text"
                  name="Link"
                  className="col-sm-9 form-control mt-1"
                  id="link"
                  placeholder="Document link"
                  required
                />
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <button type="submit" className="btn custom-btn">
                    Add Document
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

export default AddDocumentPage;
