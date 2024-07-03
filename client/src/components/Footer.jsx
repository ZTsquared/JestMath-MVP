import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Footer({ currentComp }) {
  // const [loc, setLoc] = useState("");
  const { currentUser } = useAuth();

  return (
    <div>
      <br />
      <br />
      <Link
        to="/quiz"
        className={
          currentComp === "Quiz"
            ? "btn btn-link text-decoration-none text-secondary"
            : "btn btn-link text-decoration-none"
        }
      >
        Earn more stars
      </Link>
      <br />
      <Link
        to="/store"
        className={
          currentComp === "Store"
            ? "btn btn-link text-decoration-none text-secondary"
            : "btn btn-link text-decoration-none"
        }
      >
        Get more jokes
      </Link>
      <br />
      <Link
        to="/library"
        className={
          currentComp === "Library"
            ? "btn btn-link text-decoration-none text-secondary"
            : "btn btn-link text-decoration-none"
        }
      >
        {currentUser.userName}'s Jokes
      </Link>
      <br />
      <br />
      <br />
      <br />
      <Link to="/" className="btn btn-link text-decoration-none">
        {currentUser ? `I'm not ${currentUser.userName}!` : "Login"}
      </Link>
    </div>
  );
}

export default Footer;
