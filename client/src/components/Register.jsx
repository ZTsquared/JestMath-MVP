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

  function registerHousehold() {
    const newHousehold = {
      email: email.toLowerCase(),
      password,
      householdName,
      subUsers,
    };
    console.log(newHousehold);
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
    } else if (password.length < 8) {
      setErrMsg("password must be at least 8 characters");
    } else if (password !== password2) {
      setErrMsg("passwords do not match");
    } else {
      registerHousehold();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
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
        <div>
          <label htmlFor="password1">
            Password:
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
            <input
              type={visible ? "text" : "password"}
              id="password2"
              placeholder="Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </label>
        </div>
        <br />
        <label htmlFor="householdName">
          Name your household:
          <input
            type="text"
            id="householdName"
            placeholder="SomeFamily"
            value={householdName}
            onChange={(e) => setHouseholdName(e.target.value)}
          />
        </label>
        <div>
          <h6>Create individual child profiles (minimum 1):</h6>
          {subUsers.map((u, i) => (
            <div key={"userName" + i}>
              {u.userName}
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
          <label htmlFor="userName">
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
