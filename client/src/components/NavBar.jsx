import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function NavBar() {
  const { isLoggedIn, onLogout, currentHouseholdName } = useAuth();
  return (
    <div
      className="card pt-0 pl-2 pr-2 border rounded-3 mb-4"
      style={{ backgroundColor: "#f8f9fa", borderColor: "#ddd" }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Link to="/" className="text-dark">
              <i className="fas fa-home" style={{ fontSize: "2em" }}></i>
            </Link>
            <img
              src={`./images/JestMath-Logo-NoBackground.png`} // use this line instead of the one below when deploying to heroku
              // src={`./public/images/${joke.punchLine}`} // might need to use this line instead of the one above when working on localhost
              height="70"
              alt="JestMath Logo"
            />
          </div>

          {isLoggedIn && (
            <div className="dropdown">
              <span
                className="dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentHouseholdName}
              </span>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/">
                    Change Player
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/parentportal">
                    Parent Portal
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={onLogout}
                    to="/login"
                  >
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
