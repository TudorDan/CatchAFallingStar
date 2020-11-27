import React, { useEffect, useState } from "react";
import Api from "./utils/Api";
import Loading from "./utils/Loading";

const CoursePage = () => {
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const schoolID = window.location.href.split("/")[4];
    const courseID = window.location.href.split("/")[6];
    const subjectTopics = ["History", "IT", "Astronomy"];

    useEffect(() => {
        const getCourse = async () => {
            try {
                const response = await Api.get(`/schools/${schoolID}/courses/${courseID}`);
                console.log(response);
                const schoolFromAPI = response.data;
                setCourse(schoolFromAPI);

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(true);
            }
        };

        getCourse();
    }, [schoolID, courseID]);

    if(loading){
        return <Loading key={0}/>;
    }

    return (
        <>
          <section className="mt-5 text-center">{course.name}</section>
          <small className="text-break">Subject:</small>{" "}
                {subjectTopics[course.subject]}{" "}
            <ul key={course.id} className="mt-5">
              <li>
                <small className="text-break">Description:</small> {course.description}{" "}
              </li>
              <li>
                <small className="text-break">Course Materials:</small>{" "}
                {course.courseMaterials.map((doc) => {
                  const { id, documentation } = doc;
                  return (
                    <ul key={course.courseMaterials.id}>
                      <li>Document: {documentation}</li>
                    </ul>
                  );
                })}
              </li>
            </ul>
          );
      </>
    )
}

export default CoursePage;