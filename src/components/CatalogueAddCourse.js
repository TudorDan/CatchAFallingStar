import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Loading from "./utils/Loading";
import Api from "./utils/Api";
import swal from "sweetalert";
import swal2 from "sweetalert2";

const CatalogueAddCourse = ({ catalogueName }) => {
  const [loading, setLoading] = useState(false);
  const schoolID = window.location.href.split("/")[4];
  const catalogueId = window.location.href.split("/")[6];
  const [courses, setCourses] = useState([]);
  const [catalogueCourses, setCatalogueCourses] = useState([]);
  const linkForPost = `/schools/${schoolID}/catalogues/${catalogueId}/courses`;

  useEffect(() => {
    const getSchoolCourses = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/courses`);
        const coursesFromApi = response.data;
        setCourses([
          { id: 0, name: "Please choose option" },
          ...coursesFromApi,
        ]);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    const getCatalogueCourses = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolID}/catalogues/${catalogueId}/courses`
        );
        const catalogueCoursesFromApi = response.data;
        setCatalogueCourses(catalogueCoursesFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchoolCourses();
    getCatalogueCourses();
  }, [schoolID, catalogueId]);

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
            className="mt-5 mt-lg-0"
            initialValues={{
              Id: "",
            }}
            onSubmit={async (courseData) => {
              courseData.Id = parseInt(courseData.Id);

              setLoading(true);
              try {
                const response = await Api.post(linkForPost, courseData);
                if (response.status === 201) {
                  swal({
                    title: "Good job!",
                    text: "Course was added to the school class",
                    icon: "success",
                  }).then(function () {
                    window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                  });
                  console.log("success");
                }
                const catalogueCourseFromApi = response.data;
                console.log(catalogueCourseFromApi);

                setLoading(false);
              } catch (error) {
                console.log(error.response);
                const response = error.response;
                let courseName = "";

                catalogueCourses.map((course) => {
                  if (course.id === courseData.Id) {
                    courseName = course.name;
                  }
                  return "course check finished";
                });
                if (response.status === 409) {
                  swal2
                    .fire({
                      title: `Course ${courseName} already exists in this school class!`,
                      text: "Choose something else!",
                    })
                    .then(function () {
                      window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                    });
                }
                if (response.status === 400) {
                  swal2
                    .fire({
                      title: `No course was selected!`,
                      text: "Please choose something!",
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
                  <label htmlFor="courseId" className="col-sm-2 col-form-label">
                    Choose Course:
                  </label>
                  <Field component="select" name="Id" id="courseId">
                    {courses.map((course) => {
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
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                <div className="text-center">
                  <button type="submit" className="btn-add">
                    Add Course
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

export default CatalogueAddCourse;
