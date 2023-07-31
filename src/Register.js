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

        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "confirmedPassword": confirmedPassword,
            }),
        }).then((res) => {

            if (res.status === 400) {

                //alert: invalid request, try again

            }

            if (res.status === 409) {
                //alert: username already exists
            }

            if (res.status === 200) {
                //redirect to login page
            }
        });
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