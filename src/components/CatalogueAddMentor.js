import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Loading from "./utils/Loading";
import Api from "./utils/Api";
import swal from "sweetalert";

const CatalogueAddMentor = (catalogue) => {
  const [loading, setLoading] = useState(false);
  const schoolID = window.location.href.split("/")[4];
  const [mentors, setMentors] = useState([]);
  const linkForPost = `/schools/${schoolID}/catalogues/${catalogue.id}/mentors`;

  useEffect(() => {
    const getSchoolMentors = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/mentors`);
        const mentorsFromApi = response.data;
        setMentors(mentorsFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchoolMentors();
  }, [schoolID]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <h3 className="mt-4">Add new Mentor</h3>
      <div className="card mb-3 mt-5">
        <Formik
          className="mt-2"
          initialValues={{
            Id: "",
          }}
          onSubmit={async (mentorData) => {
            setLoading(true);
            try {
              mentorData.Id = parseInt(mentorData.Id);
              const response = await Api.post(linkForPost, mentorData);
              if (response.status === 201) {
                swal({
                  title: "Good job!",
                  text: "Mentor was added to the school class",
                  icon: "success",
                }).then(function () {
                  window.location = `/schools/${schoolID}/catalogues`;
                });
                console.log("success");
              }
              const catalogueMentorFromApi = response.data;
              console.log(catalogueMentorFromApi);

              setLoading(false);
            } catch (error) {
              console.log(error.response);
              setLoading(true);
            }
          }}
        >
          {(values) => (
            <Form className="mt-2">
              <div className="form-group-row">
                <label htmlFor="mentorId" className="col-sm-2 col-form-label">
                  Choose Mentor:
                </label>
                <Field
                  as="select"
                  name="Id"
                  id="mentorId"
                  value="selectedValue"
                >
                  {/* <option>Please choose</option> */}
                  {mentors.map((mentor) => {
                    const { id, name } = mentor;

                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <div className="form-group row">
                <div className="col-sm-12 text-center">
                  <button type="submit" className="btn custom-btn">
                    Add Mentor
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CatalogueAddMentor;
