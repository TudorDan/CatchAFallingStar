import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal2 from "sweetalert2";
import { useGlobalUser } from "./utils/AuthContext";

const Subjects = (school) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4].split("#")[0];
  const linkToAddSubject = `/schools/${schoolID}/subjects`;
  const { user } = useGlobalUser();

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/subjects`);
        const coursesFromAPI = response.data;
        setSubjects(coursesFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSubjects();
  }, [schoolID]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <section id="features" className="features">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Subjects</h2>
            <p>Objects of study</p>
          </div>

          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {subjects.length === 0 ? (
              <>
                <h3 className="mt-5 text-info mb-5">
                  No subjects in current school!
                </h3>
                <p className="mt-4 mb-5"></p>
              </>
            ) : (
              <>
                {subjects.map((subject) => {
                  const { id, name } = subject;

                  return (
                    <div
                      key={id}
                      className={`col-lg-3 col-md-4 ${
                        subjects.length < 4 ? "mt-5 mb-5" : "mt-4"
                      }`}
                    >
                      <div className="icon-box d-flex flex-column">
                        <div className="d-flex flex-row mb-3">
                          <i
                            className="ri-calendar-todo-line"
                            style={{ color: "#11dbcf" }}
                          ></i>

                          <h3 id="course-title">{name}</h3>
                        </div>

                        {user.auth &&
                        (user.roles.includes("admin") ||
                          user.roles.includes("principal")) ? (
                          <div className="d-flex align-items-center">
                            <Link
                              to={{
                                pathname: `/schools/${schoolID}/subjects/${id}/`,
                                schoolData: {
                                  schoolTitle: school.name,
                                },
                              }}
                              className="get-started-btn"
                            >
                              Update
                            </Link>
                            &nbsp;&nbsp;
                            <button
                              className="get-started-btn border-0"
                              onClick={() => {
                                swal2
                                  .fire({
                                    title: `Are you sure you wish to delete ${name}?`,
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3ec1d5",
                                    cancelButtonColor: "#3f000f",
                                    confirmButtonText: "Yes, delete subject!",
                                  })
                                  .then(async (result) => {
                                    if (result.isConfirmed) {
                                      const response = await Api.delete(
                                        `/schools/${schoolID}/subjects/${id}`
                                      );
                                      if (response.status === 204) {
                                        swal2
                                          .fire(
                                            "Deleted!",
                                            "Your subject has been deleted.",
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
                        ) : (
                          ""
                        )}
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
        {user.auth &&
        (user.roles.includes("admin") || user.roles.includes("principal")) ? (
          <div className="content text-center">
            <Link
              to={{
                pathname: linkToAddSubject,
                schoolData: {
                  schoolTitle: school.name,
                },
              }}
              className="more-btn"
            >
              Add Subject <i className="bx bx-chevron-right"></i>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Subjects;
