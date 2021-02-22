import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal from "sweetalert2";

const Courses = (school) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4].split("#")[0];
  const linkToCourse = `/schools/${schoolID}/courses/`;
  const linkToAddCourse = `/schools/${schoolID}/courses`;

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/courses`);
        const coursesFromAPI = response.data;
        setCourses(coursesFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getCourses();
  }, [schoolID]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <section id="why-us" className="why-us">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Courses</h2>
            <p>Popular Courses</p>
          </div>

          <div
            className="row icon-boxes"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            {courses.length === 0 ? (
              <>
                <h3 className="mt-5 text-info mb-5">
                  No courses in current school!
                </h3>
                <p className="mb-3"></p>
              </>
            ) : (
              <>
                {courses.map((course) => {
                  const { id, name, subject, description } = course;

                  return (
                    <div
                      key={id}
                      className="col-lg-4 col-md-6 d-flex align-items-stretch"
                    >
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-receipt"></i>

                        <h3>
                          <Link
                            to={{
                              pathname: linkToCourse + id,
                              schoolData: {
                                schoolTitle: school.name,
                              },
                            }}
                            id="course-title"
                          >
                            {name.length > 33
                              ? name.substr(0, 33) + "..."
                              : name}
                          </Link>
                        </h3>

                        <span>{subject.name}</span>

                        <p>
                          {description.length > 33
                            ? description.substr(0, 33) + "..."
                            : description}
                        </p>

                        <div className="trainer d-flex justify-content-around align-items-center">
                          <div className="trainer-profile d-flex align-items-center">
                            <Link
                              to={{
                                pathname: `/schools/${schoolID}/courses/${id}/update`,
                                schoolData: {
                                  schoolTitle: school.name,
                                },
                              }}
                              className="get-started-btn"
                            >
                              Update
                            </Link>
                          </div>

                          <div className="trainer-rank d-flex align-items-center">
                            <button
                              className="get-started-btn border-0"
                              onClick={() => {
                                swal
                                  .fire({
                                    title: `Are you sure you wish to delete "${name}"?`,
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3ec1d5",
                                    cancelButtonColor: "#3f000f",
                                    confirmButtonText: "Yes, delete course!",
                                  })
                                  .then(async (result) => {
                                    if (result.isConfirmed) {
                                      const response = await Api.delete(
                                        `/schools/${schoolID}/courses/${id}`
                                      );
                                      if (response.status === 204) {
                                        swal
                                          .fire(
                                            "Deleted!",
                                            "Your course has been deleted.",
                                            "success"
                                          )
                                          .then(function () {
                                            window.location = `/schools/${schoolID}`;
                                          });
                                      }
                                    }
                                  });
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>

      <div className="why-us">
        <div className="content text-center">
          <Link
            to={{
              pathname: linkToAddCourse,
              schoolData: {
                schoolTitle: school.name,
              },
            }}
            className="more-btn"
          >
            Add Course <i className="bx bx-chevron-right"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Courses;
