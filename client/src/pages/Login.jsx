import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Register from "../components/Register";

function Login() {
  const { isLoggedIn, onLogin, onLogout } = useAuth();
  const [registerVis, setRegisterVis] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errMsg2, setErrMsg2] = useState("");
  const navigate = useNavigate();

  // useEffect(() => console.log("is logged in: ", isLoggedIn), [isLoggedIn]);
  useEffect(() => console.log(errMsg, errMsg2), [errMsg, errMsg2]);

  useEffect(() => setErrMsg(""), [email, password, errMsg2, registerVis]);

  useEffect(() => setErrMsg2(""), [email, password, errMsg, registerVis]);

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

  async function registerHousehold(newHousehold) {
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
        console.log(response);
        console.log(result);
        if (
          result.msg?.toLowerCase().includes("must be unique") &&
          (result.msg?.toLowerCase().includes("email") ||
            result.msg?.toLowerCase().includes("e-mail"))
        ) {
          console.log("some error in reg");
          setErrMsg(
            "This email address is registered to an existing account. Please log in or try again with a different email address."
          );
        } else {
          setErrMsg(result.msg);
        }
      } else {
        login({ email: newHousehold.email, password: newHousehold.password });
        if (!newHousehold.public) {
          alert("Registration successful, welcome to JestMath!");
        }
      }
    } catch (error) {
      if (newHousehold.public) {
        setErrMsg2(
          "We can't make you a temporary account at the moment, sorry!  Please try again later."
        );
      } else {
        setErrMsg(
          "We can't create your account at the moment, sorry!  Please try again later."
        );
      }
      console.log("registration error");
      console.log(error);
    }

    //TODO:encrypt password and post to auth/register route, including newHousehold object in the body (i think this is done already but I need to double check)
  }

  function registerDemoHousehold() {
    const timestamp = Date.now();
    const demoEmail = `${timestamp}@jestmath.com`;
    const demoPassword = "testtest";
    const newHousehold = {
      email: demoEmail,
      password: demoPassword,
      householdName: "TempHousehold",
      public: 1,
      subUsers: [
        {
          userName: "DemoUser1",
          birthYear: "2018",
        },
        {
          userName: "DemoUser2",
          birthYear: "2018",
        },
      ],
    };
    registerHousehold(newHousehold);
  }

  function handleSubmit(e) {
    e.preventDefault();
    login({ email: email, password: password });
  }

  function toggleRegister() {
    setRegisterVis((reg) => !reg);
  }

  return (
    <div className="container">
      <h1>Welcome to</h1>
      <img
        src={`./images/JestMath-Logo.png`} // use this line instead of the one below when deploying to heroku
        // src={`./public/images/JestMath-Logo.png`} // might need to use this line instead of the one above when working on localhost
        width="400"
        alt="JestMath Logo"
      />
      <br />
      <br />
      {isLoggedIn ? (
        <button className="btn btn-outline-dark" onClick={onLogout}>
          Log Out
        </button>
      ) : (
        <>
          {registerVis ? (
            <Register login={login} registerHousehold={registerHousehold} />
          ) : (
            <div>
              <h6>Login to household account:</h6>
              <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@somewhere.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ maxWidth: "400px", margin: "auto" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <div
                    className="input-group"
                    style={{ maxWidth: "400px", margin: "auto" }}
                  >
                    <input
                      type={visible ? "text" : "password"}
                      className="form-control"
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
                      {visible ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                {errMsg && <p className="text-danger">{errMsg}</p>}
                <button
                  type="submit"
                  className="btn btn-outline-dark"
                  disabled={!email || !password}
                >
                  Sign In
                </button>
              </form>
            </div>
          )}
          <br />
          <h6>
            {registerVis
              ? "Already Registered?"
              : "No account? Create a new household account:"}
          </h6>
          <button className="btn btn-outline-dark" onClick={toggleRegister}>
            {registerVis ? "Login" : "Register"}
          </button>
          <br />
          <br />
          {errMsg2 && <p className="text-danger">{errMsg2}</p>}
          <h6>Or explore without an account</h6>
          <button
            className="btn btn-outline-dark"
            onClick={registerDemoHousehold}
          >
            Try it
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
