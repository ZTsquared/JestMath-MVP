import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function NavBar() {
  const { isLoggedIn, onLogout } = useAuth();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul>
          <li className="nav-link">
            JestMath{" "}
            {isLoggedIn && (
              <Link onClick={onLogout} to="/login">
                Log Out
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
