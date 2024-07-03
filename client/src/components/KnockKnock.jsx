import { useState, useEffect } from "react";

function KnockKnock({ joke, setOfferNewJoke }) {
  const [showSetUp, setShowSetUp] = useState(false);
  const [showPunchLine, setShowPunchLine] = useState(false);

  function handleClick(e) {
    if (e.target.id === "WhoThere?") {
      setShowSetUp(true);
    } else {
      setShowPunchLine(true);
      setTimeout(() => {
        setOfferNewJoke(true);
      }, 2000);
    }
    e.currentTarget.disabled = true;
  }

  return (
    <div>
      <div className="fs-5 text">Knock Knock!</div>
      <br />
      <button
        id="WhoThere?"
        onClick={handleClick}
        className={showSetUp ? "btn btn-light" : "btn btn-outline-dark"}
      >
        Who's there?
      </button>
      <br />
      <br />
      {showSetUp && (
        <div>
          <div className="fs-5 text">{showSetUp && joke.setUp}</div>
          <br />
          <button
            onClick={handleClick}
            className={showPunchLine ? "btn btn-light" : "btn btn-outline-dark"}
          >
            {joke.setUp} who?
          </button>
          <br />
          <br />
        </div>
      )}
      <div className="fs-5 text">{showPunchLine && joke.punchLine}</div>
      <br />
    </div>
  );
}

export default KnockKnock;
