import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal from "sweetalert2";
import { MdSubject } from "react-icons/md";
import { MdDescription } from "react-icons/md";

const Courses = (school) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
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
      <h2 className="mt-5 text-center">
        <span id="secondary-title">Courses</span>
      </h2>

      <Link
        to={{
          pathname: linkToAddCourse,
          schoolData: {
            schoolTitle: school.name,
          },
        }}
        className="btn mt-5 custom-btn2"
      >
        Add Course
      </Link>

      <div className="mt-5 mr-5 ml-5 row d-flex">
        {courses.map((course) => {
          const { id, name, subject, description } = course;

          return (
            <div key={id} className="card mb-3 mt-3 col-4 courses">
              <div className="d-block text-center link">
                <Link
                  to={{
                    pathname: linkToCourse + id,
                    schoolData: {
                      schoolTitle: school.name,
                    },
                  }}
                >
                  {name}
                </Link>
              </div>
              <div className="d-block">
                <small className="text-break">
                  <MdSubject className="yellow" />
                </small>
                &nbsp;&nbsp;{subject.name}
              </div>
              <div className="d-block">
                <small className="text-break">
                  <MdDescription className="yellow" />
                </small>
                &nbsp;&nbsp;
                {description.length > 33
                  ? description.substr(0, 33) + "..."
                  : description}
              </div>

              <div className="row">
                <Link
                  to={{
                    pathname: `/schools/${schoolID}/courses/${id}/update`,
                    schoolData: {
                      schoolTitle: school.name,
                    },
                  }}
                  className="btn custom-btn mt-0 mr-5 ml-5"
                >
                  Update
                </Link>
                <button
                  className="btn custom-btn mt-0 mr-5 ml-5"
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
          );
        })}
      </div>
    </>
  );
};

export default Courses;
