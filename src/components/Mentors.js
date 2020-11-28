import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const Mentors = (school) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToAddMentor = `/schools/${schoolID}/mentors`;

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
      <h2 className="mt-5 text-center">Mentors</h2>
      <Link
        to={{
          pathname: linkToAddMentor,
          schoolData: {
            schoolTitle: school.name,
            accessRights: 0,
          },
        }}
        className="btn btn-success mt-3"
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
                  </div>
                  <img
                    src={photo}
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
