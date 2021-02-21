import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Loading from "./utils/Loading";
import Api from "./utils/Api";
import swal from "sweetalert";
import swal2 from "sweetalert2";

const CatalogueAddGrade = ({ catalogueName }) => {
  const [catalogueStudents, setCatalogueStudents] = useState([]);
  const [catalogueCourses, setCatalogueCourses] = useState([]);
  const [catalogueMentors, setCatalogueMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const schoolID = window.location.href.split("/")[4];
  const catalogueId = window.location.href.split("/")[6];
  const linkForPost = `/schools/${schoolID}/catalogues/${catalogueId}/grades`;
  const linkGetCatalogueStudents = `/schools/${schoolID}/catalogues/${catalogueId}/students`;
  const linkGetCatalogueCourses = `/schools/${schoolID}/catalogues/${catalogueId}/courses`;
  const linkGetCatalogueMentors = `/schools/${schoolID}/catalogues/${catalogueId}/mentors`;

  useEffect(() => {
    const getCatalogueStudents = async () => {
      try {
        const response = await Api.get(linkGetCatalogueStudents);
        const catalogueStudentsFromApi = response.data;
        setCatalogueStudents([
          { id: null, name: "Please choose a student" },
          ...catalogueStudentsFromApi,
        ]);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    const getCatalogueCourses = async () => {
      try {
        const response = await Api.get(linkGetCatalogueCourses);
        const catalogueCoursesFromApi = response.data;
        setCatalogueCourses([
          { id: null, name: "Please choose a course" },
          ...catalogueCoursesFromApi,
        ]);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    const getCatalogueMentors = async () => {
      try {
        const response = await Api.get(linkGetCatalogueMentors);
        const catalogueMentorsFromApi = response.data;
        setCatalogueMentors([
          { id: null, name: "Please choose a mentor" },
          ...catalogueMentorsFromApi,
        ]);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getCatalogueStudents();
    getCatalogueCourses();
    getCatalogueMentors();
  }, [
    linkGetCatalogueStudents,
    linkGetCatalogueCourses,
    linkGetCatalogueMentors,
  ]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Add new course</h2>
            <p>{catalogueName}</p>
          </div>

          <Formik
            className="mt-2"
            initialValues={{
              StudentId: "",
              Mark: "",
              CourseId: "",
              MentorId: "",
              Date: "",
            }}
            onSubmit={async (gradeData) => {
              gradeData.StudentId = parseInt(gradeData.StudentId);
              gradeData.Mark = parseFloat(gradeData.Mark);
              gradeData.CourseId = parseInt(gradeData.CourseId);
              gradeData.MentorId = parseInt(gradeData.MentorId);

              setLoading(true);
              try {
                const response = await Api.post(linkForPost, gradeData);
                if (response.status === 201) {
                  swal({
                    title: "Good job!",
                    text: "Grade was added to the school class",
                    icon: "success",
                  }).then(function () {
                    window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                  });
                  console.log("success");
                }
                const catalogueGradeFromApi = response.data;
                console.log(catalogueGradeFromApi);

                setLoading(false);
              } catch (error) {
                console.log(error.response);
                const response = error.response;

                if (response.status === 400) {
                  swal2
                    .fire({
                      title: `Student or Mentor or Course was not selected!`,
                      text: "Please choose something for each!",
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
              <Form className="php-email-form">
                <div className="form-group d-flex flex-row">
                  <label
                    htmlFor="studentId"
                    className="col-sm-2 col-form-label"
                  >
                    Student:
                  </label>

                  <Field
                    component="select"
                    name="StudentId"
                    id="studentId"
                    className="w-100 form-control"
                  >
                    {catalogueStudents.map((student) => {
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

                <div className="form-group d-flex flex-row mt-3">
                  <label htmlFor="courseId" className="col-sm-2 col-form-label">
                    Course:
                  </label>

                  <Field
                    component="select"
                    name="CourseId"
                    id="courseId"
                    className="w-100 form-control"
                  >
                    {catalogueCourses.map((course) => {
                      const { id, name } = course;
                      console.log(id, name);
                      return (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      );
                    })}
                  </Field>
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label htmlFor="mentorId" className="col-sm-2 col-form-label">
                    Mentor:
                  </label>

                  <Field
                    component="select"
                    name="MentorId"
                    id="mentorId"
                    className="w-100 form-control"
                  >
                    {catalogueMentors.map((mentor) => {
                      const { id, name } = mentor;
                      console.log(id, name);
                      return (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      );
                    })}
                  </Field>
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label htmlFor="markDate" className="col-sm-2 col-form-label">
                    Mark Date:
                  </label>

                  <Field
                    type="date"
                    name="Date"
                    className="w-100 form-control"
                    id="markDate"
                    required
                  />
                </div>

                <div className="form-group d-flex flex-row mt-3">
                  <label htmlFor="mark" className="col-sm-2 col-form-label">
                    Mark:
                  </label>

                  <Field
                    type="number"
                    name="Mark"
                    min="1"
                    max="10"
                    step="0.1"
                    className="w-100 form-control"
                    id="mark"
                    placeholder="Please choose a mark"
                    required
                  />
                </div>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                <div className="text-center">
                  <button type="submit" className="btn-add">
                    Add Grade
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default CatalogueAddGrade;
