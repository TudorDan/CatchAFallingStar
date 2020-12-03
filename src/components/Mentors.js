import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal from "sweetalert2";

const Mentors = (school) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToAddMentor = `/schools/${schoolID}/persons`;
  const apiImgPath = "http://localhost:54719/images/";

  useEffect(() => {
    const getMentors = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/mentors`);
        const mentorsFromAPI = response.data;
        setMentors(mentorsFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getMentors();
  }, [schoolID]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <h2 className="mt-5 text-center">
        <span id="secondary-title">Mentors</span>
      </h2>

      <Link
        to={{
          pathname: linkToAddMentor,
          schoolData: {
            schoolTitle: school.name,
            accessRights: 0,
          },
        }}
        className="btn mt-5 custom-btn"
      >
        Add Mentor
      </Link>

      <ul className="mt-5 mr-5">
        {mentors.map((mentor) => {
          const { id, name, birthDate, photo } = mentor;

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
                        pathname: `${linkToAddMentor}/${id}`,
                        schoolData: {
                          schoolTitle: school.name,
                          accessRights: 0,
                        },
                      }}
                      className="btn mt-5 custom-btn mr-5"
                    >
                      Update Mentor
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
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          })
                          .then(async (result) => {
                            if (result.isConfirmed) {
                              const response = await Api.delete(
                                `/schools/${schoolID}/mentors/${id}`
                              );
                              if (response.status === 204) {
                                swal
                                  .fire(
                                    "Deleted!",
                                    "Your mentor has been deleted.",
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
                      Delete Mentor
                    </button>
                  </div>
                  <img
                    src={apiImgPath + photo}
                    className="card-img-bottom col-4 h-25"
                    alt="mentor"
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

export default Mentors;
