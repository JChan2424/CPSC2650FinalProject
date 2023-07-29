import React from "react";

const { useState, useEffect } = React;

const CreateAnnouncement = props=>{
    let [ title, setTitle ] = useState();
    let [ topic, setTopic ] = useState();
    let [ message, setMessage ] = useState();
    const submitAnnouncement = (e)=>{
        e.preventDefault();
        //verify
        //call announcement endpoint
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
                    <textarea onChange={e=>setTitle(e.target.value)}></textarea>
                </label>

                <button className="btn btn-primary p-2 m-2">Submit</button>
            </form>
        </div>
    );
}

export default CreateAnnouncement;