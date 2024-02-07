import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Bank from "../components/Bank";

//I still need to fetch user's jokes based on the junctiontable userJokes

function Library({ currentUser }) {
  // userJokes holds all the jokes the user owns, which are then sorted into seperate arrays by type
  const [userJokes, setUserJokes] = useState([]);
  const [userKnockKnocks, setUserKnockKnocks] = useState([]);
  const [userRiddles, setUserRiddles] = useState([]);
  const [userComics, setUserComics] = useState([]);
  // selectedJokeType dictates which array of jokes is displayed
  const [selectedJokeType, setSelectedJokeType] = useState("");

  useEffect(() => {
    getUserJokes();
  }, [selectedJokeType]);
  useEffect(() => {
    populateJokeTypes();
  }, [userJokes]);

  // this retrieves all the jokes the user owns and saves them in userJokes
  async function getUserJokes() {
    if (currentUser) {
      // console.log("getting user jokes")
      try {
        const { id } = currentUser;
        const resultJSON = await fetch(`/api/users/${id}/jokes`);
        const jokes = await resultJSON.json();
        setUserJokes(jokes);
      } catch (err) {
        console.log(err);
      }
    }
  }

  // this seperates the jokes into types to create the 3 seperate arrays, one for each joke type. Any joke that doesn't have a proper type will be omitted entierly
  function populateJokeTypes() {
    // console.log("userJokes: ")
    // console.log(userJokes)
    if (userJokes) {
      setUserKnockKnocks(userJokes.filter((e) => e.jokeType === "knockknock"));
      setUserRiddles(userJokes.filter((e) => e.jokeType === "riddle"));
      setUserComics(userJokes.filter((e) => e.jokeType === "comic"));
    }
  }

  function handleClick(e) {
    // console.log("handleClick")
    // console.log("joke type changed FROM " + selectedJokeType)
    setSelectedJokeType(e.target.name);
  }

  return (
    <div>
      {/* if no one is logged in you will only see a link asking you to log in.  otherwise you will see 3 buttons allowing you to chose which joke type to display */}
      {!currentUser ? (
        <div>
          <Link to="/">Log in to see your jokes</Link>
        </div>
      ) : (
        <div>
          <Bank currentUser={currentUser} />
          <br />
          <br />
          <br />
          <div>{currentUser.userName}'s Jokes</div> <br />
          <div>
            <button
              name="knockknock"
              onClick={handleClick}
              className="btn btn-outline-dark fixedWidthButton"
            >
              Knock Knock
            </button>
            <button
              name="riddle"
              onClick={handleClick}
              className="btn btn-outline-dark ms-2 me-2 fixedWidthButton"
            >
              Riddles
            </button>
            <button
              name="comic"
              onClick={handleClick}
              className="btn btn-outline-dark fixedWidthButton"
            >
              Comics <span></span>
            </button>
          </div>
          <br />
          {/* below we map through the joke type arrays and apply formating and extra lines based on the type.  If you don't have any jokes of that type it tells you that */}
          {selectedJokeType === "knockknock" && (
            <div>
              {!userKnockKnocks.length ? (
                <div>
                  You don't have any knock knock jokes yet. Go earn some stars
                  to get some!
                </div>
              ) : (
                <div>
                  {userKnockKnocks.map((joke, i) => (
                    <div key={i}>
                      <div>Knock Knock</div>
                      <div>Who's There?</div>
                      <div>{joke.setUp}</div>
                      <div>{joke.setUp} who?</div>
                      <div>{joke.punchLine}</div>
                      <br />
                      <div>________________________</div>
                      <br />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {selectedJokeType === "riddle" && (
            <div>
              {!userRiddles.length ? (
                <div>
                  You don't have any riddles yet. Go earn some stars to get
                  some!
                </div>
              ) : (
                <div>
                  {userRiddles.map((joke, i) => (
                    <div key={i}>
                      <div>{joke.setUp}</div>
                      <div>{joke.punchLine}</div>
                      <br />
                      <div>________________________</div>
                      <br />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {selectedJokeType === "comic" && (
            <div>
              {!userComics.length ? (
                <div>
                  You don't have any comics yet. Go earn some stars to get some!
                </div>
              ) : (
                <div>
                  {userComics.map((joke, i) => (
                    <div key={i}>
                      <img
                        src={`./public/images/${joke.punchLine}`}
                        width="400"
                        alt="NEW COMIC"
                      />
                      <br />
                      <div>________________________</div>
                      <br />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <br />
          <br />
          <Link to="/quiz">Earn more stars</Link>
          <br />
          <Link to="/store">Get more jokes</Link>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Link to="/">
            {currentUser ? `I'm not ${currentUser.userName}!` : "Login"}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Library;
