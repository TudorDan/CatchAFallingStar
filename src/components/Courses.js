import React, { useEffect, useState } from "react";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToCourse = `/schools-details/${schoolID}/course/`; 

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
    <ul className="list-group school-cards">
        {courses.map((course) => {
          const { id, name, subject } = course;
          const subjectTopics = ["History", "IT", "Astronomy"];
          return (
            <li key={id}>
              <div class="card mb-3 mt-3">
                {/* <img src={photo} class="card-img-top" alt="school" /> */}
                <div class="card-body">
                  <h5 class="card-title">
                    <a href={linkToCourse + id}>{name}</a>
                  </h5>
                  <p class="card-text">Subject: {subjectTopics[subject]}</p>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 hours ago</small>
                  </p>
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
