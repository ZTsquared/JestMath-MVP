import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Bank from "../components/Bank";
import useAuth from "../hooks/useAuth";

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
            className="btn btn-outline-primary"
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
              <div className="card p-4" style={{ backgroundColor: "#f8f9fa" }}>
                <h3 className="text-primary">
                  {selectedQuestions[currentIndex]?.question} =
                </h3>
                <div className="d-flex justify-content-center">
                  <form className="input-group w-50" onSubmit={checkAnswer}>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Answer"
                    />
                    <button
                      className="btn btn-outline-secondary"
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
            <button
              onClick={nextQuestion}
              className="btn btn-outline-dark mt-3"
              disabled={!currentCorrect && tries < 3}
            >
              {currentIndex + 1 === selectedQuestions.length
                ? "Next Round"
                : "Next Question"}
            </button>
          </div>
        </div>
      )}
      <br />
      <div className="text-center">
        <Link to="/store" className="btn btn-link">
          Joke Store
        </Link>
        <br />
        <Link to="/library" className="btn btn-link">
          {currentUser?.userName}'s Jokes
        </Link>
        <br />
        <Link to="/" className="btn btn-link">
          {currentUser ? `I'm not ${currentUser.userName}!` : "Login"}
        </Link>
      </div>
    </div>
  );
}

export default Quiz;
