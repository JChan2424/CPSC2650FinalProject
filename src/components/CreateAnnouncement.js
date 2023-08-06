import React from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router";

const { useState, useEffect } = React;

const CreateAnnouncement = (props) => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [, , , setErrMessage] = useOutletContext();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setTitle(state.title);
      setTopic(state.topic);
      setMessage(state.message);
    }
  }, [state]);

  const handleAnnouncement = async (endpoint, method, body) => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      setErrMessage("You must login to continue");
      navigate("/error", { replace: true });
    }

    try {
      const verificationResponse = await fetch("/api/verify", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (verificationResponse.status !== 200) {
        setErrMessage("Please login to continue");
        localStorage.removeItem("token");
        navigate("/error", { replace: true });
        return;
      }

      const userData = await verificationResponse.json();
      const announcementResponse = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body, author: userData.username }),
      });

      if (announcementResponse.status !== 200) {
        setErrMessage(
          `Unable to ${method === "POST" ? "create" : "update"} announcement`
        );
        navigate("/error", { replace: true });
      } else {
        navigate("/view-announcements", {
          state: { searchStatus: false },
          replace: true,
        });
      }
    } catch (error) {
      setErrMessage(
        `Unable to ${method === "POST" ? "create" : "update"} announcement`
      );
      navigate("/error", { replace: true });
    }
  };

  const submitAnnouncement = () => {
    handleAnnouncement("/api/announcements", "POST", {
      title,
      topic,
      message,
    });
  };

  const updateAnnouncement = (id) => {
    handleAnnouncement(`/api/announcements/${id}`, "PUT", {
      title,
      topic,
      message,
    });
  };

  return (
    <div className="card d-inline-block">
      <h5 className="card-title p-2" id="create-announcement-title">
        Create new Announcement
      </h5>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="d-block p-2" for="topic">
          Topic:
          <br />
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            aria-label="Topic"
            aria-required="true"
            tabIndex="0"
            required
          ></input>
        </label>

        <label className="d-block p-2" for="title">
          Title:
          <br />
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Title"
            aria-required="true"
            tabIndex="0"
            required
          ></input>
        </label>

        <label className="d-block p-2" for="content">
          Content:
          <br />
          <textarea
            id="content"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Content"
            aria-required="true"
            tabIndex="0"
            required
          ></textarea>
        </label>

        {state ? (
          <button
            className="btn btn-primary p-2 m-2"
            aria-label="Submit new announcement"
            tabIndex="0"
            onClick={() => {
              updateAnnouncement(state.id);
            }}
          >
            Submit
          </button>
        ) : (
          <button
            className="btn btn-primary p-2 m-2"
            aria-label="Submit new announcement"
            tabIndex="0"
            onClick={submitAnnouncement}
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateAnnouncement;
