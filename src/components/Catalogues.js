import React, { useEffect, useState } from "react";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const Catalogues = () => {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];

  useEffect(() => {
    const getCatalogues = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/catalogues`);
        console.log(response);
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
      <ul>
        {catalogues.map((catalogue) => {
          const { id, className } = catalogue;
          return (
            <ul key={id} className="mt-5">
              <li>
                <small className="text-break">Name:</small> {className}{" "}
              </li>
            </ul>
          );
        })}
      </ul>
    </>
  );
};

export default Catalogues;
