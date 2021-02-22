import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal2 from "sweetalert2";

const CatalogueCourses = ({ schoolName, catalogueName }) => {
  const schoolId = window.location.href.split("/")[4];
  const catalogueId = window.location.href.split("/")[6].split("#")[0];
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const linkToCourse = `/schools/${schoolId}/courses/`;

  useEffect(() => {
    const getSchoolClassCourses = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolId}/catalogues/${catalogueId}/courses`
        );
        const catalogueCoursesFromAPI = response.data;
        setCourses(catalogueCoursesFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchoolClassCourses();
  }, [schoolId, catalogueId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <section id="why-us" className="why-us">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Courses</h2>
            <p>{catalogueName}</p>
          </div>

          <div
            className="row icon-boxes"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            {courses.length === 0 ? (
              <>
                <h3 id="loading" className="mt-5 text-info mb-5">
                  No courses in current school class.
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
                                schoolTitle: schoolName,
                              },
                            }}
                          >
                            {name}
                          </Link>
                        </h3>

                        <span>{subject.name}</span>

                        <p>
                          {description.length > 33
                            ? description.substr(0, 30) + "..."
                            : description}
                        </p>

                        <button
                          className="get-started-btn border-0"
                          onClick={() => {
                            swal2
                              .fire({
                                title: `Are you sure you wish to delete "${name}" from this class?`,
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
                                    `/schools/${schoolId}/catalogues/${catalogueId}/courses/${id}`
                                  );
                                  if (response.status === 204) {
                                    swal2
                                      .fire(
                                        "Deleted!",
                                        "Your course has been deleted.",
                                        "success"
                                      )
                                      .then(function () {
                                        window.location = `/schools/${schoolId}/catalogues/${catalogueId}`;
                                      });
                                  }
                                }
                              });
                          }}
                        >
                          Delete Course
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CatalogueCourses;
