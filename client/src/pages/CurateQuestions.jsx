import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function CurateQuestions() {
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    getAllQuestions();
  }, []);

  async function getAllQuestions() {
    console.log("test");
    try {
      const results = await fetch(`/api/questions/`);
      if (!results.ok) {
        console.log("fetch error");
      } else {
        const questions = await results.json();
        console.log(questions);
        setAllQuestions(questions);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h3>UNDER DEVELOPMENT</h3>
      <h4>All Questions:</h4>
      <Link to="/parentPortal">Return toParent Portal</Link>
      <br />
      <br />
      {allQuestions.map((item, index) => (
        <p key={index}>{item.question + " = " + item.answer}</p>
      ))}
    </div>
  );
}

export default CurateQuestions;
