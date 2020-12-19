import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../utils/Api";
import Loading from "../utils/Loading";
import CatalogueCourses from "../CatalogueCourses";
import CatalogueMentors from "../CatalogueMentors";
import CatalogueStudents from "../CatalogueStudents";
import CatalogueGrades from "../CatalogueGrades";
import CatalogueAddMentor from "../CatalogueAddMentor";
import CatalogueAddStudent from "../CatalogueAddStudent";
import CatalogueAddCourse from "../CatalogueAddCourse";
import CatalogueAddGrade from "../CatalogueAddGrade";

const CataloguePage = () => {
  const [catalogue, setCataloge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState([]);
  const schoolId = window.location.href.split("/")[4];
  const catalogueId = window.location.href.split("/")[6];
  const linkToSchool = `/schools/${schoolId}`;
  const [value, setValue] = useState(0);

  useEffect(() => {
    const getSchool = async () => {
      try {
        const response = await Api.get(`/schools/${schoolId}`);
        const schoolFromAPI = response.data;
        setSchool(schoolFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchool();

    const getCatalogue = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolId}/catalogues/${catalogueId}`
        );
        const catalogueFromApi = response.data;
        setCataloge(catalogueFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchool();
    getCatalogue();
  }, [schoolId, catalogueId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-left">
      <h1 className="font-weight-bolder text-center" id="school-title">
        {school.name}
      </h1>
      <div className="underline mb-3"></div>
      <div className="mt-3 text-center">
        <Link to={linkToSchool} className="custom-btn3">
          Back to school menu
        </Link>
        &nbsp;&nbsp;
        <button
          to={linkToSchool}
          className={`custom-btn3 ${value === 0 && "active-custom-btn3"}`}
          onClick={() => {
            setValue(0);
          }}
        >
          Courses
        </button>
        &nbsp;&nbsp;
        <button
          to={linkToSchool}
          className={`custom-btn3 ${value === 1 && "active-custom-btn3"}`}
          onClick={() => {
            setValue(1);
          }}
        >
          Mentors
        </button>
        &nbsp;&nbsp;
        <button
          to={linkToSchool}
          className={`custom-btn3 ${value === 2 && "active-custom-btn3"}`}
          onClick={() => {
            setValue(2);
          }}
        >
          Students
        </button>
        &nbsp;&nbsp;
        <button
          to={linkToSchool}
          className={`custom-btn3 ${value === 3 && "active-custom-btn3"}`}
          onClick={() => {
            setValue(3);
          }}
        >
          Grades
        </button>
      </div>

      <div className="mt-1 text-center">
        {value === 1 ? (
          <button
            className="btn custom-btn"
            onClick={() => {
              setValue(4);
            }}
          >
            Add Mentor
          </button>
        ) : value === 2 ? (
          <button
            className="btn custom-btn"
            onClick={() => {
              setValue(5);
            }}
          >
            Add Student
          </button>
        ) : value === 3 ? (
          <button
            className="btn custom-btn"
            onClick={() => {
              setValue(6);
            }}
          >
            Add Grade
          </button>
        ) : (
          value === 0 && (
            <button
              className="btn custom-btn"
              onClick={() => {
                setValue(7);
              }}
            >
              Add Course
            </button>
          )
        )}
      </div>

      <h3 className="mt-5">
        <small className="text-break">School Class Name:&nbsp;&nbsp;</small>
        <span id="secondary-title">{catalogue.name}</span>
      </h3>

      <article className="container">
        <section>
          {value === 1 ? (
            <CatalogueMentors key={catalogueId} />
          ) : value === 2 ? (
            <CatalogueStudents key={catalogueId} />
          ) : value === 3 ? (
            <CatalogueGrades key={catalogueId} {...catalogue} />
          ) : value === 4 ? (
            <CatalogueAddMentor key={catalogueId} />
          ) : value === 5 ? (
            <CatalogueAddStudent key={catalogueId} />
          ) : value === 6 ? (
            <CatalogueAddGrade key={catalogueId} />
          ) : value === 7 ? (
            <CatalogueAddCourse key={catalogueId} />
          ) : (
            value === 0 && (
              <CatalogueCourses key={catalogueId} schoolName={school.name} />
            )
          )}
        </section>
      </article>
    </div>
  );
};

export default CataloguePage;
