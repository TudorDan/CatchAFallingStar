import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal from "sweetalert2";

const Students = (school) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToAddStudent = `/schools/${schoolID}/persons`;
  const linkToUpdateStudent = `/`;
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
        className="btn mt-5 custom-btn"
      >
        Add Student
      </Link>

      <ul className="mt-5 mr-5">
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
                    <Link
                      to={{
                        pathname: linkToUpdateStudent,
                        schoolData: {
                          schoolTitle: school.name,
                          accessRights: 1,
                          personId: id,
                        },
                      }}
                      className="btn mt-5 custom-btn mr-5"
                    >
                      Update Student
                    </Link>
                    <button
                      className="btn mt-5 custom-btn2"
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
    </>
  );
};

export default Students;
