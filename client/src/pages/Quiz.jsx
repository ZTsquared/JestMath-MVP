import { useState, useEffect } from "react";
import Bank from "../components/Bank";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";

function Quiz() {
  const { currentUser, getUser } = useAuth();
  const roundLength = 10;
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roundInProgress, setRoundInProgress] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [currentCorrect, setCurrentCorrect] = useState(false);
  const [tries, setTries] = useState(0);

  const pointValue = 1;

  useEffect(() => {
    setUserAnswer("");
  }, [submittedAnswer]);

  function resetRound() {
    if (currentUser.lifetimeTotal === 0) {
      addToBalance(30);
      alert(
        "New to JestMath?  Welcome!  Here are 30 stars to get you started ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐"
      );
    }
    setUserAnswer("");
    setCurrentCorrect(false);
    setCurrentIndex(0);
    setRoundInProgress(true);
    setSubmittedAnswer("");
    selectQuestions();
    setTries(0);
  }

  async function selectQuestions() {
    try {
      const results = await fetch(`/api/questions/random/${roundLength}`);
      const questions = await results.json();
      setSelectedQuestions(questions);
    } catch (err) {
      console.log(err);
    }
  }

  function nextQuestion() {
    setUserAnswer("");
    setTries(0);
    if (currentIndex + 1 < selectedQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setSubmittedAnswer("");
      setCurrentCorrect(false);
    } else {
      setRoundInProgress(false);
    }
  }

  function checkAnswer(e) {
    e.preventDefault();
    if (+userAnswer === +selectedQuestions[currentIndex].answer) {
      setCurrentCorrect(true);
      addToBalance(pointValue);
    } else {
      setCurrentCorrect(false);
      setTries(tries + 1);
    }
    setSubmittedAnswer(userAnswer);
  }

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

  function handleInputChange(e) {
    setUserAnswer(e.target.value);
  }

  return (
    <div className="container">
      <Bank />
      <br />
      {!roundInProgress ? (
        <div className="text-center">
          <button
            onClick={resetRound}
            className="btn btn-outline-dark"
            disabled={!currentUser}
          >
            {currentUser ? "Start" : "Please log in to start"}
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 text-center">
            <h2>Question {currentIndex + 1}:</h2>
            {!currentCorrect && (
              <div
                className="card pt-4 pr-2 pb-4 pl-2"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <h3>{selectedQuestions[currentIndex]?.question} =</h3>
                <div className="d-flex justify-content-center">
                  <form
                    className="input-group w-75"
                    style={{ maxWidth: "350px" }}
                    onSubmit={checkAnswer}
                  >
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Answer"
                      style={{ minWidth: "80px" }}
                    />
                    <button
                      className="btn btn-outline-dark"
                      disabled={!userAnswer}
                    >
                      Check it!
                    </button>
                  </form>
                </div>
              </div>
            )}
            <div className="mt-3">
              {submittedAnswer && (
                <div
                  className={`alert ${
                    currentCorrect ? "alert-success" : "alert-danger"
                  }`}
                >
                  {currentCorrect
                    ? `Good work! ${selectedQuestions[currentIndex]?.question} does equal ${submittedAnswer}!`
                    : `Sorry :( ${submittedAnswer} isn't quite right. Want to try again?`}
                </div>
              )}
            </div>
            <textarea
              className="form-control mt-4"
              rows="4"
              placeholder="Show your work or keep track of your thoughts here."
            />
            {(currentCorrect || tries >= 3) && (
              <button
                onClick={nextQuestion}
                className="btn btn-outline-dark mt-3"
                disabled={!currentCorrect && tries < 3}
              >
                {currentIndex + 1 === selectedQuestions.length
                  ? "Next Round"
                  : "Next Question"}
              </button>
            )}
          </div>
        </div>
      )}
      <br />
      <Footer currentComp="Quiz" />
    </div>
  );
}

export default Quiz;
