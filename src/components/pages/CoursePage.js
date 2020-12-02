import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GiDiamonds } from "react-icons/gi";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const CoursePage = (props) => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const { schoolId, courseId } = useParams();
  const subjectTopics = ["History", "IT", "Astronomy", "Physics", "Geography"];
  const schoolName = props.location.schoolData.schoolTitle;
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

    getCourse();
  }, [schoolId, courseId]);

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-left">
      <h1 className="font-weight-bolder text-center" id="school-title">
        {schoolName}
      </h1>
      <div class="underline mb-3"></div>
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
        <span id="secondary-title">{course.name}</span>
      </h3>

      <h3 className="mt-4">
        <GiDiamonds className="bullets" />
        &nbsp;
        <small className="text-break">Subject:&nbsp;&nbsp;</small>
        <span>{subjectTopics[course.subject.id]}</span>
      </h3>
      <h3 className=" mb-5">
        <GiDiamonds className="bullets" />
        &nbsp;
        <small className="text-break">Description:&nbsp;&nbsp;</small>
        <span>{course.description}</span>
      </h3>
      <div className="row d-flex">
        <div className="col-sm-6">
          {course.courseMaterials.map((document) => {
            const { id, documentation, link } = document;

            return (
              <div className="card mb-3" key={id}>
                <div className="card-body">
                  <h3 className="card-title">{documentation}</h3>
                  <a href="/" className="btn custom-btn2">
                    {link}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
