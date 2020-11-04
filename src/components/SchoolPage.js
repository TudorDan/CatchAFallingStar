import React, { useEffect, useState } from "react";
import Api from "./utils/Api";

const SchoolPage = () => {
    const [school, setSchool] = useState([]);
    const [loading, setLoading] = useState(true);
    const schoolID = window.location.href.split("/")[4];
    
    
    const getSchool = async () => {
        try {
            const response = await Api.get(`/schools/${schoolID}`);
            console.log(response);
          const schoolFromAPI = response.data;
          setSchool(schoolFromAPI);
    
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(true);
        }
      };

      

      useEffect(() => {
          getSchool()
        },[getSchool]);
        
        if (loading) {
            return <h1>Loading...</h1>;
        }
        
        return ( 
            <>
            <h1>{school.name}</h1>
            <h1>{school.principal.name}</h1>
            <ul>Mentors:{school.mentorsList.map((mentor) => {
                const {id, name} = mentor;
                return (
                <li key={id}>{name}</li>
                );
            })}</ul>
            <ul>Students:{school.studentsList.map((student) => {
                const {id, name} = student;
                return (
                    <li key={id}>
                        {name}
                    </li>
                )
            })}</ul>
            <ul>Courses:{school.coursesList.map((course) => {
                const {id, name} = course;
                return(
                <li key={id}>{name}</li>
                )
            })}</ul>
            <ul>Classes:{school.cataloguesList.map((catalogue) => {
                const {id, className} = catalogue;
                return(
                    <li key={id}>
                        {className}
                    </li>
                ) 
            })}</ul>
            </>
        
        );
}

export default SchoolPage;