import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiDiamonds } from "react-icons/gi";
import Api from "../utils/Api";
import Loading from "../utils/Loading";
import swal2 from "sweetalert2";

const CoursePage = (props) => {
  const [course, setCourse] = useState([]);
  const [school, setSchool] = useState([]);
  const [loading, setLoading] = useState(true);
  const schoolId = window.location.href.split("/")[4];
  const courseId = window.location.href.split("/")[6];
  const linkToSchool = `/schools/${schoolId}`;

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolId}/courses/${courseId}`
        );
        const courseFromApi = response.data;
        setCourse(courseFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    const getSchool = async () => {
      try {
        const response = await Api.get(`/schools/${schoolId}`);
        const schoolFromApi = response.data;
        setSchool(schoolFromApi);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    getCourse();
    getSchool();
  }, [schoolId, courseId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-left">
      <h1 className="font-weight-bolder text-center" id="school-title">
        {school?.name}
      </h1>
      <div className="underline mb-3"></div>
      <div className="text-center mt-4">
        <Link to={linkToSchool} className="btn custom-btn">
          Back to school menu
        </Link>
        &nbsp;&nbsp;
        <Link to={linkToSchool} className="btn custom-btn">
          Add Document
        </Link>
      </div>
      <h3 className="mt-5">
        <small className="text-break">Course Name:&nbsp;&nbsp;</small>
        <span id="secondary-title">{course?.name}</span>
      </h3>

      <h3 className="mt-4">
        <GiDiamonds className="bullets" />
        &nbsp;
        <small className="text-break">Subject:&nbsp;&nbsp;</small>
        <span>{course?.subject?.subjectName}</span>
      </h3>
      <h3 className=" mb-5">
        <GiDiamonds className="bullets" />
        &nbsp;
        <small className="text-break">Description:&nbsp;&nbsp;</small>
        <span>{course.description}</span>
      </h3>
      {course.documents ? (
        course.documents.length === 0 ? (
          <h3 className="mt-5 text-info">No documents in current course.</h3>
        ) : (
          <div className="row d-flex">
            {course.documents.map((document) => {
              const { id, documentation, link } = document;

              return (
                <div className="col-sm-6" key={id}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-8">
                          <h3 className="card-title">{documentation}</h3>
                          <a href="/">{link}</a>
                        </div>
                        <div className="col-4">
                          <button
                            className="btn custom-btn2 mt-3"
                            onClick={() => {
                              swal2
                                .fire({
                                  title: `Are you sure you wish to delete ${documentation}?`,
                                  text: "You won't be able to revert this!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3ec1d5",
                                  cancelButtonColor: "#3f000f",
                                  confirmButtonText: "Yes, delete document!",
                                })
                                .then(async (result) => {
                                  if (result.isConfirmed) {
                                    const response = await Api.delete(
                                      `/schools/${schoolId}/courses/${courseId}/documents/${id}`
                                    );
                                    if (response.status === 204) {
                                      swal2
                                        .fire(
                                          "Deleted!",
                                          "Your mentor has been deleted.",
                                          "success"
                                        )
                                        .then(function () {
                                          window.location = `/schools/${schoolId}/courses/${courseId}`;
                                        });
                                    }
                                  }
                                });
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : null}
    </div>
  );
};

export default CoursePage;
