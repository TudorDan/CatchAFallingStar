import React, { useState, useEffect } from "react";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

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
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-center">
      <h3 className="display-3 font-weight-bolder" id="school-title">
        Schools
      </h3>
      <ul className="list-group school-cards">
        {schools.map((school) => {
          const { id, name, photo } = school;
          return (
            <li key={id}>
              <div class="card mb-3 mt-3">
                <img src={photo} class="card-img-top" alt="school" />
                <div class="card-body">
                  <h5 class="card-title">
                    <a href={linkToSchool + school.id}>{name}</a>
                  </h5>
                  <p class="card-text">Principal: {school.principal.name}</p>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 hours ago</small>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SchoolsPage;
