import React, { useEffect, useState } from "react";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal2 from "sweetalert2";
import { FaBirthdayCake } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";

const CatalogueStudents = ({ catalogueName }) => {
  const schoolId = window.location.href.split("/")[4];
  const catalogueId = window.location.href.split("/")[6].split("#")[0];
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiImgPath = "http://localhost:54719/images/";

  useEffect(() => {
    const getSchoolClassStudents = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolId}/catalogues/${catalogueId}/students`
        );
        const catalogueStudentsFromAPI = response.data;
        setStudents(catalogueStudentsFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchoolClassStudents();
  }, [schoolId, catalogueId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <section id="trainers" className="trainers">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Students</h2>
            <p>{catalogueName}</p>
          </div>

          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {students.length === 0 ? (
              <h3 className="mt-5 text-info mb-5">
                No students in current school class.
              </h3>
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
                            BirthDate: {birthDate.substr(0, 10)}
                          </span>

                          <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Temporibus cumque, perspiciatis velit fugiat
                            suscipit delectus consectetur quam natus
                            perferendis!
                          </p>

                          <button
                            className="get-started-btn border-0"
                            onClick={() => {
                              swal2
                                .fire({
                                  title: `Are you sure you wish to delete ${name} from this class?`,
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
                                      `/schools/${schoolId}/catalogues/${catalogueId}/students/${id}`
                                    );
                                    if (response.status === 204) {
                                      swal2
                                        .fire(
                                          "Deleted!",
                                          "Your student has been deleted.",
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
                            Delete Student
                          </button>
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

      {/* OLD VERSION BELOW */}
      {/* <h2 className="mt-5 text-left">School Class Students:</h2>
      {students.length === 0 ? (
        <h3 className="mt-5 text-info">No students in current school class.</h3>
      ) : (
        <ul>
          {students.map((student) => {
            const { id, name, birthDate, photo } = student;

            return (
              <li key={id}>
                <div className="card mb-3 mt-3">
                  <div className="row">
                    <div className="card-body col-8 text-center">
                      <h5 className="card-title mentors text-center">
                        Name: {name}
                      </h5>
                      <p className="card-text">
                        <small className="text-muted mentors">
                          BirthDate: {birthDate.substr(0, 10)}
                        </small>
                      </p>
                      <button
                        className="btn custom-btn2 mt-0"
                        onClick={() => {
                          swal2
                            .fire({
                              title: `Are you sure you wish to delete ${name} from this class?`,
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
                                  `/schools/${schoolId}/catalogues/${catalogueId}/students/${id}`
                                );
                                if (response.status === 204) {
                                  swal2
                                    .fire(
                                      "Deleted!",
                                      "Your student has been deleted.",
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
                        Delete Student
                      </button>
                    </div>
                    <img
                      src={apiImgPath + photo}
                      className="card-img-bottom col-4 h-25"
                      alt="student"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )} */}
    </>
  );
};

export default CatalogueStudents;
