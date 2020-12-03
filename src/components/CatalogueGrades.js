import React, { useEffect, useState } from "react";
import Loading from "./utils/Loading";
import Api from "./utils/Api";

const CatalogueGrades = (catalogue) => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const catalogueId = catalogue.id;
  const schoolID = window.location.href.split("/")[4];

  useEffect(() => {
    const getGrades = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolID}/catalogues/${catalogueId}/grades`
        );
        const gradesFromApi = response.data;
        setGrades(gradesFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getGrades();
  }, [schoolID, catalogueId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <h2 className="mt-5 text-left">School Class Courses:</h2>
      {grades.length === 0 ? (
        <h3 className="mt-5 text-info">No grades in current school class.</h3>
      ) : (
        catalogue.classCourses.map((course) => {
          //const { id, name, subject, description } = course;

          return <section>Hello</section>;
        })
      )}
    </>
  );
};

export default CatalogueGrades;
