import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const UpdateCataloguePage = (props) => {
  const [school, setSchool] = useState([]);
  const [catalogue, setCatalogue] = useState([]);
  const [loading, setLoading] = useState(false);
  const schoolId = window.location.href.split("/")[4];
  const catalogueId = window.location.href.split("/")[6];
  const linkForSchool = `/schools/${schoolId}`;
  const linkForCatalogue = `/schools/${schoolId}/catalogues/${catalogueId}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseSchool = await Api.get(linkForSchool);
        const responseCatalogue = await Api.get(linkForCatalogue);

        const schoolFromApi = responseSchool.data;
        const catalogueFromApi = responseCatalogue.data;

        setSchool(schoolFromApi);
        setCatalogue(catalogueFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    fetchData();
  }, [linkForSchool, linkForCatalogue]);

  if (loading) {
    return <Loading key={0} />;
  }
  console.log(catalogue);

  return (
    <div className="container school-list text-center">
      <h1 className="font-weight-bolder" id="school-title">
        {school.name}
      </h1>
      <div className="underline mb-3"></div>
      <h3 className="mt-4">Update School Class</h3>
      <Link to={linkForSchool} className="btn custom-btn">
        Back to school menu
      </Link>

      <div className="card mb-3 mt-5">
        <Formik
          className="mt-2"
          initialValues={{
            Name: "",
          }}
          onSubmit={async (catalogueData) => {
            console.log(catalogueData);
            debugger;
            setLoading(true);
            try {
              const response = await Api.put(linkForCatalogue, catalogueData);
              if (response.status === 204) {
                swal({
                  title: "Good job!",
                  text: "Your school class was updated",
                  icon: "success",
                }).then(function () {
                  window.location = `/schools/${schoolId}`;
                });
                console.log("success");
              }
              const catalogueFromApi = response.data;
              console.log(catalogueFromApi);

              setLoading(false);
            } catch (error) {
              console.log(error.response);
              setLoading(true);
            }
          }}
        >
          {() => (
            <Form className="mt-2">
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name:
                </label>
                <Field
                  type="text"
                  name="Name"
                  className="col-sm-9 form-control mt-1"
                  id="name"
                  placeholder={catalogue.Name}
                  required
                />
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <button type="submit" className="btn custom-btn">
                    Update School Class
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateCataloguePage;
