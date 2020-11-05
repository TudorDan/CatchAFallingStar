import React, { useEffect, useState } from "react";
import Api from "./utils/Api";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];

  useEffect(() => {
    const getMentors = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/mentors`);
        console.log(response);
        const schoolFromAPI = response.data;
        setMentors(schoolFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getMentors();
  }, [schoolID]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h2 className="mt-5 text-center">Mentors</h2>
      <ul>
        {mentors.map((mentor) => {
          const { id, name, birthDate } = mentor;
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

export default Mentors;
