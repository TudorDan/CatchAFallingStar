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
            <GiBookmark className="logo" /> <span id="logo-name">e</span>
            Learning
          </NavLink>
        </h1>
      </div>
      <nav className="navbar font-weight-bolder">
        <NavLink
          to="/schools"
          activeStyle={activeLink}
          className="text-light mr-5"
        >
          Schools
        </NavLink>
        <NavLink
          to="/schools"
          activeStyle={activeLink}
          className="text-light mr-5"
        >
          Register
        </NavLink>
        <NavLink to="/schools" activeStyle={activeLink} className="text-light">
          Login
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
