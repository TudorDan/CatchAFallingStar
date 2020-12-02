import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const Courses = (school) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToCourse = `/schools/${schoolID}/courses/`;
  const subjectTopics = ["History", "IT", "Astronomy", "Physics", "Geography"];
  const linkToAddCourse = `/schools/${schoolID}/courses`;

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/courses`);
        const coursesFromAPI = response.data;
        setCourses(coursesFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getCourses();
  }, [schoolID]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <h2 className="mt-5 text-center">
        <span id="secondary-title">Courses</span>
      </h2>

      <Link
        to={{
          pathname: linkToAddCourse,
          schoolData: {
            schoolTitle: school.name,
          },
        }}
        className="btn mt-5 custom-btn"
      >
        Add Courses
      </Link>

      <ul className="mt-5 mr-5">
        {courses.map((course) => {
          const { id, name, subject, description } = course;
          console.log(subject);

          return (
            <li key={id}>
              <div className="card mb-3 mt-3 p-2">
                <div className="d-inline">
                  <small className="text-break">Name:</small>&nbsp;&nbsp;
                  <Link
                    to={{
                      pathname: linkToCourse + id,
                      schoolData: {
                        schoolTitle: school.name,
                      },
                    }}
                  >
                    {name}
                  </Link>
                </div>
                <div className="d-inline">
                  <small className="text-break">Subject:</small>
                  &nbsp;&nbsp;{subjectTopics[subject]}
                </div>
                <div className="d-inline">
                  <small className="text-break">Description:</small>{" "}
                  &nbsp;&nbsp;{description}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Courses;
