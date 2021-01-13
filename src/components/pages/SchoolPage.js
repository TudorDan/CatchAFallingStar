import React, { useEffect, useState } from "react";
import Mentors from "../Mentors";
import Students from "../Students";
import Courses from "../Courses";
import Catalogues from "../Catalogues";
import Subjects from "../Subjects";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const SchoolPage = () => {
  const [school, setSchool] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const [value, setValue] = useState(0);
  const apiImgPath = "http://localhost:54719/images/";

  useEffect(() => {
    const getSchool = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}`);
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
    return <Loading key={0} />;
  }

  return (
    <>
      <div id="wrapper-sidebar">
        <div className="row d-flex mt-3">
          <button
            className={`col-2 sidebar-btn ${value === 0 && "active-btn"}`}
            onClick={() => {
              setValue(0);
            }}
          >
            School Details
          </button>

          <button
            className={`col-2 sidebar-btn ${value === 1 && "active-btn"}`}
            onClick={() => {
              setValue(1);
            }}
          >
            Mentors
          </button>

          <button
            className={`col-2 sidebar-btn ${value === 2 && "active-btn"}`}
            onClick={() => {
              setValue(2);
            }}
          >
            Students
          </button>

          <button
            className={`col-2 sidebar-btn ${value === 3 && "active-btn"}`}
            onClick={() => {
              setValue(3);
            }}
          >
            Courses
          </button>

          <button
            className={`col-2 sidebar-btn ${value === 4 && "active-btn"}`}
            onClick={() => {
              setValue(4);
            }}
          >
            School Classes
          </button>

          <button
            className={`col-2 sidebar-btn ${value === 5 && "active-btn"}`}
            onClick={() => {
              setValue(5);
            }}
          >
            School Subjects
          </button>
        </div>
      </div>

      <article id="content-right" className="text-center">
        <h1 className="font-weight-bolder">{school.name}</h1>
        {/* <div className="underline mb-3"></div> */}
        <section>
          {value === 1 ? (
            <Mentors key={schoolID} {...school} />
          ) : value === 2 ? (
            <Students key={schoolID} {...school} />
          ) : value === 3 ? (
            <Courses key={schoolID} {...school} />
          ) : value === 4 ? (
            <Catalogues key={schoolID} {...school} />
          ) : value === 5 ? (
            <Subjects key={schoolID} {...school} />
          ) : (
            value === 0 && (
              <>
                <h2 className="mt-5">
                  <span id="secondary-title">School Info</span>
                </h2>
                <h3 className="mt-5 mb-5">
                  Principal: {school.principal.name}
                </h3>
                <img
                  className="height50"
                  src={apiImgPath + school.principal.photo}
                  alt="principal"
                />
              </>
            )
          )}
        </section>
      </article>
    </>
  );
};

export default SchoolPage;
