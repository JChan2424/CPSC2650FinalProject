import React, { useEffect } from "react";

function Protected() {
  
  useEffect(() => {
    // check if credentials are in local storage

    if (localStorage.getItem("token") === null) {
      // if not, redirect to login page
      window.location.href = "/login?redirect=" + window.location.pathname;
    }

    // if so, send credentials to server to check if they are valid
    fetch("/api/announcement", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    }).then((res) => {
      // if not, redirect to login page
      if (res.status === 401) {
        window.location.href = "/login";
      }

      if (res.status === 200) {
        // if so, do nothing
        
      }

      // if so, do nothing
    });
  }, []);

  return (
    <div>
      <h1>Secret</h1>
      {topics.length == 0 || topic == null ? <h1>There are no announcements</h1> : topics.map((topic) => {<><h1>{topic.title}</h1><p>{topic.content}</p></>})}
    </div>
  );
}

export default Protected;
