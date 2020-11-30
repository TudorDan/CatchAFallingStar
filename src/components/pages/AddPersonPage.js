import React, { useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import Api from "../utils/Api";
import Loading from "../utils/Loading";

const AddPersonPage = (props) => {
  const schoolID = useParams().id;
  const schoolName = props.location.schoolData.schoolTitle;
  const personType = props.location.schoolData.accessRights;
  //const accessRights = ["FORMENTORS", "FORSTUDENTS", "FORPRINCIPALS"];

  /* const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date()); */
  const [person, setPerson] = useState({
    name: "",
    photo: "",
    birthDate: new Date(),
    accessRights: personType,
  });

  const [loading, setLoading] = useState(false);
  const linkForPost =
    personType === 0
      ? `/schools/${schoolID}/mentors`
      : personType === 1
      ? `/schools/${schoolID}/students`
      : `/schools/${schoolID}/principal`;

  const postPerson = async (personData) => {
    setLoading(true);
    try {
      const response = await Api.post(linkForPost, { personData });
      const personFromApi = response.data;
      console.log(personFromApi);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.name && person.photo && person.birthDate) {
      //const person = { name, photo, birthDate, personType };

      let personData = new FormData();
      personData.append("name", person.name);
      personData.append("photo", person.photo);
      personData.append("birthDate", person.birthDate);
      personData.append("accessRights", person.personType);
      console.log(person);

      postPerson(person);
      console.log(props);
      props.history.push(`/schools/${schoolID}`);
    } else {
      console.log("empty values");
    }
  };

  if (loading) {
    return <Loading key={0} />;
  }

  return (
    <div className="container school-list text-center">
      <h1 className="font-weight-bolder" id="school-title">
        {schoolName}
      </h1>
      <div class="underline mb-3"></div>
      <h3 className="mt-4">
        Add{" "}
        {personType === 0
          ? "Mentor"
          : personType === 1
          ? "Student"
          : "Principal"}
      </h3>

      <div className="card mb-3 mt-5">
        <form className="mt-2">
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name:
            </label>
            <input
              type="text"
              className="col-sm-9 form-control mt-1"
              id="name"
              placeholder="Person name"
              required
              name="name"
              value={person.name}
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-group row">
            <label htmlFor="photo" className="col-sm-2 col-form-label">
              Photo:
            </label>
            <input
              type="file"
              className="col-sm-9 form-control mt-1"
              id="photo"
              required
              name="photo"
              value={person.photo}
              onChange={handleChange}
            ></input>
          </div>

          <div className="frorm-group row mb-3">
            <label htmlFor="birthDate" className="col-sm-2 col-form-label">
              BirthDate:
            </label>
            <input
              type="date"
              min="1901-01-01"
              max="2014-01-01"
              className="col-sm-9 form-control mt-1"
              id="birthDate"
              required
              name="birthDate"
              value={person.birthDate}
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn custom-btn"
              >
                Add person
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(AddPersonPage);
