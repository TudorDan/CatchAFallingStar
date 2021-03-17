import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal from "sweetalert2";
import { FaBirthdayCake } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useGlobalUser } from "./utils/AuthContext";

const Students = (school) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4].split("#")[0];
  const linkToAddStudent = `/schools/${schoolID}/persons/1`;
  const apiImgPath = "http://localhost:54719/images/";
  const { user } = useGlobalUser();

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/students`);
        const studentsFromAPI = response.data;
        setStudents(studentsFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getStudents();
  }, [schoolID]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <section id="trainers" className="trainers">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Students</h2>
            <p>Undergraduates Data</p>
          </div>

          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {students.length === 0 ? (
              <>
                <h3 className="mt-5 text-info mb-5">
                  No students in current school!
                </h3>
                <p className="mb-3"></p>
              </>
            ) : (
              <>
                {students.map((student) => {
                  const { id, name, birthDate, photo } = student;

                  return (
                    <div
                      key={id}
                      className="col-lg-4 col-md-6 d-flex align-items-stretch"
                    >
                      <div className="member">
                        <img
                          src={apiImgPath + photo}
                          className="img-fluid"
                          alt="student"
                        />

                        <div className="member-content">
                          <h4>{name}</h4>

                          <span>
                            <FaChalkboardTeacher className="iconfont teach" />
                            STUDENT
                          </span>

                          <span>
                            <FaBirthdayCake className="iconfont" />
                            {birthDate.substr(0, 10)}
                          </span>

                          <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Temporibus cumque, perspiciatis velit fugiat
                            suscipit delectus consectetur quam natus
                            perferendis!
                          </p>
                        </div>

                        {user.auth &&
                        (user.roles.includes("admin") ||
                          user.roles.includes("principal") ||
                          user.roles.includes("student")) ? (
                          <div className="trainer d-flex justify-content-around align-items-center">
                            <div className="trainer-profile d-flex align-items-center">
                              <Link
                                to={{
                                  pathname: `${linkToAddStudent}/${id}`,
                                  schoolData: {
                                    schoolTitle: school.name,
                                    accessRights: 1,
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
                                      title: `Are you sure you wish to delete ${name}?`,
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3ec1d5",
                                      cancelButtonColor: "#3f000f",
                                      confirmButtonText: "Yes, delete student!",
                                    })
                                    .then(async (result) => {
                                      if (result.isConfirmed) {
                                        const response = await Api.delete(
                                          `/schools/${schoolID}/students/${id}`
                                        );
                                        if (response.status === 204) {
                                          swal
                                            .fire(
                                              "Deleted!",
                                              "Your student has been deleted.",
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
            <Link to={linkToAddStudent} className="more-btn">
              Add Student <i className="bx bx-chevron-right"></i>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Students;
