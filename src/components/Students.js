import React, { useEffect, useState } from "react";
import Api from "./utils/Api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/students`);
        console.log(response);
        const schoolFromAPI = response.data;
        setStudents(schoolFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getStudents();
  }, [schoolID]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h2 className="mt-5 text-center">Students</h2>
      <ul>
        {students.map((student) => {
          const { id, name, birthDate } = student;
          return (
            <ul key={id} className="mt-5">
              <li>Name: {name} </li>
              <li>BirthDate: {birthDate} </li>
            </ul>
          );
        })}
      </ul>
    </>
  );
};

export default Students;
