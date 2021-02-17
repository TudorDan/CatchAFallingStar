import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal from "sweetalert2";

const Catalogues = (school) => {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4].split("#")[0];
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
      <section id="features" className="features">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Catalogues</h2>
            <p>School Classes</p>
          </div>

          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {catalogues.length === 0 ? (
              <h3 id="loading">No school classes in current school!</h3>
            ) : (
              <>
                {catalogues.map((catalogue) => {
                  const { id, name } = catalogue;

                  return (
                    <div key={id} className="col-10 mt-4">
                      <div className="icon-box">
                        <i
                          className="ri-price-tag-2-line"
                          style={{ color: "#4233ff" }}
                        ></i>

                        <h3 id="course-title">
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
                        </h3>

                        <div className="ms-auto">
                          <Link
                            to={{
                              pathname: `/schools/${schoolID}/catalogues/${id}/update`,
                            }}
                            className="get-started-btn"
                          >
                            Update
                          </Link>
                          &nbsp;&nbsp;
                          <button
                            className="get-started-btn border-0"
                            onClick={() => {
                              swal
                                .fire({
                                  title: `Are you sure you wish to delete ${name}?`,
                                  text: "You won't be able to revert this!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3ec1d5",
                                  cancelButtonColor: "#3f000f",
                                  confirmButtonText:
                                    "Yes, delete school class!",
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
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>

      <div className="why-us">
        <div className="content text-center">
          <Link
            to={{
              pathname: linkToCatalogue,
              schoolData: {
                schoolTitle: school.name,
              },
            }}
            className="more-btn"
          >
            Add Class <i className="bx bx-chevron-right"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Catalogues;
