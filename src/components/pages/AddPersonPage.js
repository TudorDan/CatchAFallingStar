import React, { useState } from "react";

const AddPersonPage = (props) => {
  const schoolName = props.location.schoolData.schoolTitle;
  const personType = props.location.schoolData.accessRights;
  //const accessRights = ["FORMENTORS", "FORSTUDENTS", "FORPRINCIPALS"];
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && photo && birthDate) {
      const person = { name, photo, birthDate, personType };
      console.log(person);
    } else {
      console.log("empty values");
    }
  };

  return (
    <div className="container school-list text-center">
      <h1 className="font-weight-bolder" id="school-title">
        {schoolName}
      </h1>
      <h3 className="mt-4">
        Add{" "}
        {personType === 0
          ? "Mentor"
          : personType === 1
          ? "Student"
          : "Principal"}
      </h3>

      <div className="card mb-3 mt-5">
        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="personName" className="col-sm-2 col-form-label">
              Name:
            </label>
            <input
              type="text"
              className="col-sm-9 form-control mt-1"
              id="personName"
              placeholder="Person name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="form-group row">
            <label htmlFor="personPhoto" className="col-sm-2 col-form-label">
              Photo:
            </label>
            <input
              type="text"
              className="col-sm-9 form-control mt-1"
              id="personPhoto"
              placeholder="Person photo"
              required
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            ></input>
          </div>

          <div className="frorm-group row mb-3">
            <label
              htmlFor="personBirthDate"
              className="col-sm-2 col-form-label"
            >
              BirthDate:
            </label>
            <input
              type="text"
              className="col-sm-9 form-control mt-1"
              id="personBirthDate"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            ></input>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
              <button type="submit" className="btn btn-primary">
                Add person
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonPage;
