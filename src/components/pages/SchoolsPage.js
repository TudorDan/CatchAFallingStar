import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const linkToSchool = `/schools/`;
  const apiImgPath = "http://localhost:54719/images/";
  const linkToAddSchool = `/`;
  const linkToUpdateSchool = `/`;
  const linkToDeleteSchool = `/`;

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
      <div class="underline mb-3"></div>
      <Link
        to={{
          pathname: linkToAddSchool,
        }}
        className="btn mt-3 custom-btn mb-4"
      >
        Add School
      </Link>

      <ul className="list-group school-cards">
        {schools.map((school) => {
          const { id, name, photo } = school;

          return (
            <li key={id}>
              <div className="card mb-3 mt-3">
                <img
                  src={apiImgPath + photo}
                  className="card-img-top"
                  alt="school"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <a href={linkToSchool + school.id}>{name}</a>
                  </h5>
                  <div className="row">
                    <div className="col-6">
                      <p className="card-text">
                        Principal: {school.principal.name}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Last updated 3 hours ago
                        </small>
                      </p>
                    </div>
                    <div className="col-6">
                      <Link
                        to={{
                          pathname: linkToUpdateSchool,
                        }}
                        className="btn custom-btn mt-0 mr-3"
                      >
                        Update School
                      </Link>
                      <Link
                        to={{
                          pathname: linkToDeleteSchool,
                        }}
                        className="btn custom-btn2 mt-0"
                      >
                        Delete School
                      </Link>
                    </div>
                  </div>
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
