import React from "react";

const CatalogueStudents = (catalogue) => {
  return (
    <>
      <h2 className="mt-5 text-left">School Class Students:</h2>
      {catalogue.classCourses.length === 0 ? (
        <h3 className="mt-5 text-info">No students in current school class.</h3>
      ) : (
        catalogue.classStudents.map((student) => {
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
                  </div>
                  <img
                    src={photo}
                    className="card-img-bottom col-4 h-25"
                    alt="student"
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

export default CatalogueStudents;
