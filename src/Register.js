import React from "react";

const { useState, useEffect } = React;

const Register = props=>{
    let [ username, setUsername ] = useState();
    let [ password, setPassword ] = useState();
    let [ confirmedPassword, setConfirmedPassword ] = useState();
    const submitRegister = (e)=>{
        e.preventDefault();
        //verify password is secure
        //make a call to register endpoint
    }

    return (
        <div className="card d-inline-block">
            <h5 className="card-title p-2">Register</h5>
            <form onSubmit={e=>submitRegister(e)}> 
                <label className="d-block p-2">
                    Enter username:<br />
                    <input type="text" onChange={e=>setUsername(e.target.value)}></input>
                </label>

                <label className="d-block p-2">
                    Enter password:<br />
                    <input type="text" onChange={e=>setPassword(e.target.value)}></input>
                </label>

                <label className="d-block p-2">
                    Confirm password:<br />
                    <input type="text" onChange={e=>setConfirmedPassword(e.target.value)}></input>
                </label>
                <button className="btn btn-primary p-2 m-2">Submit</button>
            </form>
        </div>
    );
}

export default Register;