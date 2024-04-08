import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Register from "../components/Register";

function Login() {
  const [register, setRegister] = useState(false);

  useEffect(() => console.log(register), [register]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit login");
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
              Email
              <input type="text" name="email" id="email" />
            </label>
            <label htmlFor="password">
              Password
              <input type="text" name="password" id="password" />
            </label>
            <br />
            <button className="btn btn-outline-dark">Sign In</button>
          </form>
        </div>
      )}
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
