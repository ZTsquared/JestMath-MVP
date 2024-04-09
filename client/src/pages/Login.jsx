import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Register from "../components/Register";

function Login() {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => console.log(register), [register]);

  async function login() {
    try {
      const lowerCaseEmail = email.toLowerCase();
      const loginData = {
        email: lowerCaseEmail,
        password,
      };
      console.log("submit login");
      console.log(loginData);
      const results = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await results.json();
      console.log(data);
      //store it locally
      localStorage.setItem("token", data.token);
      //   onLogin();
      //   navigate("/Actions");
    } catch {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    login();
  }

  function toggleRegister() {
    setRegister((reg) => !reg);
  }

  return (
    <div>
      {register ? (
        <Register />
      ) : (
        <div>
          <h6>Login to household account:</h6>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                placeholder="you@somewhere.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
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
            <button className="btn btn-outline-dark">Sign In</button>
          </form>
        </div>
      )}
      <br />
      <br />
      <br />
      <h6>
        {register
          ? "Already Registered?"
          : "No account? Create a new household account:"}
      </h6>
      <button className="btn btn-outline-dark" onClick={toggleRegister}>
        {register ? "Login" : "Register"}
      </button>
    </div>
  );
}

export default Login;
