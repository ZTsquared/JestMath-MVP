import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Bank from "../components/Bank";
import KnockKnock from "../components/KnockKnock";
import Riddle from "../components/Riddle";
import Comic from "../components/Comic";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";

function Store() {
  const { currentUser, getUser } = useAuth();
  const [newJoke, setNewJoke] = useState("");
  const [offerNewJoke, setOfferNewJoke] = useState(true);
  const jokePrice = 8;

  useEffect(() => {
    if (currentUser) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (newJoke !== "") {
      addJokeToUserLibrary();
    }
  }, [newJoke]);

  // gets a random joke that the user does not already own from the library
  async function getJoke() {
    const resultJSON = await fetch(
      `/api/jokes/random/?userId=${currentUser.id}`
    );
    const joke = await resultJSON.json();
    setNewJoke(joke);
  }

  // adds to the user balance.  in handleSubmit this function is called with a negative value for "quantity" so that we deduct from the balance
  async function addToBalance(quantity) {
    try {
      await fetch(`/api/users/${currentUser.id}/increaseBalance/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: quantity }),
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  }

  // adds an entry in the usersJokes junction table so that the user joke will show in the users library
  async function addJokeToUserLibrary() {
    console.log(newJoke);
    const userId = currentUser.id;
    const jokeId = newJoke.id;
    try {
      console.log("adding joke to library");
      // await fetch(`/api/usersJokes/`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ userId: userId, jokeId: jokeId }),
      // });
      await fetch(`/api/users/${currentUser.id}/addJokeToLibrary/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jokeId: jokeId }),
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  }

  function handleSubmit() {
    if (currentUser.balance >= jokePrice) {
      // get a new joke
      getJoke();
      // deduct the joke price from the user's balance
      addToBalance(-jokePrice);
      // toggle offerNewJoke state so that the button to buy a new joke disappears
      setOfferNewJoke(false);
    }
  }

  return (
    <div>
      <Bank />
      <br />
      <br />
      <br />
      {/* depending on the joke type a differnt component is displayed.  the component contains the logic of how the joke is displayed */}
      {newJoke?.jokeType === "knockknock" && <KnockKnock joke={newJoke} />}
      {newJoke?.jokeType === "riddle" && <Riddle joke={newJoke} />}
      {newJoke?.jokeType === "comic" && <Comic joke={newJoke} />}
      <br />
      <br />
      {/* this button to get a new joke only shows if you have not just bought one - would be cool to add a 1 min timer so you can't buy jokes at too high a rate */}
      {offerNewJoke && (
        <div>
          <button
            onClick={handleSubmit}
            className="btn btn-outline-dark"
            disabled={!currentUser || currentUser.balance < jokePrice}
          >
            {" "}
            {currentUser ? "Get a new joke!  8 stars" : "re-log required"}
          </button>{" "}
          <br />
          <br />
          <br />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Store;
