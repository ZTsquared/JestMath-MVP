import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Bank from '../components/Bank';
// import QuestionView from '../components/QuestionView';
// import Question from '../components/Question';


function Quiz({currentUser, getUser}) {
  
  // const [allQuestions, setAllQuestions] = useState ([]);
  const roundLength = 10
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [roundInProgress, setRoundInProgress] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [submittedAnswer, setSubmittedAnswer] = useState("")
  const [currentCorrect, setCurrentCorrect] = useState(false)
  
  // useEffect(() => {console.log(submittedAnswer)},[submittedAnswer])
  useEffect(() => {setUserAnswer("")},[submittedAnswer])
  
  //reset a bunch of state fresh for a new round of play
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

  function nextQuestion () {
    setUserAnswer("");
    if (currentIndex + 1 < selectedQuestions.length) {
      setCurrentIndex(currentIndex + 1)
      // console.log(selectedQuestions[currentIndex].question)
      setUserAnswer("");
      setSubmittedAnswer("");
      setCurrentCorrect(false);
    } else {
      setRoundInProgress(false)
    }
  }

  function checkAnswer (e) {
    e.preventDefault()
    // console.log("checking answer")
    // if (userAnswer === "") then it shouldn't allow submission - button grey?. but make sure this still works with zero...
    if (+userAnswer === +selectedQuestions[currentIndex].answer) {
      // console.log("setting true")
      setCurrentCorrect(true);
      addToBalance(1)
      //need to add code to add star to user's bank. but first I have to build the bank, which means i need to build users... 
      //(I need a users table with current balance and lifetime balance) as columns in the user table...
      //ideally when the user's bank acount updates the star and number on the screen bounce or ping or something
    }else{
      // console.log("setting false")
      setCurrentCorrect(false);
    }
    setSubmittedAnswer(userAnswer);
  }

  async function addToBalance(quantity) {
    try {
      await fetch (`/api/users/${currentUser.userName}/increaseBalance/`, {
        method: "PUT",
        // this header specifies what type of content is being sent in the body. 
        //it could be a million things.  check mozilla docs "MIME types" for all the options
        headers: {
          "Content-Type": "application/json"
        },
        // here we send whatever content we want to send.  since we want to send out newStudent object
        //as a json string/jason object  we have to convert it as shown below
        body: JSON.stringify({"quantity" : quantity})
      });
      await fetch (`/api/users/${currentUser.userName}/increaseLifetimeTotal/`, {
        method: "PUT",
        // this header specifies what type of content is being sent in the body. 
        //it could be a million things.  check mozilla docs "MIME types" for all the options
        headers: {
          "Content-Type": "application/json"
        },
        // here we send whatever content we want to send.  since we want to send out newStudent object
        //as a json string/jason object  we have to convert it as shown below
        body: JSON.stringify({"quantity" : quantity})
      });
      getUser()
    } catch (err) {
      console.log(err)
    }
  }

  // , {
  //   method: "POST",
  //   // this header specifies what type of content is being sent in the body. 
  //   //it could be a million things.  check mozilla docs "MIME types" for all the options
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  
  
  
  // function QuestionView () {
  //   return (
  //     <div>
  //       <div>Question {currentIndex+1}:</div>
  //       {!currentCorrect && 
  //         <div>
  //           <h2>{selectedQuestions[currentIndex]?.question} =</h2>
  //           <form action="submit" onSubmit={checkAnswer}>
  //             {/* the input below needs to clear once an answer is submitted, needs update */}
  //             <input type="text" value = {userAnswer} onChange = {handleInputChange} placeholder="Answer"/>
  //             {/* when we get to the end of the round this button should change to a round over button, 
  //             that takes you to the recap screen (good job, you earned ### stars this round)*/}
  //             <button className="btn btn-outline-dark" disabled = {!userAnswer}>Check it!</button>
  //           </form>
  //         </div>
  //       }
  //         <div className = {currentCorrect ? "fs-3 text" : "fs-6 text"}> 
  //           {submittedAnswer && (currentCorrect ? `Good work! ${selectedQuestions[currentIndex]?.question} does equal ${submittedAnswer}!` : (`Sorry :( ${submittedAnswer} isn't quite right. Want to try again?`))}
  //         </div>
  //       <br /><br />
  //         <button onClick={nextQuestion} className="btn btn-outline-dark" >{(currentIndex + 1 === selectedQuestions.length) ? "Next Round" : "Next Question"}</button>
  //     </div>
  //   )
  // }

  function handleInputChange (e) {
    setUserAnswer(e.target.value);
    // console.log(userAnswer)
  }

  
  
  // add feature:
  // when the question is answered the correct answer (or after 3 incorrect) question should show on the screen for 2 seconds, then "next question" button appears.
  //currentIndex should ++ each time you move to the next question and currentQuestion should be set accordingly (for now, everytime you click next question)
  //when counter reaches 10 the round is over, at this point the next question button should change to "See what you learned" or something and should take you to a round summary page,  from there the button will change to "next round"
  
  
  return (
    <div>
      <Bank currentUser = {currentUser} />
      <br />
      {/* start with a "start a new round" button,  (later this could give you several types of rounds too choose from) 
      once this button is clicked you are fed 1 question at a time*/}
      {!roundInProgress ? 
        <div>
          <br /><br /><br /><br /><br />
          <button onClick = {resetRound} className="btn btn-outline-dark">Start!</button> 
          <br /><br /><br /><br /><br />
        </div> : 
        <div>
          <div>Question {currentIndex+1}:</div>
          {!currentCorrect && 
            <div>
              <h2>{selectedQuestions[currentIndex]?.question} =</h2>
              <form action="submit" onSubmit={checkAnswer}>
                {/* the input below needs to clear once an answer is submitted, needs update */}
                <input type="text" value = {userAnswer} onChange = {handleInputChange} placeholder="Answer"/>
                {/* when we get to the end of the round this button should change to a round over button, 
                that takes you to the recap screen (good job, you earned ### stars this round)*/}
                <button className="btn btn-outline-dark" disabled = {!userAnswer}>Check it!</button>
              </form>
            </div>
          }
          <div className = {currentCorrect ? "fs-3 text" : "fs-6 text"}> 
            {submittedAnswer && (currentCorrect ? `Good work! ${selectedQuestions[currentIndex]?.question} does equal ${submittedAnswer}!` : (`Sorry :( ${submittedAnswer} isn't quite right. Want to try again?`))}
          </div>
          <br />
          <p>Here's some scratch paper:</p>
          <textarea className="col-sm-4" rows="6" max-rows="10" 
            placeholder="Show your work or keep track of your thoughts here. Break down the numbers into parts you know how to work with."
          /> <br /><br />
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





  //LETS TALK ABOUT WHY MY SELECTQUESTIONS STILL USES OLD VALUES FOR.  AND IF I NEED USE EFFECT, WHY AND HOW?
  // async function getQuestions () {
  //   try {
  //     const results = await fetch ("api/questions");
  //     console.log(results)
  //     const questions = await results.json();
  //     console.log(questions)
  //     setAllQuestions(questions)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  
  // async function selectQuestions () {
  //     await getQuestions();
  //     const questionCount = allQuestions.length;
  //     if (questionCount/3 < roundLength) {
  //       throw new Error ("Not enough questions in database.  Add questions before proceeding")
  //     }
  //     // const indices = []
  //     // while (indices.length < roundLength) {
  //     //   const index = Math.floor(Math.random() * questionCount)
  //     //   if (!indices.includes(index)){indices.push(index)}
  //     //   console.log(index, indices)
  //     // }
  // }
  
  // const handleClick = () => {
    
  // }

