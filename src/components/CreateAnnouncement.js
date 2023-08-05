import React from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router";

const { useState, useEffect } = React;

const CreateAnnouncement = (props) => {
    let [title, setTitle] = useState();
    let [topic, setTopic] = useState();
    let [message, setMessage] = useState();
    const [...setErrMessage] = useOutletContext();
    const navigate = useNavigate();
    let { state } = useLocation();

    useEffect(()=>{
        
        console.log(state);

        if (state) { //if state then we are updating
            setTitle(state.title);
            setTopic(state.topic);
            setMessage(state.message);
        } else {
            setTitle("");
            setTopic("");
            setMessage("");
        }

    }, [])
    

    // Creates a new announcement
    const submitAnnouncement = () => {
        // Check if credentials are in local storage
        const token = localStorage.getItem("token");

        if (!token || token == "undefined") {
            // Redirect to error page if not logged in
            setErrMessage("you must login to continue");
            navigate("/error", { replace: true });
        } else {
            // Make sure user is logged in
            fetch("/api/verify", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            })
                // If logged in, continue
                .then((res) => {
                    // If valid token, continue
                    if (res.status === 200) {
                        let author;
                        // Get the username of the user
                        res.json()
                            .then((data) => {
                                author = data.username;

                                // Create the announcement
                                fetch("/api/announcements", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        title: title,
                                        topic: topic,
                                        message: message,
                                        author: author,
                                    }),
                                }).then((res) => {
                                    // If successful, redirect to view announcements
                                    if (res.status === 200) {
                                        navigate("/view-announcements", {
                                            state: { searchStatus: false },
                                            replace: true,
                                        });
                                    } else {
                                        setErrMessage(
                                            "Unable to create announcement"
                                        );
                                        navigate("/error", { replace: true });
                                    }
                                });
                            })
                            .catch((err) => {
                                setErrMessage("unable to create announcement");
                                navigate("/error", { replace: true });
                            });
                    } else {
                        localStorage.removeItem("token"); // clear the token and need to prompt user to login again
                        setErrMessage("Please login to continue");
                        navigate("/error", { replace: true });
                    }
                })
                .catch(() => {
                    setErrMessage("unable to create announcement");
                    navigate("/error", { replace: true });
                });
        }
    };

    const updateAnnouncement = (id) => {
        // Check if credentials are in local storage
        const token = localStorage.getItem("token");

        if (!token || token == "undefined") {
            // Redirect to error page if not logged in
            setErrMessage("you must login to continue");
            navigate("/error", { replace: true });
        } else {
            // Make sure user is logged in
            fetch("/api/verify", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            })
                // If logged in, continue
                .then((res) => {
                    // If valid token, continue
                    if (res.status === 200) {
                        let author;
                        // Get the username of the user
                        res.json()
                            .then((data) => {
                                author = data.username;

                                if (data.role !== "ADMIN" && data.role !== "MODERATOR") {
                                    setErrMessage("Must be admin or moderator to edit announcements");
                                    navigate("/error", { replace: true });
                                } else {
                                    //Update the announcement
                                    fetch(`/api/announcements/${id}`, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            title: title,
                                            topic: topic,
                                            message: message,
                                            author: author,
                                        }),
                                    }).then((res) => {
                                        // If successful, redirect to view announcements
                                        if (res.status === 200) {
                                            navigate("/view-announcements", {
                                                state: { searchStatus: false },
                                                replace: true,
                                            });
                                        } else {
                                            setErrMessage(
                                                "Unable to update announcement"
                                            );
                                            navigate("/error", { replace: true });
                                        }
                                    });
                                }

                                
                            })
                            .catch((err) => {
                                setErrMessage("unable to update announcement");
                                navigate("/error", { replace: true });
                            });
                    } else {
                        localStorage.removeItem("token"); // clear the token and need to prompt user to login again
                        setErrMessage("Please login to continue");
                        navigate("/error", { replace: true });
                    }
                })
                .catch(() => {
                    setErrMessage("unable to update announcement");
                    navigate("/error", { replace: true });
                });
        }
    }

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
                    ></textarea>
                </label>

                {state ?
                    <button
                        className="btn btn-primary p-2 m-2"
                        aria-label="Submit new announcement"
                        tabIndex="0"
                        onClick={()=>{updateAnnouncement(state.id)}}
                    >
                        Submit
                    </button> :
                    <button
                        className="btn btn-primary p-2 m-2"
                        aria-label="Submit new announcement"
                        tabIndex="0"
                        onClick={submitAnnouncement}
                    >
                        Submit
                    </button>}

            </form>
        </div>
    );
};

export default CreateAnnouncement;
