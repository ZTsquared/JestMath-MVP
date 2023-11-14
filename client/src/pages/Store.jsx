import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Bank from '../components/Bank';
import KnockKnock from '../components/KnockKnock';
import Riddle from '../components/Riddle';
import Comic from '../components/Comic';

// to do:
//fetch a random joke (checking that it is not in the junction table for that user already)
//display it with conditional formatting based on joke type
//add entry to the junction table to record that the user owns that joke
//deduct price from user's balance
//link this functionality to the button

function Store({currentUser, getUser}) {

  const [newJoke, setNewJoke] = useState("") 
  const [offerNewJoke, setOfferNewJoke] = useState(true) 
  const [displayJoke, setDisplayJoke] = useState(false)
  const jokePrice = 8

  async function getJoke () {
    const resultJSON = await fetch(`/api/jokes/random/?user_id=${currentUser.id}`);
    const joke = await resultJSON.json();
    setNewJoke(joke);
  }

  async function addToBalance(quantity) {
    try {
      await fetch (`/api/users/${currentUser.id}/increaseBalance/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"quantity" : quantity})
      });
      await fetch (`/api/users/${currentUser.id}/increaseLifetimeTotal/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"quantity" : quantity})
      });
      getUser()
    } catch (err) {
      console.log(err)
    }
  }


  function handleSubmit () {
    if (currentUser.balance >= jokePrice) {
      getJoke()
      setDisplayJoke(true)
      setOfferNewJoke(false);
      addToBalance(-jokePrice);
    }
  }



  return (
    <div>
        <Bank currentUser = {currentUser}/>
        <br /><br /><br />
        {/* if newJoke.jokeType === knockknock show knockknock component and so on for all joke types.  pass newJoke as prop.  make a component for each joke type. */}
        {(newJoke?.jokeType === "knockknock") && <KnockKnock joke = {newJoke}/>}
        {(newJoke?.jokeType === "riddle") && <Riddle joke = {newJoke}/>}
        {(newJoke?.jokeType === "comic") && <Comic joke = {newJoke}/>}
        <br /><br />
        {offerNewJoke && <div><button onClick = {handleSubmit} className="btn btn-outline-dark" disabled = {!currentUser || currentUser.balance < jokePrice}> {currentUser ? "Get a new joke!  8 stars" : "re-log required"}</button> <br /><br /><br /></div>}
        <Link to="/quiz">Earn more stars</Link>
        <br />
        <Link to="/library">{currentUser.userName}'s Jokes</Link>
        <br /><br /><br /><br /><br />
        <Link to = "/">{currentUser ? `I'm not ${currentUser.userName}!` : "Login"}</Link>
    </div>
  )
}

export default Store