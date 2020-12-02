import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const Catalogues = (school) => {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToCatalogue = `/schools/${schoolID}/catalogues/`;
  const linkToAddCatalogue = `/`;
  const linkToUpdateCatalogue = `/`;
  const linkToDeleteCatalogue = `/`;

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
          pathname: linkToAddCatalogue,
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
          const { id, className } = catalogue;

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
                        {className}
                      </Link>
                    </div>
                  </div>
                  <div className="col-6">
                    <Link
                      to={{
                        pathname: linkToUpdateCatalogue,
                        schoolData: {
                          schoolTitle: school.name,
                        },
                      }}
                      className="btn custom-btn mt-0 mr-3"
                    >
                      Update School Class
                    </Link>
                    <Link
                      to={{
                        pathname: linkToDeleteCatalogue,
                        schoolData: {
                          schoolTitle: school.name,
                        },
                      }}
                      className="btn custom-btn2 mt-0"
                    >
                      Delete School Class
                    </Link>
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
