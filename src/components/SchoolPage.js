import React, { useEffect, useState } from "react";
import Mentors from "./Mentors";
import Students from "./Students";
import Courses from "./Courses";
import Catalogues from "./Catalogues";
import Api from "./utils/Api";

const SchoolPage = () => {
  const [school, setSchool] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const [value, setValue] = useState(0);

  useEffect(() => {
    const getSchool = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}`);
        console.log(response);
        const schoolFromAPI = response.data;
        setSchool(schoolFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchool();
  }, [schoolID]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div id="wrapper-sidebar">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="list-group list-group-flush">
            <button
              className="list-group-item list-group-item-action bg-light"
              onClick={() => {
                setValue(0);
              }}
            >
              School Details
            </button>
            <button
              className="list-group-item list-group-item-action bg-light"
              onClick={() => {
                setValue(1);
              }}
            >
              Mentors
            </button>
            <button
              className="list-group-item list-group-item-action bg-light"
              onClick={() => {
                setValue(2);
              }}
            >
              Students
            </button>
            <button
              className="list-group-item list-group-item-action bg-light"
              onClick={() => {
                setValue(3);
              }}
            >
              Courses
            </button>
            <button
              className="list-group-item list-group-item-action bg-light"
              onClick={() => {
                setValue(4);
              }}
            >
              School Classes
            </button>
          </div>
        </div>
      </div>

      <article id="content-right">
        <h1 className="text-center">{school.name}</h1>
        <section>
          {value === 1 ? (
            <Mentors key={schoolID} />
          ) : value === 2 ? (
            <Students key={schoolID} />
          ) : value === 3 ? (
            <Courses key={schoolID} />
          ) : value === 4 ? (
            <Catalogues key={schoolID} />
          ) : (
            value === 0 && (
              <>
                <h2 className="mt-5 text-center">School Info</h2>
                <h3>Principal: {school.principal.name}</h3>
              </>
            )
          )}
        </section>
      </article>
    </>
  );
};

export default SchoolPage;
