import React from "react";
import { useNavigate, useOutletContext } from "react-router";

const Posts = (props) => {
    const navigate = useNavigate();
    const [, setAppRole, , setErrMessage] = useOutletContext();

    if (props.posts) {
        props.posts.map((post) => {
            let localDate = new Date(post.createdAt);
            post.localDate = localDate.toLocaleString();
        });
    }

    const deleteAnnouncecment = (e, id) => {
        e.preventDefault();
        const token = localStorage.getItem("token") || "undefined";

        if (!token || token == "undefined") {
            console.log("no token");
        } else {
            // Make sure user is logged in
            fetch("/api/verify", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        // Check if user is admin
                        res.json()
                            .then((data) => {
                                if (data.role === "ADMIN") {
                                    // Delete the announcement
                                    fetch(`/api/announcements/${id}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }).then((res) => {
                                        if (res.status === 200) {
                                            navigate(0); // refresh the page
                                        } else {
                                            setErrMessage(
                                                "Error deleting announcement"
                                            );
                                            navigate("/error", {
                                                replace: true,
                                            });
                                        }
                                    });
                                } else {
                                    setErrMessage(
                                        "You do not have permission to delete announcements"
                                    );
                                    navigate("/error", { replace: true });
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        localStorage.removeItem("token"); // clear the token and need to prompt user to login again
                        setAppRole("NONE");
                        setErrMessage(
                            "You do not have permission to delete announcements"
                        );
                        navigate("/error", { replace: true });
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const updateAnnouncecment = (e, id, title, topic, message) => {
        e.preventDefault();
        navigate('/create-announcement', {state: {id: id, title: title, topic: topic, message: message}, replace: true});
    }

    return (
        <>
            {props.posts ? (
                props.posts.map((post) => (
                    <div key={post._id}>
                        <br />
                        <div className="card">
                            <div className="card-title bg-primary">
                                <h3 className="text-start ms-2 mt-2 ">
                                    {post.title}
                                </h3>
                            </div>
                            <div className="card-body">
                                <div className="text-start">
                                    Topic: {post.topic}
                                </div>
                                <div className="text-start">
                                    Posted at: {post.localDate}
                                </div>
                                <div className="text-start">
                                    Posted by: {post.author}
                                </div>
                                <hr />
                                <p className="text-start">{post.message}</p> <br />
                                {props.appRole === "MODERATOR" || props.appRole === "ADMIN" ? (
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                                updateAnnouncecment(
                                                    e,
                                                    post._id,
                                                    post.title,
                                                    post.topic,
                                                    post.message
                                                );
                                            }}
                                        >
                                            Update Announcement
                                        </button> &nbsp;
                                    </>
                                ) : (
                                    <></>
                                )}
                                {props.appRole === "ADMIN" ? (
                                    <>
                                        
                                        <button
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                                deleteAnnouncecment(
                                                    e,
                                                    post._id
                                                );
                                            }}
                                        >
                                            Delete Announcement
                                        </button>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading posts</p>
            )}
            <br />
        </>
    );
};
export default Posts;
