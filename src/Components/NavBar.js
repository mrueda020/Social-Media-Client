import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../Context/auth";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [active, setActive] = useState(path);

  const handleClick = (e) => {
    setActive(e.target.name);
    console.log(e.target.name);
  };
  return (
    <>
      {user ? (
        <div className="ui secondary  stackable pointing menu massive red">
          <Link name="home" className="ui item active" to="/">
            {user.username}
          </Link>

          <div className="right menu">
            <a name="logout" className="ui item" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="ui secondary  stackable pointing menu massive red">
          <Link
            name="home"
            className={active === "home" ? "ui item active" : "ui item"}
            onClick={(e) => {
              handleClick(e);
            }}
            to="/"
          >
            Home
          </Link>

          <div className="right menu">
            <Link
              name="login"
              className={active === "login" ? "ui item active" : "ui item"}
              onClick={(e) => {
                handleClick(e);
              }}
              to="/login"
            >
              Login
            </Link>
            <Link
              name="register"
              className={active === "register" ? "ui item active" : "ui item"}
              onClick={(e) => {
                handleClick(e);
              }}
              to="register"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
