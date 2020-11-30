import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Api from "../utils/Api";
import Loading from "../utils/Loading";
import CatalogueCourses from "../CatalogueCourses";
import CatalogueMentors from "../CatalogueMentors";
import CatalogueStudents from "../CatalogueStudents";

const CataloguePage = (props) => {
  const [catalogue, setCataloge] = useState([]);
  const [loading, setLoading] = useState(true);
  const { schoolId, catalogueId } = useParams();
  const schoolName = props.location.schoolData.schoolTitle;
  const linkToSchool = `/schools/${schoolId}`;
  const [value, setValue] = useState(0);

  useEffect(() => {
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

    getCatalogue();
  }, [schoolId, catalogueId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-left">
      <h1 className="font-weight-bolder text-center" id="school-title">
        {schoolName}
      </h1>
      <div class="underline mb-3"></div>
      <div className="mt-5 text-center">
        <Link to={linkToSchool} className="btn custom-btn">
          Back to school menu
        </Link>
        &nbsp;&nbsp;
        <button
          to={linkToSchool}
          className={`btn custom-btn ${value === 0 && "active-btn"}`}
          onClick={() => {
            setValue(0);
          }}
        >
          Courses
        </button>
        &nbsp;&nbsp;
        <button
          to={linkToSchool}
          className={`btn custom-btn ${value === 1 && "active-btn"}`}
          onClick={() => {
            setValue(1);
          }}
        >
          Mentors
        </button>
        &nbsp;&nbsp;
        <button
          to={linkToSchool}
          className={`btn custom-btn ${value === 2 && "active-btn"}`}
          onClick={() => {
            setValue(2);
          }}
        >
          Students
        </button>
      </div>
      <h3 className="mt-5">
        <small className="text-break">School Class Name:&nbsp;&nbsp;</small>
        <span id="secondary-title">{catalogue.className}</span>
      </h3>

      <article className="container">
        <section>
          {value === 1 ? (
            <CatalogueMentors key={catalogueId} {...catalogue} />
          ) : value === 2 ? (
            <CatalogueStudents key={catalogueId} {...catalogue} />
          ) : (
            value === 0 && <CatalogueCourses key={catalogueId} {...catalogue} />
          )}
        </section>
      </article>
    </div>
  );
};

export default CataloguePage;
