import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal from "sweetalert2";
import { FaBirthdayCake } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

const Students = (school) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToAddStudent = `/schools/${schoolID}/persons`;
  const apiImgPath = "http://localhost:54719/images/";

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
      <h2 className="mt-5 text-center">
        <span id="secondary-title">Students</span>
      </h2>

      <Link
        to={{
          pathname: linkToAddStudent,
          schoolData: {
            schoolTitle: school.name,
            accessRights: 1,
          },
        }}
        className="btn mt-5 custom-btn2"
      >
        Add Student
      </Link>

      <div className="mt-5 mr-5 ml-5 row d-flex">
        {students.map((student) => {
          const { id, name, birthDate, photo } = student;

          return (
            <div key={id} className="card mb-3 mt-3 col-lg-4 border-0">
              <div className="row">
                <div className="col-4">
                  <img
                    src={apiImgPath + photo}
                    className="card-img"
                    alt="student"
                  />
                </div>

                <div className="card-body-student col-8 text-left">
                  <MdSchool className="yellow" />
                  &nbsp;
                  <h5 className="card-title text-left d-inline">{name}</h5>
                  <p className="card-text mb-0 mt-1">
                    <FaBirthdayCake className="yellow" /> &nbsp;
                    <small className="text-muted mentors">
                      {birthDate.substr(0, 10)}
                    </small>
                  </p>
                  <Link
                    to={{
                      pathname: `/schools/${schoolID}/persons/${id}`,
                      schoolData: {
                        schoolTitle: school.name,
                        accessRights: 1,
                        personId: id,
                      },
                    }}
                    className="btn mt-3 custom-btn mr-0"
                  >
                    Update
                  </Link>
                  <button
                    className="btn mt-3 custom-btn"
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Students;
