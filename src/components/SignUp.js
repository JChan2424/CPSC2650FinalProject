import React, { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }

    let hasUpper = /[A-Z]/;
    let hasLower = /[a-z]/;
    let hasNumber = /[0-9]/;

    if (!hasUpper.test(password)) {
      return false;
    }

    if (!hasLower.test(password)) {
      return false;
    }

    if (!hasNumber.test(password)) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          onChange={(e) => {
            if (validatePassword(e.target.value)) {
              setPassword(e.target.value);
            } else {
              document.getElementById("pwdErr").style.display = "block";
            }
          }}
        />
        <span
          id="pwdErr"
          style={{
            color: "red",
            display: "none",
          }}
        >
          Password must be at least 8 characters and contain at least one
          uppercase letter, one lowercase letter, and one number
        </span>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();

            const credentials = {
              email: email,
              password: password,
            };
          }}
        />
      </form>
    </div>
  );
}

export default SignUp;
