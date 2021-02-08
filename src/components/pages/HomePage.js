import React from "react";
import SchoolsPage from "./SchoolsPage";

const HomePage = () => {
  return (
    <>
      <section
        id="hero"
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="container position-relative"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <h1>Online Schools System</h1>
          <h2>
            Finis coronat opus, <br />
            barba non facit philosophum
          </h2>
        </div>
      </section>
      <SchoolsPage />
    </>
  );
};

export default HomePage;
