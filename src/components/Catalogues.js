import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal from "sweetalert2";

const Catalogues = (school) => {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToCatalogue = `/schools/${schoolID}/catalogues/`;

  useEffect(() => {
    const getCatalogues = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/catalogues`);
        const cataloguesFromAPI = response.data;
        setCatalogues(cataloguesFromAPI);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getCatalogues();
  }, [schoolID]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <h2 className="mt-5 text-center">
        <span id="secondary-title">School Classes</span>
      </h2>

      <Link
        to={{
          pathname: linkToCatalogue,
          schoolData: {
            schoolTitle: school.name,
          },
        }}
        className="btn mt-5 custom-btn"
      >
        Add School Class
      </Link>

      <ul className="mt-5 mr-5">
        {catalogues.map((catalogue) => {
          const { id, name } = catalogue;

          return (
            <li key={id}>
              <div className="card mb-3 mt-3 p-2">
                <div className="row">
                  <div className="col-6">
                    <div className="d-inline">
                      <small className="text-break">Name:</small>&nbsp;&nbsp;
                      <Link
                        to={{
                          pathname: linkToCatalogue + id,
                          schoolData: {
                            schoolTitle: school.name,
                          },
                        }}
                      >
                        {name}
                      </Link>
                    </div>
                  </div>
                  <div className="col-6">
                    <Link
                      to={{
                        pathname: `/schools/${schoolID}/catalogues/${id}/update`,
                      }}
                      className="btn custom-btn mt-0 mr-3"
                    >
                      Update School Class
                    </Link>
                    <button
                      className="btn custom-btn2 mt-0"
                      onClick={() => {
                        swal
                          .fire({
                            title: `Are you sure you wish to delete ${name}?`,
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3ec1d5",
                            cancelButtonColor: "#3f000f",
                            confirmButtonText: "Yes, delete school class!",
                          })
                          .then(async (result) => {
                            if (result.isConfirmed) {
                              const response = await Api.delete(
                                `/schools/${schoolID}/catalogues/${id}`
                              );
                              if (response.status === 204) {
                                swal
                                  .fire(
                                    "Deleted!",
                                    "Your school class has been deleted.",
                                    "success"
                                  )
                                  .then(function () {
                                    window.location = `/schools/${schoolID}`;
                                  });
                              }
                            }
                          });
                      }}
                    >
                      Delete School Class
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Catalogues;
