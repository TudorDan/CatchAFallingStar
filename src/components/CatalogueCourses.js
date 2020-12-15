import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal2 from "sweetalert2";

const CatalogueCourses = ({ schoolName }) => {
  const schoolId = window.location.href.split("/")[4];
  const catalogueId = window.location.href.split("/")[6];
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const linkToCourse = `/schools/${schoolId}/courses/`;

  useEffect(() => {
    const getSchoolClassCourses = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolId}/catalogues/${catalogueId}/courses`
        );
        const catalogueMentorsFromAPI = response.data;
        setCourses(catalogueMentorsFromAPI);

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
      <h2 className="mt-5 text-left">School Class Courses:</h2>
      {courses.length === 0 ? (
        <h3 className="mt-5 text-info">No courses in current school class.</h3>
      ) : (
        <ul>
          {courses.map((course) => {
            const { id, name, subject, description } = course;

            return (
              <li key={id}>
                <div className="card mb-3 mt-3 p-2">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-inline-block w-100">
                        <small className="text-break">Name:</small>&nbsp;&nbsp;
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
                      </div>
                      <div className="d-inline-block w-100">
                        <small className="text-break">Subject:</small>
                        &nbsp;&nbsp;{subject.subjectName}
                      </div>
                      <div className="d-inline-block w-100">
                        <small className="text-break">Description:</small>{" "}
                        &nbsp;&nbsp;
                        {description}
                      </div>
                    </div>

                    <div className="col-3 ">
                      <button
                        className="btn custom-btn2 mt-4"
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
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default CatalogueCourses;
