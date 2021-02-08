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
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>{school.name}</h2>
          <p>Motto: Audaces fortuna juvat</p>
        </div>
      </div>

      <div className="row fix mt-3">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <ul className="project-menu">
            <li>
              <button
                className={`${value === 0 && "active"}`}
                onClick={() => {
                  setValue(0);
                }}
              >
                Details
              </button>
            </li>
            <li>
              <button
                className={`${value === 1 && "active"}`}
                onClick={() => {
                  setValue(1);
                }}
              >
                Mentors
              </button>
            </li>
            <li>
              <button
                className={`${value === 2 && "active"}`}
                onClick={() => {
                  setValue(2);
                }}
              >
                Students
              </button>
            </li>
            <li>
              <button
                className={`${value === 3 && "active"}`}
                onClick={() => {
                  setValue(3);
                }}
              >
                Courses
              </button>
            </li>
            <li>
              <button
                className={`${value === 4 && "active"}`}
                onClick={() => {
                  setValue(4);
                }}
              >
                Classes
              </button>
            </li>
            <li>
              <button
                className={`${value === 5 && "active"}`}
                onClick={() => {
                  setValue(5);
                }}
              >
                Subjects
              </button>
            </li>
          </ul>
        </div>
      </div>

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
          <section id="about" className="about">
            <div className="container" data-aos="fade-up">
              <div className="row">
                <div
                  className="col-lg-6 order-1 order-lg-2"
                  data-aos="fade-left"
                  data-aos-delay="100"
                >
                  <img
                    src={apiImgPath + school.principal.photo}
                    className="img-fluid"
                    alt="principal"
                  />
                </div>

                <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                  <h3>Principal: {school.principal.name}</h3>
                  <p className="font-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
};

export default SchoolPage;
