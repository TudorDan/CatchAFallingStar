import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const AddSubjectPage = (props) => {
  const [types, setTypes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolId = window.location.href.split("/")[4];
  const schoolName = props.location.schoolData.schoolTitle;
  const linkToSchool = `/schools/${schoolId}`;
  const linkForPost = `/schools/${schoolId}/subjects`;
  const linkGetSubjectsTypes = `/schools/${schoolId}/subjects/types`;
  const linkGetSubjects = `/schools/${schoolId}/subjects`;

  useEffect(() => {
    const getSubjectTypes = async () => {
      try {
        const response = await Api.get(linkGetSubjectsTypes);
        const subjectTypesFromAPI = response.data;
        setTypes([
          { id: null, name: "Please choose an option" },
          ...subjectTypesFromAPI,
        ]);

        setLoading(false);
      } catch (error) {
        console.log(error.response);
        setLoading(true);
      }
    };

    const getSubjects = async () => {
      try {
        const response = await Api.get(linkGetSubjects);
        const subjectsFromAPI = response.data;
        setSubjects(subjectsFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error.response);
        setLoading(true);
      }
    };

    getSubjectTypes();
    getSubjects();
  }, [linkGetSubjectsTypes, linkGetSubjects]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-center">
      <h1 className="font-weight-bolder" id="school-title">
        {schoolName}
      </h1>
      <div className="underline mb-3"></div>
      <h3 className="mt-4">Add new Subject</h3>
      <Link to={linkToSchool} className="btn custom-btn">
        Back to school menu
      </Link>

      <div className="card mb-3 mt-5">
        <Formik
          className="mt-2"
          initialValues={{
            SubjectType: "",
          }}
          onSubmit={async (subjectData) => {
            subjectData.SubjectType = parseInt(subjectData.SubjectType);
            console.log(subjectData);

            setLoading(true);
            try {
              const response = await Api.post(linkForPost, subjectData);
              if (response.status === 201) {
                swal({
                  title: "Good job!",
                  text: "Your subject was added",
                  icon: "success",
                }).then(function () {
                  window.location = `/schools/${schoolId}`;
                });
                console.log("success");
              }
              const subjectFromApi = response.data;
              console.log(subjectFromApi);

              setLoading(false);
            } catch (error) {
              console.log(error.response);
              const response = error.response;
              let subjectName = "";

              subjects.map((subject) => {
                if (subject.subjectType === subjectData.SubjectType) {
                  subjectName = subject.subjectName;
                }
                return "subject check finished";
              });
              if (response.status === 409) {
                swal2
                  .fire({
                    title: `Subject ${subjectName} already exists in this school!`,
                    text: "Choose something else!",
                  })
                  .then(function () {
                    window.location = `/schools/${schoolId}`;
                  });
              }
              if (response.status === 400) {
                swal2
                  .fire({
                    title: `No subject was selected!`,
                    text: "Please choose something!",
                  })
                  .then(function () {
                    window.location = `/schools/${schoolId}`;
                  });
              }

              setLoading(true);
            }
          }}
        >
          {() => (
            <Form className="mt-2">
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Subject Name:
                </label>
                <Field
                  component="select"
                  name="SubjectType"
                  className="col-sm-9 form-control mt-1"
                  id="name"
                >
                  {types.map((type) => {
                    const { id, name } = type;

                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </Field>
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <button type="submit" className="btn custom-btn">
                    Add School Subject
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

export default AddSubjectPage;
