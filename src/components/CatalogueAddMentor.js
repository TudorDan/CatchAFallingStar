import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Loading from "./utils/Loading";
import Api from "./utils/Api";
import swal from "sweetalert";
import swal2 from "sweetalert2";

const CatalogueAddMentor = ({ catalogueName }) => {
  const [loading, setLoading] = useState(false);
  const schoolID = window.location.href.split("/")[4];
  const catalogueId = window.location.href.split("/")[6];
  const [mentors, setMentors] = useState([]);
  const [catalogueMentors, setCatalogueMentors] = useState([]);
  const linkForPost = `/schools/${schoolID}/catalogues/${catalogueId}/mentors`;

  useEffect(() => {
    const getSchoolMentors = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/mentors`);
        const mentorsFromApi = response.data;
        setMentors([
          { id: 0, name: "Please choose option" },
          ...mentorsFromApi,
        ]);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    const getCatalogueMentors = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolID}/catalogues/${catalogueId}/mentors`
        );
        const catalogueMentorsFromApi = response.data;
        setCatalogueMentors(catalogueMentorsFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getSchoolMentors();
    getCatalogueMentors();
  }, [schoolID, catalogueId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <>
      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Add new course</h2>
            <p>{catalogueName}</p>
          </div>

          <Formik
            className="mt-5 mt-lg-0"
            initialValues={{
              Id: "",
            }}
            onSubmit={async (mentorData) => {
              mentorData.Id = parseInt(mentorData.Id);

              setLoading(true);
              try {
                const response = await Api.post(linkForPost, mentorData);
                if (response.status === 201) {
                  swal({
                    title: "Good job!",
                    text: "Mentor was added to the school class",
                    icon: "success",
                  }).then(function () {
                    window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                  });
                  console.log("success");
                }
                const catalogueMentorFromApi = response.data;
                console.log(catalogueMentorFromApi);

                setLoading(false);
              } catch (error) {
                console.log(error.response);
                const response = error.response;
                let mentorName = "";
                catalogueMentors.map((mentor) => {
                  if (mentor.id === mentorData.Id) {
                    mentorName = mentor.name;
                  }
                  return "mentor check finished";
                });
                if (response.status === 409) {
                  swal2
                    .fire({
                      title: `Mentor ${mentorName} already exists in this school class!`,
                      text: "Choose someone else!",
                    })
                    .then(function () {
                      window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                    });
                }
                if (response.status === 400) {
                  swal2
                    .fire({
                      title: `No mentor was selected!`,
                      text: "Please choose someone!",
                    })
                    .then(function () {
                      window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                    });
                }

                setLoading(true);
              }
            }}
          >
            {() => (
              <Form className="php-email-form mt-5 mb-4">
                <div className="form-group d-flex flex-row">
                  <label htmlFor="mentorId" className="col-sm-2 col-form-label">
                    Choose Mentor:
                  </label>
                  <Field component="select" name="Id" id="mentorId">
                    {mentors.map((mentor) => {
                      const { id, name } = mentor;
                      console.log(id, name);
                      return (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      );
                    })}
                  </Field>
                </div>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                <div className="text-center">
                  <button type="submit" className="btn-add">
                    Add Mentor
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>

      {/* OLD VERSION BELOW */}
      {/* <h3 className="mt-4">Add new Mentor</h3>
      <div className="card mb-3 mt-5">
        <Formik
          className="mt-2"
          initialValues={{
            Id: "",
          }}
          onSubmit={async (mentorData) => {
            mentorData.Id = parseInt(mentorData.Id);
            
            setLoading(true);
            try {
              const response = await Api.post(linkForPost, mentorData);
              if (response.status === 201) {
                swal({
                  title: "Good job!",
                  text: "Mentor was added to the school class",
                  icon: "success",
                }).then(function () {
                  window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                });
                console.log("success");
              }
              const catalogueMentorFromApi = response.data;
              console.log(catalogueMentorFromApi);

              setLoading(false);
            } catch (error) {
              console.log(error.response);
              const response = error.response;
              let mentorName = "";
              catalogueMentors.map((mentor) => {
                if (mentor.id === mentorData.Id) {
                  mentorName = mentor.name;
                }
                return "mentor check finished";
              });
              if (response.status === 409) {
                swal2
                  .fire({
                    title: `Mentor ${mentorName} already exists in this school class!`,
                    text: "Choose someone else!",
                  })
                  .then(function () {
                    window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                  });
              }
              if (response.status === 400) {
                swal2
                  .fire({
                    title: `No mentor was selected!`,
                    text: "Please choose someone!",
                  })
                  .then(function () {
                    window.location = `/schools/${schoolID}/catalogues/${catalogueId}`;
                  });
              }

              setLoading(true);
            }
          }}
        >
          {() => (
            <Form className="mt-2">
              <div className="form-group-row">
                <label htmlFor="mentorId" className="col-sm-2 col-form-label">
                  Choose Mentor:
                </label>
                <Field component="select" name="Id" id="mentorId">
                  {mentors.map((mentor) => {
                    const { id, name } = mentor;
                    console.log(id, name);
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </Field>
              </div>

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
      </div> */}
    </>
  );
};

export default CatalogueAddMentor;
