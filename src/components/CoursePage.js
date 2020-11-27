import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const CoursePage = (props) => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const { schoolId, courseId } = useParams();
  const subjectTopics = ["History", "IT", "Astronomy"];
  const schoolName = props.location.schoolData.schoolTitle;
  const linkToSchool = `/schools/${schoolId}`;

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await Api.get(
          `/schools/${schoolId}/courses/${courseId}`
        );
        console.log(response);
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
    <div className="container school-list text-center">
      <Link to={linkToSchool} className="btn btn-secondary mb-5">
        Back to school menu
      </Link>
      <h1 className="font-weight-bolder" id="school-title">
        {schoolName}
      </h1>
      <h2 className="mt-5">
        <small className="text-break">Course Name:&nbsp;&nbsp;</small>
        <span id="secondary-title">{course.name}</span>
      </h2>
      <h3 className="mt-5">
        <small className="text-break">Subject:&nbsp;&nbsp;</small>
        <span>{subjectTopics[course.subject]}</span>
      </h3>
      <h3 className="mt-5 mb-5">
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
                  <a href="/" className="btn btn-primary">
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
