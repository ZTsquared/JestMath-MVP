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
  const [errMsg2, setErrMsg2] = useState("");
  const navigate = useNavigate();

  // useEffect(() => console.log("is logged in: ", isLoggedIn), [isLoggedIn]);

  useEffect(() => setErrMsg(""), [email, password, errMsg2, register]);

  useEffect(() => setErrMsg2(""), [email, password, errMsg, register]);

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

  async function registerDemoHousehold(e) {
    const timestamp = Date.now();
    const demoEmail = `${timestamp}@jestmath.com`;
    const demoPassword = "testtest";
    const newHousehold = {
      email: demoEmail,
      password: demoPassword,
      householdName: "TempHousehold",
      public: true,
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
            "This email address is registerd to an existing account. Please log in or try again with a different email address."
          );
        } else {
          setErrMsg(result.msg);
        }
      } else {
        login({ email: demoEmail, password: demoPassword });
        // alert("Registration successful, welcome to JestMath!");
      }
    } catch (error) {
      setErrMsg2(
        "We can't make you a temporary account at the moment, sorry!  Please try again later."
      );
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
    <div className="container">
      <h1>Welcome to JestMath</h1>
      <br />
      {isLoggedIn ? (
        <button className="btn btn-outline-dark" onClick={onLogout}>
          Log Out
        </button>
      ) : (
        <>
          {register ? (
            <Register login={login} />
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
            {register
              ? "Already Registered?"
              : "No account? Create a new household account:"}
          </h6>
          <button className="btn btn-outline-dark" onClick={toggleRegister}>
            {register ? "Login" : "Register"}
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
