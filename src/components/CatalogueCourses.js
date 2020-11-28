import React from "react";

const CatalogueCourses = (catalogue) => {
  const subjectTopics = ["History", "IT", "Astronomy"];

  return (
    <>
      <h2 className="mt-5 text-left">School Class Courses:</h2>
      {catalogue.classCourses.length === 0 ? (
        <h3 className="mt-5 text-info">No courses in current school class.</h3>
      ) : (
        catalogue.classCourses.map((course) => {
          const { id, name, subject, description } = course;

          return (
            <li key={id}>
              <div className="card mb-3 mt-3 p-2">
                <div className="d-inline">
                  <small className="text-break">Name:</small>&nbsp;&nbsp;
                  {name}
                </div>
                <div className="d-inline">
                  <small className="text-break">Subject:</small>
                  &nbsp;&nbsp;{subjectTopics[subject]}
                </div>
                <div className="d-inline">
                  <small className="text-break">Description:</small>{" "}
                  &nbsp;&nbsp;
                  {description}
                </div>
              </div>
            </li>
          );
        })
      )}
    </>
  );
};

export default CatalogueCourses;
