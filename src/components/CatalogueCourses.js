import React, { useEffect, useState } from "react";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const CatalogueCourses = (catalogue) => {
  const subjectTopics = ["History", "IT", "Astronomy"];
  const schoolId = window.location.href.split("/")[4];
  const catalogueId = window.location.href.split("/")[6];
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSchoolClassCourses = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolId}/catalogues/${catalogueId}/courses`
        );
        const catalogueMentorsFromAPI = response.data;
        setCourses(catalogueMentorsFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchoolClassCourses();
  }, [schoolId, catalogueId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <h2 className="mt-5 text-left">School Class Courses:</h2>
      {courses.length === 0 ? (
        <h3 className="mt-5 text-info">No courses in current school class.</h3>
      ) : (
        courses.map((course) => {
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
