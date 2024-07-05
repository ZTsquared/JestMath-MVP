import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Footer({ currentComp }) {
  // const [loc, setLoc] = useState("");
  const { currentUser } = useAuth();

  //change from links to buttons for better user experience.  change player button should maybe be somewhere else?
  return (
    <div>
      {/* <button className="btn btn-outline-dark m-2">Quiz</button>
      <button className="btn btn-outline-dark m-2">Joke Store</button>
      <button className="btn btn-outline-dark m-2">Your Jokes</button> */}
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
        Quiz
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
        Joke Store
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
        {currentUser.userName}'s Joke Library
      </Link>
    </div>
  );
}

export default Footer;
