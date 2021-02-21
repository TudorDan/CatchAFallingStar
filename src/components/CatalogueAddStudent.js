import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Loading from "./utils/Loading";
import Api from "./utils/Api";
import swal from "sweetalert";
import swal2 from "sweetalert2";

const CatalogueAddStudent = ({ catalogueName }) => {
  const [loading, setLoading] = useState(false);
  const schoolID = window.location.href.split("/")[4];
  const catalogueId = window.location.href.split("/")[6];
  const [students, setStudents] = useState([]);
  const [catalogueStudents, setCatalogueStudents] = useState([]);
  const linkForPost = `/schools/${schoolID}/catalogues/${catalogueId}/students`;

  useEffect(() => {
    const getSchoolStudents = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/students`);
        const studentsFromApi = response.data;
        setStudents([
          { id: 0, name: "Please choose option" },
          ...studentsFromApi,
        ]);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    const getCatalogueStudents = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolID}/catalogues/${catalogueId}/students`
        );
        const catalogueStudentsFromApi = response.data;
        setCatalogueStudents(catalogueStudentsFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchoolStudents();
    getCatalogueStudents();
  }, [schoolID, catalogueId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Add new student</h2>
            <p>{catalogueName}</p>
          </div>

          <Formik
            className="mt-5 mt-lg-0"
            initialValues={{
              Id: "",
            }}
            onSubmit={async (studentData) => {
              studentData.Id = parseInt(studentData.Id);

              setLoading(true);
              try {
                const response = await Api.post(linkForPost, studentData);
                if (response.status === 201) {
                  swal({
                    title: "Good job!",
                    text: "Student was added to the school class",
                    icon: "success",
                  }).then(function () {
                    window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                  });
                  console.log("success");
                }
                const catalogueStudentFromApi = response.data;
                console.log(catalogueStudentFromApi);

                setLoading(false);
              } catch (error) {
                console.log(error.response);
                const response = error.response;
                let studentName = "";

                catalogueStudents.map((student) => {
                  if (student.id === studentData.Id) {
                    studentName = student.name;
                  }
                  return "student check finished";
                });

                if (response.status === 409) {
                  swal2
                    .fire({
                      title: `Student ${studentName} already assigned to a school class!`,
                      text: "Choose someone else!",
                    })
                    .then(function () {
                      window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                    });
                }
                if (response.status === 400) {
                  swal2
                    .fire({
                      title: `No student was selected!`,
                      text: "Please choose someone!",
                    })
                    .then(function () {
                      window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                    });
                }

                setLoading(true);
              }
            }}
          >
            {(values) => (
              <Form className="php-email-form mt-5 mb-4">
                <div className="form-group d-flex flex-row">
                  <label
                    htmlFor="studentId"
                    className="col-sm-2 col-form-label"
                  >
                    Choose Student:
                  </label>
                  <Field component="select" name="Id" id="studentId">
                    {students.map((student) => {
                      const { id, name } = student;
                      console.log(id, name);
                      return (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      );
                    })}
                  </Field>
                </div>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                <div className="text-center">
                  <button type="submit" className="btn-add">
                    Add Student
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>

      {/* OLD VERSION BELOW */}
      {/* <h3 className="mt-4">Add new Student</h3>
      <div className="card mb-3 mt-5">
        <Formik
          className="mt-2"
          initialValues={{
            Id: "",
          }}
          onSubmit={async (studentData) => {
            studentData.Id = parseInt(studentData.Id);

            setLoading(true);
            try {
              const response = await Api.post(linkForPost, studentData);
              if (response.status === 201) {
                swal({
                  title: "Good job!",
                  text: "Student was added to the school class",
                  icon: "success",
                }).then(function () {
                  window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                });
                console.log("success");
              }
              const catalogueStudentFromApi = response.data;
              console.log(catalogueStudentFromApi);

              setLoading(false);
            } catch (error) {
              console.log(error.response);
              const response = error.response;
              let studentName = "";

              catalogueStudents.map((student) => {
                if (student.id === studentData.Id) {
                  studentName = student.name;
                }
                return "student check finished";
              });

              if (response.status === 409) {
                swal2
                  .fire({
                    title: `Student ${studentName} already assigned to a school class!`,
                    text: "Choose someone else!",
                  })
                  .then(function () {
                    window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                  });
              }
              if (response.status === 400) {
                swal2
                  .fire({
                    title: `No student was selected!`,
                    text: "Please choose someone!",
                  })
                  .then(function () {
                    window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                  });
              }

              setLoading(true);
            }
          }}
        >
          {(values) => (
            <Form className="mt-2">
              <div className="form-group-row">
                <label htmlFor="studentId" className="col-sm-2 col-form-label">
                  Choose Student:
                </label>
                <Field component="select" name="Id" id="studentId">
                  {students.map((student) => {
                    const { id, name } = student;
                    console.log(id, name);
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </Field>
              </div>
              
              <div className="form-group row">
                <div className="col-sm-12 text-center">
                  <button type="submit" className="btn custom-btn">
                    Add Student
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
     */}
    </>
  );
};

export default CatalogueAddStudent;
