import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setAppRole, , setErrMessage] = useOutletContext();
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (res.status === 401 || res.status === 402) {
        setErrMessage(responseData.message);
        navigate("/error", { replace: true });
        return;
      }

      if (res.status === 200) {
        localStorage.setItem("token", responseData.token);
        setAppRole(responseData.role);
        navigate("/view-announcements", {
          state: { posts: responseData.posts },
          replace: true,
        });
        return;
      }

      setErrMessage("unknown error");
      navigate("/error", { replace: true });
    } catch (err) {
      setErrMessage("unknown error");
      navigate("/error", { replace: true });
    }
  };

  return (
    <div className="card d-inline-block ms-2">
      <h5 className="card-title p-2" id="login-title">
        Login
      </h5>
      <form onSubmit={(e) => submitLogin(e)}>
        <label className="d-block p-2" for="username">
          Enter username:
          <br />
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Enter username"
            aria-required="true"
            tabIndex="0"
            required
          ></input>
        </label>

        <label className="d-block p-2" for="password">
          Enter password:
          <br />
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Enter password"
            aria-required="true"
            tabIndex="0"
            required
          ></input>
        </label>
        <button
          className="btn btn-primary p-2 m-2"
          aria-label="Submit Login"
          tabIndex="0"
        >
          Submit
        </button>
      </form>
      <Link
        to={"/register"}
        className="btn btn-primary m-2"
        aria-label="No account? Sign up here."
        tabIndex="0"
      >
        No account? Sign up here.
      </Link>
    </div>
  );
};

export default Login;
