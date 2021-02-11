import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../utils/Api";
import Loading from "../utils/Loading";
import swal2 from "sweetalert2";

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const linkToSchool = `/schools/`;
  const apiImgPath = "http://localhost:54719/images/";
  const linkToAddSchool = `/addschool`;

  const getSchools = async () => {
    try {
      const response = await Api.get("/schools");
      const schoolsFromAPI = response.data;
      setSchools(schoolsFromAPI);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  // return different statement if api not working
  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <section id="popular-courses" className="courses">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Schools</h2>
          <p>Manage your schools</p>
        </div>

        <div className="row" data-aos="zoom-in" data-aos-delay="100">
          {schools.map((school) => {
            const { id, name, photo } = school;

            return (
              <div
                key={id}
                className="col-lg-4 col-md-6 d-flex align-items-stretch mb-3"
              >
                <div className="course-item">
                  <img
                    src={apiImgPath + photo}
                    className="card-img-top"
                    alt="school"
                  />
                  <div className="course-content">
                    <h3>
                      <a href={linkToSchool + school.id}>{name}</a>
                    </h3>
                    <p>Principal {school.principal.name}</p>
                    <div className="trainer d-flex justify-content-between align-items-center">
                      <div className="trainer-profile d-flex align-items-center">
                        <Link
                          to={{
                            pathname: `/schools/${id}/update`,
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
                            swal2
                              .fire({
                                title: `Are you sure you wish to delete ${name}?`,
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3ec1d5",
                                cancelButtonColor: "#3f000f",
                                confirmButtonText: "Yes, delete school!",
                              })
                              .then(async (result) => {
                                if (result.isConfirmed) {
                                  const response = await Api.delete(
                                    `/schools/${id}`
                                  );
                                  if (response.status === 204) {
                                    swal2
                                      .fire(
                                        "Deleted!",
                                        "Your school has been deleted.",
                                        "success"
                                      )
                                      .then(function () {
                                        window.location = `/schools`;
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
              </div>
            );
          })}
        </div>
      </div>

      <section
        id="submenu"
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="container position-relative"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <Link
            to={{
              pathname: linkToAddSchool,
            }}
            className="btn-get-started"
          >
            Add School
          </Link>
        </div>
      </section>
    </section>
  );
};

export default SchoolsPage;
