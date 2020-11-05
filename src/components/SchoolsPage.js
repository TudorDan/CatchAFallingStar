import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const linkToSchool = `/schools-details/`;

  const getSchools = async () => {
    try {
      const response = await Api.get("/schools");
      const schoolsFromAPI = response.data;
      setSchools(schoolsFromAPI);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  // return different statement if api not working
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h3>Schools</h3>
      <ul>
        {schools.map((school) => {
          const { id, name } = school;
          return (
            <li key={id}>
              <a href={linkToSchool + school.id}>{name}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SchoolsPage;
