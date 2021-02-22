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
    <>
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>{school.name}</h2>
          <p>Motto: Audaces fortuna juvat</p>
        </div>
      </div>

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title mt-5">
            <h2>{course.name}</h2>
            <p>Add new document</p>
          </div>

          <Formik
            className="mt-5 mt-lg-0"
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
              <Form className="php-email-form">
                <div className="form-group d-flex flex-row mt-1">
                  <label htmlFor="name" className="col-sm-2 col-form-label">
                    Name:
                  </label>

                  <Field
                    type="text"
                    name="Name"
                    className="w-100 form-control"
                    id="name"
                    placeholder="Document name"
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-4">
                  <label htmlFor="link" className="col-sm-2 col-form-label">
                    Link:
                  </label>

                  <Field
                    type="text"
                    name="Link"
                    className="w-100 form-control"
                    id="link"
                    placeholder="Document link"
                    required
                  />
                </div>

                <div className="text-center mb-5">
                  <button type="submit" className="btn-add">
                    Add Document
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

export default AddDocumentPage;
