import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Bank from '../components/Bank';

//I still need to fetch user's jokes based on the junctiontable userJokes

function Library({currentUser}) {

  const [selectedJokeType, setSelectedJokeType] = useState("")
  const [userJokes, setUserJokes] = useState([])
  const [userKnockKnocks, setUserKnockKnocks] = useState([])
  const [userRiddles, setUserRiddles] = useState([])
  const [userComics, setUserComics] = useState([])

  useEffect(() => {getUserJokes()}, [selectedJokeType])
  useEffect(() => {populateJokeTypes()}, [userJokes])
  useEffect(() => {console.log(userJokes);console.log(userKnockKnocks);console.log(userRiddles);console.log(userComics)}, [selectedJokeType])
 

  async function getUserJokes () {
    if (currentUser){
      console.log("getting user jokes")
      try {
        const {id} = currentUser
        const resultJSON = await fetch(`/api/users/${id}/jokes`);
        const jokes = await resultJSON.json();
        setUserJokes(jokes)
      } catch (err){
        console.log(err)
      }
    }
  }


  function populateJokeTypes (){
    // console.log("userJokes: ")
    // console.log(userJokes)
    if (userJokes){
      setUserKnockKnocks(userJokes.filter((e) => e.jokeType === "knockknock"));
      setUserRiddles(userJokes.filter((e) => e.jokeType === "riddle"));
      setUserComics(userJokes.filter((e) => e.jokeType === "comic"));
    }
  }


  function handleClick (e) {
    console.log("handleClick")
    console.log("joke type changed FROM " + selectedJokeType)
    setSelectedJokeType(e.target.name)
  }

  return (
    <div>
      {!currentUser ? <div><Link to = "/">Log in to see your jokes</Link></div> :
        <div>
          <Bank currentUser = {currentUser} />
          <br /><br /><br />
          <div>{currentUser.userName}'s Jokes</div> <br />
          <button name = "knockknock" onClick = {handleClick} className="btn btn-outline-dark">Knock Knock Jokes</button>
          <button name = "riddle" onClick = {handleClick} className="btn btn-outline-dark">Riddle</button>
          <button name = "comic" onClick = {handleClick} className="btn btn-outline-dark">Comic - comming soon!</button>
          <br />
        <br />
        {selectedJokeType === "knockknock" && 
          <div>
          {!userKnockKnocks.length ? 
            <div>You don't have any knock knock jokes yet. Go earn some stars to get some!</div> : 
            <div>
              {userKnockKnocks.map((joke, i) => 
                <div key={i}>
                  <div>Knock Knock</div>
                  <div>Who's There?</div>
                  <div>{joke.setUp}</div>
                  <div>{joke.setUp} who?</div>
                  <div>{joke.punchLine}</div>
                  <br /><div>________________________</div><br />
              </div>)}
            </div>}
          {/* {userJokes?.filter((({jokeType}) => (jokeType === "riddle")))?.map((joke, i) => <div key={i}><div>{joke.setUp}</div><div>{joke.punchLine}</div><br /></div>)} */}
        </div> 
        }
        {selectedJokeType === "riddle" && 
          <div>
            {!userRiddles.length ? 
              <div>You don't have any riddles yet. Go earn some stars to get some!</div> : 
              <div>
                {userRiddles.map((joke, i) => 
                  <div key={i}>
                    <div>{joke.setUp}</div>
                    <div>{joke.punchLine}</div>
                    <br /><div>________________________</div><br />
                </div>)}
              </div>}
            {/* {userJokes?.filter((({jokeType}) => (jokeType === "riddle")))?.map((joke, i) => <div key={i}><div>{joke.setUp}</div><div>{joke.punchLine}</div><br /></div>)} */}
          </div> 
        }
        {selectedJokeType === "comic" && 
          <div>
            {!userComics.length ? 
              <div>You don't have any comics yet. Go earn some stars to get some!</div> : 
              <div>
                {userComics.map((joke, i) => 
                  <div key={i}>
                    <div>{joke.setUp}</div>
                    <div>{joke.punchLine}</div>
                    <br /><div>________________________</div><br />
                </div>)}
              </div>}
            {/* {userJokes?.filter((({jokeType}) => (jokeType === "riddle")))?.map((joke, i) => <div key={i}><div>{joke.setUp}</div><div>{joke.punchLine}</div><br /></div>)} */}
          </div> 
        }
        {/* Here I need to Map through user's jokes and display them appropriately to their format */}
        <br /><br />
        <Link to="/quiz">Earn more stars</Link>
        <br />
        <Link to="/store">Get more jokes</Link>
        <br /><br /><br /><br /><br />
        <Link to = "/">{currentUser ? `I'm not ${currentUser.userName}!` : "Login"}</Link>
      </div>}
    </div>
    
  )
}

export default Library