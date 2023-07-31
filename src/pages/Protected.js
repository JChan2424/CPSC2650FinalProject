import React, { useEffect } from "react";

function Protected() {

  useEffect(() => {

    if (localStorage.getItem("token") === null) {

      // redirect to login page

    }

    fetch("/api/verify", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: {
        "username": localStorage.getItem("username"),
        "role": localStorage.getItem("role"),
      },
    }).then((res) => {

      if (res.status === 401) {

        // redirect to login page

      }

      if (res.status === 400) {

        // alert: invalid request, try again

      }

      if (res.status === 403) {

        // no token provided, redirect to login page

      }

      if (res.status === 200) {

        return true;

      }

    });
  }, []);


  return (
    <div>
      <h1>Secret</h1>
      {topics.length == 0 || topic == null ? <h1>There are no announcements</h1> : topics.map((topic) => { <><h1>{topic.title}</h1><p>{topic.content}</p></> })}
    </div>
  );
}

export default Protected;
