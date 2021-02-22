import React, { useEffect, useState } from "react";
import Loading from "./utils/Loading";
import Api from "./utils/Api";

const CatalogueGrades = (catalogue) => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const catalogueId = catalogue.id;
  const schoolID = window.location.href.split("/")[4];
  const linkGetCatalogueGrades = `/schools/${schoolID}/catalogues/${catalogueId}/grades`;

  useEffect(() => {
    const getGrades = async () => {
      try {
        const response = await Api.get(linkGetCatalogueGrades);
        const gradesFromApi = response.data;
        setGrades(gradesFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getGrades();
  }, [linkGetCatalogueGrades]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <section id="why-us" className="why-us">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Grades</h2>
            <p>{catalogue.name}</p>
          </div>

          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {grades.length === 0 ? (
              <>
                <h3 className="mt-5 text-info mb-5">
                  No grades in current school class.
                </h3>
                <p className="mb-3"></p>
              </>
            ) : (
              <table className="table table-striped table-bordered table-hover text-center">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Mark</th>
                    <th>Mentor</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade) => {
                    const { id, student, mark, course, mentor, date } = grade;

                    return (
                      <tr key={id}>
                        <td>{student.name}</td>
                        <td>{course.name}</td>
                        <td>{date.substr(0, 10)}</td>
                        <td>{mark}</td>
                        <td>{mentor.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CatalogueGrades;
