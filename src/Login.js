import React, {useState, useEffect} from "react";

// const { useState, useEffect } = React;

const Login = props=>{
    let [ username, setUsername ] = useState();
    let [ password, setPassword ] = useState();
    const submitLogin = (e)=>{
        e.preventDefault();
        //make a call to login endpoint
    }

    return (
        <div className="card d-inline-block">
            <h5 className="card-title p-2">Login</h5>
            <form onSubmit={e=>submitLogin(e)}> 
                <label className="d-block p-2">
                    Enter username:<br />
                    <input type="text" onChange={e=>setUsername(e.target.value)}></input>
                </label>

                <label className="d-block p-2">
                    Enter password:<br />
                    <input type="text" onChange={e=>setPassword(e.target.value)}></input>
                </label>
                <button className="btn btn-primary p-2 m-2">Submit</button>
            </form>
        </div>
    );
}

export default Login;