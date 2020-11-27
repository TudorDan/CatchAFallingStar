import React, { useEffect, useState } from "react";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToCourse = `/schools/${schoolID}/courses/`;

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/courses`);
        console.log(response);
        const schoolFromAPI = response.data;
        setCourses(schoolFromAPI);

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
      <h2 className="mt-5 text-center">Courses</h2>
      <ul className="mt-5 mr-5">
        {courses.map((course) => {
          const { id, name, subject, description } = course;
          const subjectTopics = ["History", "IT", "Astronomy"];

          return (
            <li key={id}>
              <div class="card mb-3 mt-3 p-2 ">
                <div className="d-inline">
                  <small className="text-break">Name:</small>&nbsp;&nbsp;
                  <a href={linkToCourse + id}>{name}</a>
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

              {/*
                <small className="text-break">Course Materials:</small>{" "}
                {courseMaterials.map((doc) => {
                  const { id, documentation } = doc;
                  return (
                    <ul key={id}>
                      <li>Document: {documentation}</li>
                    </ul>
                  );
                })}*/}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Courses;
