import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal from "sweetalert2";

const Mentors = (school) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4];
  const linkToAddMentor = `/schools/${schoolID}/persons`;
  const apiImgPath = "http://localhost:54719/images/";

  useEffect(() => {
    const getMentors = async () => {
      try {
        const response = await Api.get(`/schools/${schoolID}/mentors`);
        const mentorsFromAPI = response.data;
        setMentors(mentorsFromAPI);

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
      <section id="trainers" className="trainers">
        <div className="container" data-aos="fade-up">
          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {mentors.length === 0 ? (
              <h3 id="loading">No mentors in current school!</h3>
            ) : (
              <>
                {mentors.map((mentor) => {
                  const { id, name, birthDate, photo } = mentor;

                  return (
                    <div
                      key={id}
                      className="col-lg-4 col-md-6 d-flex align-items-stretch"
                    >
                      <div className="member">
                        <img
                          src={apiImgPath + photo}
                          className="img-fluid"
                          alt="mentor"
                        />
                        <div className="member-content">
                          <h4>{name}</h4>
                          <span>
                            <i className="icofont-teacher iconfont"></i>
                            MENTOR
                          </span>
                          <span>
                            <i className="icofont-birthday-cake iconfont"></i>
                            {birthDate.substr(0, 10)}
                          </span>
                          <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Temporibus cumque, perspiciatis velit fugiat
                            suscipit delectus consectetur quam natus
                            perferendis!
                          </p>
                        </div>

                        <div className="trainer d-flex justify-content-around align-items-center">
                          <div className="trainer-profile d-flex align-items-center">
                            <Link
                              to={{
                                pathname: `${linkToAddMentor}/${id}`,
                                schoolData: {
                                  schoolTitle: school.name,
                                  accessRights: 0,
                                },
                              }}
                              className="get-started-btn"
                            >
                              Update
                            </Link>
                          </div>

                          <div className="trainer-rank d-flex align-items-center">
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
                                    confirmButtonText: "Yes, delete mentor!",
                                  })
                                  .then(async (result) => {
                                    if (result.isConfirmed) {
                                      const response = await Api.delete(
                                        `/schools/${schoolID}/mentors/${id}`
                                      );
                                      if (response.status === 204) {
                                        swal
                                          .fire(
                                            "Deleted!",
                                            "Your mentor has been deleted.",
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
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
      <div className="breadcrumbs">
        <Link
          to={{
            pathname: linkToAddMentor,
            schoolData: {
              schoolTitle: school.name,
              accessRights: 0,
            },
          }}
          className="btn-add"
        >
          Add Mentor
        </Link>
      </div>
    </>
  );
};

export default Mentors;
