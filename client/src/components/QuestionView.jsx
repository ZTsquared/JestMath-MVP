import React from 'react'

//at the moment i don't use this component
function QuestionView() {

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

  
  return (
    <div> Unused question view component
    </div>
  )
}

export default QuestionView