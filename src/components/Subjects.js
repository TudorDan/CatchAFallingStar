import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal2 from "sweetalert2";
import { MdSubject } from "react-icons/md";

const Subjects = (school) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToAddSubject = `/schools/${schoolID}/subjects`;

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
      <h2 className="mt-5 text-center">
        <span id="secondary-title">Subjects</span>
      </h2>

      <Link
        to={{
          pathname: linkToAddSubject,
          schoolData: {
            schoolTitle: school.name,
          },
        }}
        className="btn mt-5 custom-btn2"
      >
        Add Subject
      </Link>

      <div className="mt-5 mr-5 ml-5 row d-flex">
        {subjects.length === 0 ? (
          <h3 className="mt-5 text-info">No subjects in current school!</h3>
        ) : (
          <>
            {subjects.map((subject) => {
              const { id, name } = subject;

              return (
                <div key={id} className="card mb-3 mt-3 col-3 subjects">
                  <div className="d-block">
                    <small className="text-break">
                      <MdSubject className="yellow" />
                    </small>
                    &nbsp;&nbsp;{name}
                  </div>

                  <div className="row justify-content-around mb-1">
                    <Link
                      to={{
                        pathname: `/schools/${schoolID}/subjects/${id}/`,
                        schoolData: {
                          schoolTitle: school.name,
                        },
                      }}
                      className="btn custom-btn mt-0"
                    >
                      Update
                    </Link>

                    <button
                      className="btn custom-btn mt-0"
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
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Subjects;
