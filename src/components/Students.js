import React, { useEffect, useState } from "react";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/students`);
        const studentsFromAPI = response.data;
        setStudents(studentsFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getStudents();
  }, [schoolID]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <h2 className="mt-5 text-center">
        <span id="secondary-title">Students</span>
      </h2>
      <ul className="mt-5 mr-5">
        {students.map((student) => {
          const { id, name, birthDate, photo } = student;

          return (
            <li key={id}>
              <div className="card mb-3 mt-3">
                <div className="row">
                  <div className="card-body col-8 text-center">
                    <h5 className="card-title mentors text-center">
                      Name: {name}
                    </h5>
                    <p className="card-text">
                      <small className="text-muted mentors">
                        BirthDate: {birthDate.substr(0, 10)}
                      </small>
                    </p>
                  </div>
                  <img
                    src={photo}
                    className="card-img-bottom col-4 h-25"
                    alt="student"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Students;
