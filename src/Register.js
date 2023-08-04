import React from "react";
import { Link, useNavigate } from "react-router-dom";

const { useState, useEffect } = React;
const Register = props=>{
    let [ username, setUsername ] = useState();
    let [ password, setPassword ] = useState();
    let [ confirmedPassword, setConfirmedPassword ] = useState();
    let [ inviteCode, setInviteCode ] = useState();
    let [ role, setRole ] = useState();
    let navigate = useNavigate();

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
                "invite" : inviteCode,
                "role" : role
            })
        })
        .then(res => {
            console.log("register apicall status", res.status);
            if (res.status === 400) {

                //alert: invalid request, try again

            }

            if (res.status === 409) {
                //alert: username already exists
            }

            if (res.status === 200) {
                //redirect to login page
                navigate("/login", {replace: true})
            }
        })
        .catch(err=>{
            console.log("register err", err);
        });
    }

    return (
        <div className="card d-inline-block ms-2">
            <h5 className="card-title p-2">Register</h5>
            <form onSubmit={e=>submitRegister(e)}> 
                <label className="d-block p-2">
                    Enter username:<br />
                    <input type="text" onChange={e=>setUsername(e.target.value)}></input>
                </label>

                <label className="d-block p-2">
                    Enter password:<br />
                    <input type="password" onChange={e=>setPassword(e.target.value)}></input>
                </label>

                <label className="d-block p-2">
                    Confirm password:<br />
                    <input type="password" onChange={e=>setConfirmedPassword(e.target.value)}></input>
                </label>
                <label className="d-block p-2">
                    Invite Code (Optional):<br />
                    <input type="text" onChange={e=>setInviteCode(e.target.value)}></input>
                </label>
                {inviteCode ?
                <label>
                    Role: <br />
                    <select onChange={e=>setRole(e.target.value)}>
                        <option value={"USER"}>User</option>
                        <option value={"MODERATOR"}>Moderator</option>
                        <option value={"ADMIN"}>Admin</option>
                    </select>
                </label> 
                 : 
                 <></>}
                <button className="btn btn-primary p-2 m-2">Submit</button>
            </form>
            <Link
                  to={"/login"}
                  state={{ test: "test" }}
                  className="btn btn-primary m-2"
                >
                  Have an account? Log in here.
                </Link>
        </div>
    );
}

export default Register;