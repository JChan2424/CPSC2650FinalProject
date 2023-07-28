import React, { useEffect } from "react";

function Protected() {
  useEffect(() => {
    // check if credentials are in local storage

    if (localStorage.getItem("credentials") === null) {
      // if not, redirect to login page
      window.location.href = "/login?redirect=" + window.location.pathname;
    }

    // if so, send credentials to server to check if they are valid
    fetch("/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(localStorage.getItem("credentials")),
    }).then((res) => {
      // if not, redirect to login page
      if (res.status === 401) {
        window.location.href = "/login";
      }

      // if so, do nothing
    });
  }, []);

  return (
    <div>
      <h1>Secret</h1>
    </div>
  );
}

export default Protected;
