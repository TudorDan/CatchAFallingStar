import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal from "sweetalert2";
import { FaBirthdayCake } from "react-icons/fa";

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
        className="btn mt-5 custom-btn2"
      >
        Add Mentor
      </Link>

      <div className="mt-5 mr-5 ml-5 row d-flex">
        {mentors.length === 0 ? (
          <h3 className="mt-5 text-info">No mentors in current school!</h3>
        ) : (
          <>
            {mentors.map((mentor) => {
              const { id, name, birthDate, photo } = mentor;

              return (
                <div key={id} className="card mb-3 mt-3 col-4 mentors-card">
                  <img
                    src={apiImgPath + photo}
                    className="card-img-top"
                    alt="mentor"
                  />
                  <div className="card-body text-center">
                    <h4 className="card-title mentors d-inline white">
                      {name}
                    </h4>
                    <p className="card-text mt-2">
                      <FaBirthdayCake className="white" />
                      &nbsp;
                      <span className="white">{birthDate.substr(0, 10)}</span>
                    </p>
                    <Link
                      to={{
                        pathname: `${linkToAddMentor}/${id}`,
                        schoolData: {
                          schoolTitle: school.name,
                          accessRights: 0,
                        },
                      }}
                      className="btn mt-1 custom-btn mr-5"
                    >
                      Update
                    </Link>
                    <button
                      className="btn mt-1 custom-btn"
                      onClick={() => {
                        swal
                          .fire({
                            title: `Are you sure you wish to delete ${name}?`,
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3ec1d5",
                            cancelButtonColor: "#3f000f",
                            confirmButtonText: "Yes, delete mentor!",
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

export default Mentors;
