import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

//this is a portal for submitting or vetting questions and jokes, or setting other settings.
// future plans:
// I need to add some light security to keep kids from messing with the portal maybe to open the parent portal you need to answer some question kids won't know (history?)
// this is where a parent should log into the household account.  If an account is not logged in then then a link to the parent portal should be the only thing you see when you go to the welcome screen.
// the best thing would be to be able to see player history -  details about what they got right and wrong and what wrong answers they tried before getting the right one. maybe even how long they spent on each try.
// but his would require storing a lot of data I am not currently storing.

function ParentPortal() {
  const { onLogout } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");
  const [questionUploadMsg, setQuestionUploadMsg] = useState("");

  async function postQuestion() {
    try {
      const resultJSON = await fetch(`/api/questions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: newQuestion }),
      });
      const resultObject = await resultJSON.json();
      setQuestionUploadMsg(resultObject.msg);
      console.log("result JSON");
      console.log(resultJSON);
      // console.log("result object")
      // console.log(resultObject)
      if (resultJSON.ok) {
        setNewQuestion("");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleInputChange = (e) => {
    setQuestionUploadMsg("");
    setNewQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postQuestion();
  };

  return (
    <div>
      <h3>UNDER DEVELOPMENT</h3>
      <br />
      <div>Add Question</div>
      {/* <form onSubmit={handleSubmit}>
        <input value={newQuestion} onChange={handleInputChange} type="text" />
        <button className="btn btn-outline-dark">Upload Question</button>
        {questionUploadMsg ? (
          <div>{questionUploadMsg}</div>
        ) : (
          <div>
            <br />
          </div>
        )}
        <div>{questionUploadMsg?.msg}</div>
      </form> */}
      <br />
      <Link to="/parentPortal/CurateQuestions">Curate Questions</Link>
      <br />
      <br />
      <br />
      <div>Add Jokes</div>
      {/* still need a drop down to select joke type (Knock Knock or Riddle),
        input lines for setUp and punchLine
        conditional formating to wrap knock knock joke in extra standard 
        lines so the joke makes sense */}
      <div>Curate Jokes</div>
      <br />

      <br />
      <Link to="/">Exit Parent Portal</Link>
      <br />
      <br />
      <button className="btn btn-outline-dark" onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
}

export default ParentPortal;
