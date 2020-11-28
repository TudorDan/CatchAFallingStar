import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const Catalogues = (school) => {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToCatalogue = `/schools/${schoolID}/catalogues/`;

  useEffect(() => {
    const getCatalogues = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/catalogues`);
        const schoolFromAPI = response.data;
        setCatalogues(schoolFromAPI);

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
      <h2 className="mt-5 text-center">Catalogues</h2>
      <ul className="mt-5 mr-5">
        {catalogues.map((catalogue) => {
          const { id, className } = catalogue;

          return (
            <li key={id}>
              <div className="card mb-3 mt-3 p-2">
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
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Catalogues;
