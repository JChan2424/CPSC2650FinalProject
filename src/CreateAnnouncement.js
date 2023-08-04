import React from "react";
import { useNavigate } from "react-router";

const { useState, useEffect } = React;

const CreateAnnouncement = props=>{
    let [ title, setTitle ] = useState();
    let [ topic, setTopic ] = useState();
    let [ message, setMessage ] = useState();
    const navigate = useNavigate();

    const submitAnnouncement = (e)=>{
        e.preventDefault();
        //verify
        //call announcement endpoint
        const token = localStorage.getItem("token");

        if (!token || token == "undefined") {
            console.log("no token");
        } else {
            fetch("/api/verify", {
                method: "POST",
                headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    let author;
                    res.json().then(data=>{
                        author = data.username;
                        if (data.role === ADMIN || data.role === MODERATOR){
                            fetch("/api/announcements", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    title: title,
                                    topic: topic,
                                    message: message,
                                    author: author
                                })
                            })
                            .then(res=>{
                                if (res.status === 200) {
                                    navigate('/announcements', {state:{searchStatus: false}, replace: true});
                                } else {
                                    //go to error (server error)
                                }
                            })
                        } else {
                            //go to error (wrong role)
                        }
                    })
                    .catch(err=>{console.log(err)});                    
                } else {
                    localStorage.removeItem("token"); // clear the token and need to prompt user to login again
                    //go to error
                }
            })
            .catch((err) => console.log(err));
        }
    }

    return (
        <div className="card d-inline-block">
            <h5 className="card-title p-2">Create new Announcement</h5>
            <form onSubmit={e=>submitAnnouncement(e)}> 
                <label className="d-block p-2">
                    Topic:<br />
                    <input type="text" onChange={e=>setTopic(e.target.value)}></input>
                </label>

                <label className="d-block p-2">
                    Title:<br />
                    <input type="text" onChange={e=>setTitle(e.target.value)}></input>
                </label>

                <label className="d-block p-2">
                    Content:<br />
                    <textarea onChange={e=>setMessage(e.target.value)}></textarea>
                </label>

                <button className="btn btn-primary p-2 m-2">Submit</button>
            </form>
        </div>
    );
}

export default CreateAnnouncement;