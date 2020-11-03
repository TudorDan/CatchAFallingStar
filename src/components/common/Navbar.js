import React from "react";
import { NavLink } from "react-router-dom";
import { GiBookmark } from "react-icons/gi";

function Navbar() {
  const activeLink = { color: "white" };

  return (
    <div className="container d-flex">
      <div className="mr-auto">
        <h1>
          <NavLink to="/" exact activeStyle={activeLink} className="text-light">
            <GiBookmark className="logo" /> E-Learning App
          </NavLink>
        </h1>
      </div>
      <nav className="navbar font-weight-bolder">
        <NavLink to="/schools" activeStyle={activeLink}>
          Schools List
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
