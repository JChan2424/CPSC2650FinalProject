import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = (username, password) => {

    fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: username,
        password: password,
      },
    }).then((res) => {
      if (res.status === 200) {

        localStorage.setItem("credentials", JSON.stringify({
          username: username,
          password: password,
        }));

        // if url has a redirect query parameter, redirect to that url
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get("redirect");
        if (redirect) {
          window.location.href = redirect;
        } else {
          window.location.href = "/";
        }

      } else if (res.status === 401) {

        alert("Invalid credentials");
      } else {

        console.log(res);
        alert("Something went wrong");
      }
    });

    return (
      <div>
        <h1>Login</h1>

        <form action="POST">
          <input
            type="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();

              authenticate(email, password);
            }}
          />
        </form>
        <Link to={"/register"} className="btn btn-primary">No account? sign up here</Link>
      </div>
    );
  }
}

export default Login;
