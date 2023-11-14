import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Bank from '../components/Bank';
// import QuestionView from '../components/QuestionView';
// import Question from '../components/Question';


function Quiz({currentUser, getUser}) {
  
  const roundLength = 10
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [roundInProgress, setRoundInProgress] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [submittedAnswer, setSubmittedAnswer] = useState("")
  const [currentCorrect, setCurrentCorrect] = useState(false)
  
  // reset the user's answer to "" whenever they submit an answer so that the input field will be blank again
  useEffect(() => {setUserAnswer("")},[submittedAnswer])
  
  // reset a bunch of state fresh for a new round of play
  function resetRound(){
    setUserAnswer("");
    setCurrentCorrect(false);
    setCurrentIndex(0);
    setRoundInProgress(true);
    setSubmittedAnswer("");
    selectQuestions ();
  }
  
  //fetch random selection of questions based on predetermined roundLength variable:
  async function selectQuestions () {
    try {
      const results = await fetch (`/api/questions/random/${roundLength}`);
      const questions = await results.json();
      // console.log(questions)
      setSelectedQuestions(questions)
    } catch (err) {
      console.log(err)
    }
  }

  // move on to the next question
  function nextQuestion () {
    setUserAnswer("");
    if (currentIndex + 1 < selectedQuestions.length) {
      setCurrentIndex(currentIndex + 1)
      // console.log(selectedQuestions[currentIndex].question)
      setUserAnswer("");
      setSubmittedAnswer("");
      setCurrentCorrect(false);
    } else {
      // in case you are already on the last question "next question" is actually the end of the round
      setRoundInProgress(false)
    }
  }

  // checks whether the answer is correct,  adds stars to the users balance if needed, and sets the currentCorrect property appropriately
  function checkAnswer (e) {
    e.preventDefault()
    if (+userAnswer === +selectedQuestions[currentIndex].answer) {
      setCurrentCorrect(true);
      addToBalance(1)
      // ideally when the user's bank acount updates the star and number on the screen bounce or ping or something to draw attention
    }else{
      setCurrentCorrect(false);
    }
    setSubmittedAnswer(userAnswer);
  }

  // adds a specified number of stars (quantity) to both the active balance and the lifetime total
  // also calls the getUser prop function so that the currentUser object in the app view gets promptly updated and passed down to everwhere else
  async function addToBalance(quantity) {
    try {
      await fetch (`/api/users/${currentUser.userName}/increaseBalance/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"quantity" : quantity})
      });
      await fetch (`/api/users/${currentUser.userName}/increaseLifetimeTotal/`, {
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


  function handleInputChange (e) {
    setUserAnswer(e.target.value);
    // console.log(userAnswer)
  }

  
  
  // maybe later:
  // when the question is answered the correct answer (or after 3 incorrect) question should show on the screen for 2 seconds, then "next question" button appears.
  // when you answer the 10th question the round is over, at this point the next question button should change to "See what you learned" or something and should take you to a round summary page,  from there the button will change to "next round"
  
  
  return (
    <div>
      <Bank currentUser = {currentUser} />
      <br />
      {!roundInProgress ? 
      // if roundInProgress is false all you will see is the start button. 
      // Although if there is no user logged in the button is disabled and the text prompts you to log in first
        <div>
          <br /><br /><br /><br /><br />
          <button onClick = {resetRound} className="btn btn-outline-dark" disabled = {!currentUser}>{currentUser ? "Start" : "re-log required"}</button> 
          <br /><br /><br /><br /><br />
        </div> : 
        // if roundInProgress is true you see the question view:
        <div>
          <div>Question {currentIndex+1}:</div>
          {!currentCorrect && // <= the question doesn't need to show anymore once they enter the correct answer
            <div>
              <div className = "fs-2 text">{selectedQuestions[currentIndex]?.question} =</div>
              <form action="submit" onSubmit={checkAnswer}>
                {/* input bound to userAnswer */}
                <input type="text" value = {userAnswer} onChange = {handleInputChange} placeholder="Answer"/>
                {/* if the answer field is empty the button is disabled */}
                <button className="btn btn-outline-dark" disabled = {!userAnswer}>Check it!</button>
              </form>
            </div>
          }
          {/* once an answer is submitted show a message based on whether the answer was correct or not */}
          <div className = {currentCorrect ? "fs-3 text" : "fs-6 text"}> 
            {submittedAnswer && (currentCorrect ? `Good work! ${selectedQuestions[currentIndex]?.question} does equal ${submittedAnswer}!` : (`Sorry :( ${submittedAnswer} isn't quite right. Want to try again?`))}
          </div>
          <br />
          {/* give them some space to work out the problem */}
          <p>Here's some scratch paper:</p>
          <textarea className="col-sm-4" rows="6" max-rows="10" 
            placeholder="Show your work or keep track of your thoughts here. Break down the numbers into parts you know how to work with."
          /> <br /><br />
          {/* moving to the next question is manual not automatic to give time to remember the answer
          best  would be to disable the next question button for 2 seconds after submitting an answer to keep kids from rushing through. */}
          <button onClick={nextQuestion} className="btn btn-outline-dark" >{(currentIndex + 1 === selectedQuestions.length) ? "Next Round" : "Next Question"}</button>
        </div>        
      }
      <br /><br />
      <Link to = "/store">Joke Store</Link>
      <br /><br />
      <Link to = "/">{currentUser ? `I'm not ${currentUser.userName}!` : "Login"}</Link>
    </div>
  )
}

export default Quiz




