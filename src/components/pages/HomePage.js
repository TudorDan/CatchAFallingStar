import React from "react";
import slide1 from "../../images/slide1.jpg";
import slide2 from "../../images/slide2.jpg";
import slide3 from "../../images/slide3.jpg";
import slide4 from "../../images/slide4.jpg";
import SchoolsPage from "./SchoolsPage";

const HomePage = () => {
  return (
    <div className="d-flex flex-column">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slide1} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>Online Schools System</h2>
              <p>Finis coronat opus</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={slide2} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>Online Schools System</h2>
              <p>Barba non facit philosophum</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={slide3} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>Online Schools System</h2>
              <p>Vivere memento</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={slide4} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>Online Schools System</h2>
              <p>Nemo dat quod non habet</p>
            </div>
          </div>
        </div>
      </div>
      <SchoolsPage />
    </div>
  );
};

export default HomePage;
