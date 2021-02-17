import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiBookmark } from "react-icons/gi";

function Navbar() {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className="container d-flex align-items-center">
      {/* <button type="button" className="mobile-nav-toggle d-lg-none">
        <i className="icofont-navigation-menu"></i>
      </button> */}
      <NavLink to="/" exact className="logo me-auto">
        <GiBookmark className="img-fluid" />
        <span>e</span>
        <span>Learning</span>
      </NavLink>

      <nav
        id="navbar"
        className={`navbar order-last order-lg-0 ${
          isActive ? "navbar-mobile" : ""
        }`}
      >
        <ul>
          <li>
            <NavLink to="/schools">Register</NavLink>
          </li>
          <li>
            <NavLink to="/schools">Login</NavLink>
          </li>
        </ul>
        <i
          className={`bi mobile-nav-toggle ${isActive ? "bi-x" : "bi-list"}`}
          onClick={handleToggle}
        ></i>
      </nav>
    </div>
  );
}

export default Navbar;
