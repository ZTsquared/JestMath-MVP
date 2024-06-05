import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        JestMath <Link to="/login">Log Out</Link>
      </nav>
    </div>
  );
}

export default NavBar;
