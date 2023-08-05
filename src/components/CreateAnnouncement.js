import React from "react";
import { useNavigate, useOutletContext } from "react-router";

const { useState } = React;

const CreateAnnouncement = (props) => {
    let [title, setTitle] = useState();
    let [topic, setTopic] = useState();
    let [message, setMessage] = useState();
    const [...setErrMessage] = useOutletContext();
    const navigate = useNavigate();

    // Creates a new announcement
    const submitAnnouncement = (e) => {
        e.preventDefault();

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

    return (
        <div className="card d-inline-block">
            <h5 className="card-title p-2">Create new Announcement</h5>
            <form onSubmit={(e) => submitAnnouncement(e)}>
                <label className="d-block p-2">
                    Topic:
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setTopic(e.target.value)}
                    ></input>
                </label>

                <label className="d-block p-2">
                    Title:
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </label>

                <label className="d-block p-2">
                    Content:
                    <br />
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </label>

                <button className="btn btn-primary p-2 m-2">Submit</button>
            </form>
        </div>
    );
};

export default CreateAnnouncement;
