import React from "react";
import { Link } from "react-router-dom";

const CatalogueMentors = (catalogue) => {
  const linkToAddMentorToSchool = "/";

  return (
    <>
      <h2 className="mt-5 text-left">School Class Mentors:</h2>
      <Link to={linkToAddMentorToSchool} className="btn custom-btn">
        Add Mentor
      </Link>
      {catalogue.classCourses.length === 0 ? (
        <h3 className="mt-5 text-info">No mentors in current school class.</h3>
      ) : (
        catalogue.classMentors.map((mentor) => {
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
        })
      )}
    </>
  );
};

export default CatalogueMentors;
