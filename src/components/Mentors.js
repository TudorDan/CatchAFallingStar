import React, { useEffect, useState } from "react";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];

  useEffect(() => {
    const getMentors = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/mentors`);
        console.log(response);
        const schoolFromAPI = response.data;
        setMentors(schoolFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getMentors();
  }, [schoolID]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <h2 className="mt-5 text-center">Mentors</h2>
      <ul className="mt-5 mr-5">
        {mentors.map((mentor) => {
          const { id, name, birthDate, photo } = mentor;

          return (
            <li key={id}>
              <div class="card mb-3 mt-3">
                <div className="row">
                  <div class="card-body col-8 text-center">
                    <h5 class="card-title mentors text-center">Name: {name}</h5>
                    <p class="card-text">
                      <small class="text-muted mentors">
                        BirthDate: {birthDate.substr(0, 10)}
                      </small>
                    </p>
                  </div>
                  <img
                    src={photo}
                    class="card-img-bottom col-4 h-25"
                    alt="mentor"
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

export default Mentors;
