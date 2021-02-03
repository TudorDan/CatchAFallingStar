import React from "react";
import { NavLink } from "react-router-dom";
import { GiBookmark } from "react-icons/gi";

function Navbar() {
  return (
    <div className="menu">
      <section className="sticky-menu sticky">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h1>
                <NavLink to="/" exact className="link">
                  <GiBookmark className="logo" /> <span id="logo-name">e</span>
                  <span id="logo-text">Learning</span>
                </NavLink>
              </h1>
            </div>
            <div className="col-md-9">
              <div className="menu-box d-flex justify-content-end">
                <ul className="nav menu-nav">
                  <li className="nav-item dropdown active">
                    <NavLink to="/schools" className="mr-5">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink to="/schools">Login</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
