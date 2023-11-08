import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Bank from '../components/Bank';
// import Question from '../components/Question';


function Quiz() {
  
  // const [allQuestions, setAllQuestions] = useState ([]);
  const roundLength = 10
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [roundInProgress, setRoundInProgress] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [submittedAnswer, setSubmittedAnswer] = useState("")
  const [currentCorrect, setCurrentCorrect] = useState(false)
  
  useEffect(() => {console.log(submittedAnswer)},[submittedAnswer])
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
      console.log(questions)
      setSelectedQuestions(questions)
    } catch (err) {
      console.log(err)
    }
  }

  function nextQuestion () {
    setUserAnswer("");
    if (currentIndex + 1 < selectedQuestions.length)
      setCurrentIndex(currentIndex + 1)
      console.log(selectedQuestions[currentIndex].question)
      setUserAnswer("");
      setSubmittedAnswer("");
      setCurrentCorrect(false);
  }

  function checkAnswer (e) {
    e.preventDefault()
    console.log("checking answer")
    // if (userAnswer === "") then it shouldn't allow submission - button grey?. but make sure this still works with zero...
    if (+userAnswer === +selectedQuestions[currentIndex].answer) {
      console.log("setting true")
      setCurrentCorrect(true);
      //need to add code to add star to user's bank. but first I have to build the bank, which means i need to build users... (I need a users table with current balance and lifetime balance) as columns in the user table...
    }else{
      console.log("setting false")
      setCurrentCorrect(false);
    }
    setSubmittedAnswer(userAnswer);
  }

  
  function QuestionView () {
    return (
      <div>
        <div>Question {currentIndex+1}:</div>
        <div>{selectedQuestions[currentIndex]?.question} =</div>
        <form action="submit" onSubmit={checkAnswer}>
          {/* the input below needs to clear once an answer is submitted, needs update */}
          <input type="text" value = {userAnswer} onChange = {handleInputChange} placeholder="Answer"/><br />
          {/* when we get to the end of the round this button should change to a round over button, 
          that takes you to the recap screen (good job, you earned ### stars this round)*/}
          {userAnswer && <button>Check it!</button>}
          <div> 
            {submittedAnswer && (currentCorrect ? `Good work! ${selectedQuestions[currentIndex]?.question} does equal ${submittedAnswer}!` : `sorry :( ${submittedAnswer} isn't quite right. Want to try again?`)}
              {/* {(currentCorrect === "yes") ? `Good work! ${selectedQuestions[currentIndex]?.question} does equal ${userAnswer}!` : `sorry, ${userAnswer} isn't quite right. Want to try again?`} */}
            {/* </div>: <br />;} */}
          </div>
        </form>
          <button onClick={nextQuestion}>Next Question</button>
      </div>
    )
  }

  function handleInputChange (e) {
    setUserAnswer(e.target.value);
    console.log(userAnswer)
  }

  
  
  // when the question is answered the correct answer (or after 3 incorrect) question should show on the screen for 2 seconds, then "next question" button appears.
  //currentIndex should ++ each time you move to the next question and currentQuestion should be set accordingly (for now, everytime you click next question)
  //when counter reaches 10 the round is over  - at this point current question should be reset to {}. 
  //this way we can use !currentQuestion to know we are between rounds and need to display the "start" button instead of showing questions.
  
  
  return (
    <div>
      <Bank />
      <br /><br /><br />
      {/* start with a "start a new round" button,  (later this could give you several types of rounds too choose from) 
      once this button is clicked you are fed 1 question at a time*/}
      {!roundInProgress ? <button onClick = {resetRound}>Start!</button> : <QuestionView/>}
      <br /><br />
      <Link to = "/store">Joke Store</Link>
      <br /><br /><br /><br /><br />
      <Link to = "/">I'm not 'userName'!</Link>
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

