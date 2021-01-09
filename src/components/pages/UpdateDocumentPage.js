import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const UpdateDocumentPage = () => {
  const [school, setSchool] = useState([]);
  const [document, setDocument] = useState();
  const [loading, setLoading] = useState(true);
  const schoolId = window.location.href.split("/")[4];
  const courseId = window.location.href.split("/")[6];
  const documentId = window.location.href.split("/")[8];
  const linkForSchool = `/schools/${schoolId}`;
  const linkForCourse = `/schools/${schoolId}/courses/${courseId}`;
  const linkForDocument = `/schools/${schoolId}/courses/${courseId}/documents/${documentId}`;

  useEffect(() => {
    const getDocument = async () => {
      try {
        const responseSchool = await Api.get(linkForSchool);
        const responseDocument = await Api.get(linkForDocument);

        const schoolFromApi = responseSchool.data;
        const documentFromApi = responseDocument.data;

        setSchool(schoolFromApi);
        setDocument(documentFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getDocument();
  }, [linkForSchool, linkForDocument]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-center">
      <h1 className="font-weight-bold" id="school-title">
        {school.name}
      </h1>
      <div className="underline mb-3"></div>
      <h3 className="mt-4">Update Document</h3>
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
              const response = await Api.put(linkForDocument, documentData);

              if (response.status === 204) {
                swal({
                  title: "Good job!",
                  text: "Your document was updated",
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
                  placeholder={document.name}
                  required
                />
              </div>

              <div className="form-group row">
                <label htmlFor="link" className="col-sm-2 col-form-label">
                  Link:
                </label>
                <Field
                  type="text"
                  name="Link"
                  className="col-sm-9 form-control mt-1"
                  id="link"
                  placeholder={document.link}
                  required
                />
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <button type="submit" className="btn custom-btn">
                    Update Document
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

export default UpdateDocumentPage;
