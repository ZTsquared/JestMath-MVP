import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [visible, setVisible] = useState(false);
  const [householdName, setHouseholdName] = useState("");
  const [subUsers, setSubUsers] = useState([]);
  const [newSubUser, setNewSubUser] = useState({
    userName: "",
    birthYear: "",
  });
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => console.log(emailIsValid), [email]);
  useEffect(() => console.log(subUsers), [subUsers]);
  useEffect(
    () => setErrMsg(""),
    [email, password, password2, householdName, subUsers, newSubUser]
  );

  function addSubUser(e) {
    const currentYear = new Date().getFullYear();
    const birthYear = Number(newSubUser.birthYear);
    if (
      !newSubUser.userName ||
      subUsers.filter((u) => u.userName === newSubUser.userName).length
    ) {
      setErrMsg("Please provide a unique username for each child");
    } else if (
      !birthYear ||
      birthYear > currentYear ||
      birthYear < currentYear - 20
    ) {
      setErrMsg(
        "Please provide a year of birth within the last 20 years.  This information is used only to guide the quiz level."
      );
    } else {
      setSubUsers((array) => [...array, newSubUser]);
      setNewSubUser({
        userName: "",
        birthYear: "",
      });
    }
  }

  function removeSubUser(name) {
    setSubUsers((state) => state.filter(({ userName }) => userName !== name));
  }

  async function registerHousehold() {
    const lowerCaseEmail = email.toLowerCase();
    const newHousehold = {
      email: lowerCaseEmail,
      password,
      householdName,
      subUsers,
    };
    console.log(newHousehold);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHousehold),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    //   login();

    //TODO:encrypt password and post to auth/register route, including newHousehold object in the body
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !emailIsValid) {
      setErrMsg("please provide a valid email address");
    } else if (!householdName) {
      setErrMsg("please provide a name for the household");
    } else if (!subUsers.length) {
      setErrMsg("please create at least one child profile");
    } else if (password.length < 5) {
      setErrMsg("password must be at least 5 characters");
    } else if (password !== password2) {
      setErrMsg("passwords do not match");
    } else {
      registerHousehold();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h6>Household account information:</h6>
        <label htmlFor="email">
          Email:
          <br />
          <input
            type="email"
            id="email"
            placeholder="you@somewhere.com"
            value={email}
            onChange={(e) => (
              setEmail(e.target.value), setEmailIsValid(e.target.validity.valid)
            )}
          />
        </label>
        <br />
        {/* <div> */}
        <label htmlFor="password">
          Password:
          <br />
          <input
            type={visible ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={(e) => setVisible(!visible)}
          >
            👁️
          </button>
        </label>
        <br />
        <label htmlFor="password2">
          Re-enter Password:
          <br />
          <input
            type={visible ? "text" : "password"}
            id="password2"
            placeholder="Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>
        {/* </div> */}
        <br />
        <label htmlFor="householdName">
          Name your household:
          <br />
          <input
            type="text"
            id="householdName"
            placeholder="SomeFamily"
            value={householdName}
            onChange={(e) => setHouseholdName(e.target.value)}
          />
        </label>
        <div>
          <br />
          <h6>Player profiles:</h6>
          <h6>Create individual child profiles (minimum 1):</h6>
          {subUsers.map((u, i) => (
            <div key={"userName" + i}>
              Player {i + 1}:{" " + u.userName}
              <button
                type="button"
                name={u.userName}
                onClick={(e) => removeSubUser(e.target.name)}
              >
                ✖️
              </button>
            </div>
          ))}
          <label htmlFor="userName">
            Child's username:
            <input
              type="text"
              id="userName"
              placeholder="JimmyKiddoo"
              value={newSubUser.userName}
              onChange={(e) =>
                setNewSubUser((u) => ({ ...u, userName: e.target.value }))
              }
            />
          </label>
          <label htmlFor="birthYear">
            Year of birth:
            <input
              type="text"
              id="birthYear"
              placeholder="2018"
              value={newSubUser.birthYear}
              onChange={(e) =>
                setNewSubUser((u) => ({ ...u, birthYear: e.target.value }))
              }
            />
          </label>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={(e) => addSubUser(e)}
          >
            Add Child
          </button>
        </div>
        <br />
        {errMsg && <p className="text-danger">{errMsg}</p>}
        <button type="submit" className="btn btn-outline-dark">
          Submit Registration
        </button>
      </form>
    </div>
  );
}

export default Register;
