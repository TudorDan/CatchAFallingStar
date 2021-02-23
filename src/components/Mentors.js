import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";
import swal from "sweetalert2";
import { FaBirthdayCake } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

const Mentors = (school) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolID = window.location.href.split("/")[4].split("#")[0];
  const linkToAddMentor = `/schools/${schoolID}/persons/0`;
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
          <div className="section-title">
            <h2>Mentors</h2>
            <p>Trainers Data</p>
          </div>

          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {mentors.length === 0 ? (
              <>
                <h3 className="mt-5 text-info mb-5">
                  No mentors in current school!
                </h3>
                <p className="mb-3"></p>
              </>
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
                            <MdSchool className="iconfont teach" />
                            MENTOR
                          </span>

                          <span>
                            <FaBirthdayCake className="iconfont" />
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

      <div className="why-us">
        <div className="content text-center">
          <Link to={linkToAddMentor} className="more-btn">
            Add Mentor <i className="bx bx-chevron-right"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Mentors;
