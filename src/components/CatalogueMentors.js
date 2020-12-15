import React, { useEffect, useState } from "react";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal2 from "sweetalert2";

const CatalogueMentors = () => {
  const schoolId = window.location.href.split("/")[4];
  const catalogueId = window.location.href.split("/")[6];
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiImgPath = "http://localhost:54719/images/";

  useEffect(() => {
    const getSchoolClassMentors = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolId}/catalogues/${catalogueId}/mentors`
        );
        const catalogueMentorsFromAPI = response.data;
        setMentors(catalogueMentorsFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchoolClassMentors();
  }, [schoolId, catalogueId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <h2 className="mt-5 text-left">School Class Mentors:</h2>
      {mentors.length === 0 ? (
        <h3 className="mt-5 text-info">No mentors in current school class.</h3>
      ) : (
        <ul>
          {mentors.map((mentor) => {
            const { id, name, birthDate, photo } = mentor;

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
                      <button
                        className="btn custom-btn2 mt-0"
                        onClick={() => {
                          swal2
                            .fire({
                              title: `Are you sure you wish to delete ${name} from this class?`,
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3ec1d5",
                              cancelButtonColor: "#3f000f",
                              confirmButtonText: "Yes, delete mentor!",
                            })
                            .then(async (result) => {
                              if (result.isConfirmed) {
                                const response = await Api.delete(
                                  `/schools/${schoolId}/catalogues/${catalogueId}/mentors/${id}`
                                );
                                if (response.status === 204) {
                                  swal2
                                    .fire(
                                      "Deleted!",
                                      "Your mentor has been deleted.",
                                      "success"
                                    )
                                    .then(function () {
                                      window.location = `/schools/${schoolId}/catalogues/${catalogueId}`;
                                    });
                                }
                              }
                            });
                        }}
                      >
                        Delete Mentor
                      </button>
                    </div>
                    <img
                      src={apiImgPath + photo}
                      className="card-img-bottom col-4 h-25"
                      alt="mentor"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default CatalogueMentors;
