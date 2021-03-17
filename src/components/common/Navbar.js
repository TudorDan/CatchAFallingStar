import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiBookmark } from "react-icons/gi";
import { useGlobalUser } from "../utils/AuthContext";

function Navbar() {
  const [isActive, setActive] = useState(false);
  const { user, logout } = useGlobalUser();

  console.log(user);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className="container d-flex align-items-center">
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
        {user.auth ? (
          <ul>
            <li>Welcome, {user.name}</li>&nbsp;&nbsp;
            <li>
              <NavLink to="/schools" onClick={logout}>
                Logout
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        )}

        <i
          className={`bi mobile-nav-toggle ${isActive ? "bi-x" : "bi-list"}`}
          onClick={handleToggle}
        ></i>
      </nav>
    </div>
  );
}

export default Navbar;
