import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { Link } from "react-router-dom";

function Register({ login }) {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [householdName, setHouseholdName] = useState("");
  const [subUsers, setSubUsers] = useState([]);
  const [newSubUser, setNewSubUser] = useState({
    userName: "",
    birthYear: "",
  });
  const [errMsg, setErrMsg] = useState("");

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
      public: false,
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
      if (!response.ok) {
        const result = await response.json();
        // console.log("response not ok");
        // console.log(response);
        // console.log(result);
        if (
          result.msg.toLowerCase().includes("must be unique") &&
          (result.msg.toLowerCase().includes("email") ||
            result.msg.toLowerCase().includes("e-mail"))
        ) {
          setErrMsg(
            "This email address is registered to an existing account. Please log in or try again with a different email address."
          );
        } else {
          setErrMsg(result.msg);
        }
      } else {
        login({ email: email, password: password });
        alert("Registration successful, welcome to JestMath!");
      }
    } catch (error) {
      console.log("registration error");
      console.log(error);
    }

    //TODO:encrypt password and post to auth/register route, including newHousehold object in the body (i think this is done already but I need to double check)
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
    <div className="container text-center">
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <h6>Household Account Information:</h6>
        <p className="fs-6">
          This is a student project with basic data security. Please use a
          unique password and email address.
        </p>
        <label htmlFor="email" className="form-label">
          Email:
          <br />
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="you@somewhere.com"
            value={email}
            onChange={(e) => (
              setEmail(e.target.value), setEmailIsValid(e.target.validity.valid)
            )}
            required
          />
        </label>
        <br />
        <label htmlFor="password" className="form-label">
          Password:
          <br />
          <div className="input-group">
            <input
              type={visible1 ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="5"
              required
            />
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => setVisible1(!visible1)}
            >
              {visible1 ? "🙈" : "👁️"}
            </button>
          </div>
        </label>
        <br />
        <label htmlFor="password2" className="form-label">
          Re-enter Password:
          <br />
          <div className="input-group">
            <input
              type={visible2 ? "text" : "password"}
              id="password2"
              className="form-control"
              placeholder="Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              minLength="5"
              required
            />
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => setVisible2(!visible2)}
            >
              {visible2 ? "🙈" : "👁️"}
            </button>
          </div>
        </label>
        <br />
        <label htmlFor="householdName" className="form-label">
          Name your household:
          <br />
          <input
            type="text"
            id="householdName"
            className="form-control"
            placeholder="SomeFamily"
            value={householdName}
            onChange={(e) => setHouseholdName(e.target.value)}
            required
          />
        </label>
        <br />
        <div>
          <h6>Player Profiles:</h6>
          <p className="fs-6">Create child profiles (minimum 1):</p>
          {subUsers.map((user, index) => (
            <div
              key={index}
              className="d-flex align-items-center justify-content-center mb-2"
            >
              Player {index + 1}: {user.userName}
              <button
                type="button"
                className="btn btn-outline-dark ms-2"
                onClick={() => removeSubUser(user.userName)}
              >
                &#10060;
              </button>
            </div>
          ))}
          <div className="d-flex align-items-center">
            <label htmlFor="userName" className="form-label me-2">
              Child's username:
              <input
                type="text"
                id="userName"
                className="form-control"
                placeholder="JimmyKiddoo"
                value={newSubUser.userName}
                onChange={(e) =>
                  setNewSubUser({ ...newSubUser, userName: e.target.value })
                }
              />
            </label>
            <label htmlFor="birthYear" className="form-label me-2">
              Year of birth:
              <input
                type="text"
                id="birthYear"
                className="form-control"
                placeholder="2018"
                value={newSubUser.birthYear}
                onChange={(e) =>
                  setNewSubUser({ ...newSubUser, birthYear: e.target.value })
                }
              />
            </label>
            <button
              type="button"
              className="btn btn-outline-dark"
              style={{ marginLeft: "10px" }} // Adjust the margin as needed
              onClick={addSubUser}
            >
              Add Child
            </button>
          </div>
        </div>
        {errMsg && <p className="text-danger mt-3">{errMsg}</p>}
        <button type="submit" className="btn btn-outline-dark mt-3">
          Submit Registration
        </button>
      </form>
    </div>
  );
}

export default Register;
