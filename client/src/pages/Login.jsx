import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Register from "../components/Register";

function Login() {
  const { isLoggedIn, onLogin, onLogout } = useAuth();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  // useEffect(() => console.log("is logged in: ", isLoggedIn), [isLoggedIn]);

  useEffect(() => setErrMsg(""), [email, password]);

  //useEffect function to check if token is valid on page refresh FIXME: once i have written the backend route for this

  async function login(credentials) {
    try {
      const lowerCaseEmail = credentials.email.toLowerCase();
      const loginData = {
        email: lowerCaseEmail,
        password: credentials.password,
      };
      const results = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!results.ok) {
        const data = await results.json();
        setErrMsg(data.message);
      } else {
        const data = await results.json();
        //store it locally
        localStorage.setItem("token", data.token);
        onLogin();
        navigate("/");
      }
    } catch (error) {
      console.log("in login catch block");
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    login({ email: email, password: password });
  }

  function toggleRegister() {
    setRegister((reg) => !reg);
  }

  return (
    <div>
      <h1>Welcome to JestMath</h1>
      <br />
      {isLoggedIn ? (
        <button className="btn btn-outline-dark" onClick={onLogout}>
          Log Out
        </button>
      ) : (
        <>
          {" "}
          {register ? (
            <Register login={login} />
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
                {errMsg && <p className="text-danger">{errMsg}</p>}
                <br />
                <button
                  className="btn btn-outline-dark"
                  disabled={!email || !password}
                >
                  Sign In
                </button>
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
          <br /> <br />
          <h6>Or explore the game in the public demo account</h6>
          <button
            className="btn btn-outline-dark"
            onClick={(e) => {
              //FIXME: change the seeders and this to use not my real data
              login({ email: "zia@codeOp.tech", password: "whatever" });
            }}
          >
            Try it
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
