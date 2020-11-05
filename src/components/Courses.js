import React, { useEffect, useState } from "react";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];

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
      <ul>
        {courses.map((course) => {
          const { id, name, subject, description, courseMaterials } = course;
          return (
            <ul key={id} className="mt-5">
              <li>Name: {name} </li>
              <li>Subject: {subject} </li>
              <li>Description: {description} </li>
              <li>
                Course Materials:{" "}
                {courseMaterials.map((doc) => {
                  const { id, documentation } = doc;
                  return (
                    <ul key={id}>
                      <li>Document: {documentation}</li>
                    </ul>
                  );
                })}
              </li>
            </ul>
          );
        })}
      </ul>
    </>
  );
};

export default Courses;
