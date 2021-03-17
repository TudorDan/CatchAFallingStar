import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../utils/Api";
import Loading from "../utils/Loading";
import swal2 from "sweetalert2";
import { useGlobalUser } from "../utils/AuthContext";

const CoursePage = (props) => {
  const [course, setCourse] = useState([]);
  const [school, setSchool] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolId = window.location.href.split("/")[4];
  const courseId = window.location.href.split("/")[6].split("#")[0];
  const linkToSchool = `/schools/${schoolId}`;
  const linkForAddDocument = `/schools/${schoolId}/courses/${courseId}/documents`;
  const linkToMain = `/`;
  const { user } = useGlobalUser();

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolId}/courses/${courseId}`
        );
        const courseFromApi = response.data;
        setCourse(courseFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    const getSchool = async () => {
      try {
        const response = await Api.get(`/schools/${schoolId}`);
        const schoolFromApi = response.data;
        setSchool(schoolFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getCourse();
    getSchool();
  }, [schoolId, courseId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>{school?.name}</h2>
          <p>Motto: Audaces fortuna juvat</p>
        </div>
      </div>

      <section id="course-details" className="course-details">
        <div className="container" data-aos="fade-up">
          <h3>{course?.name}</h3>
          <p>{course?.subject?.name}</p>
        </div>
      </section>

      <section
        id="cource-details-tabs"
        className={`cource-details-tabs ${
          course?.documents?.length === 1
            ? "mt-5 mb-5"
            : course?.documents?.length === 2
            ? "mt-4 mb-5"
            : course?.documents?.length === 0
            ? "mb-5"
            : ""
        }`}
      >
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-3">
              <ul className="nav nav-tabs flex-column">
                {course?.documents?.map((document) => {
                  const { id, name } = document;

                  return (
                    <li key={id} className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href={"#tab_doc-" + id}
                      >
                        {name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-9 mt-4 mt-lg-0">
              <div className="tab-content">
                {course?.documents?.length === 0 ? (
                  <>
                    <h3 className="mt-5 text-info mb-5">
                      No documents in current course!
                    </h3>
                  </>
                ) : (
                  <>
                    {course?.documents?.map((document) => {
                      const { id, name, link } = document;

                      return (
                        <div key={id} className="tab-pane" id={"tab_doc-" + id}>
                          <div className="row">
                            <div className="col-lg-8 details order-2 order-lg-1">
                              <h3>{name}</h3>
                              <p>
                                <a href={link}>
                                  <i className="bx bx-chevron-right"></i>&nbsp;
                                  {link}
                                </a>
                              </p>
                              <p>
                                <Link
                                  to={{
                                    pathname: `/schools/${schoolId}/courses/${courseId}/documents/${id}`,
                                  }}
                                  className="get-started-btn"
                                >
                                  Update
                                </Link>
                                &nbsp;
                                <button
                                  className="get-started-btn border-0"
                                  onClick={() => {
                                    swal2
                                      .fire({
                                        title: `Are you sure you wish to delete ${name}?`,
                                        text:
                                          "You won't be able to revert this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3ec1d5",
                                        cancelButtonColor: "#3f000f",
                                        confirmButtonText:
                                          "Yes, delete document!",
                                      })
                                      .then(async (result) => {
                                        if (result.isConfirmed) {
                                          const response = await Api.delete(
                                            `/schools/${schoolId}/courses/${courseId}/documents/${id}`
                                          );
                                          if (response.status === 204) {
                                            swal2
                                              .fire(
                                                "Deleted!",
                                                "Your mentor has been deleted.",
                                                "success"
                                              )
                                              .then(function () {
                                                window.location = `/schools/${schoolId}/courses/${courseId}`;
                                              });
                                          }
                                        }
                                      });
                                  }}
                                >
                                  Remove
                                </button>
                              </p>
                            </div>
                            <div className="col-lg-4 text-center order-1 order-lg-2">
                              <img
                                src={
                                  linkToMain +
                                  `assets/img/course-details-tab-${
                                    (id % 5) + 1
                                  }.png`
                                }
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="why-us">
        <div className="content text-center">
          <Link to={linkToSchool} className="more-btn">
            <i className="bx bx-chevron-left"></i> Back
          </Link>
          &nbsp;&nbsp;
          {user.auth &&
          (user.roles.includes("admin") || user.roles.includes("mentor")) ? (
            <Link to={linkForAddDocument} className="more-btn">
              Add <i className="bx bx-chevron-right"></i>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default CoursePage;
