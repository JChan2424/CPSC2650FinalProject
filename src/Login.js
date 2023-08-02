import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router";

const Login = props=>{
    let [ username, setUsername ] = useState();
    let [ password, setPassword ] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const testStateTwo=location.state?.test;

    console.log(testStateTwo, "testStateTwo");

    const submitLogin = (e)=>{
        e.preventDefault();
        let data = {
            "username" : username,
            "password" : password
        }
        console.log(data);
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(res=>{
            if(res.status === 401) {

            } else if (res.status === 402) {

            } else if(res.status === 200) {
                res.json().then(data=>{
                    console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("role", data.role);
                navigate("/announcements", {state: {posts: data.posts} , replace: true });
                })
                

            } else {

            }
        })
        .catch(err=>console.log(err));
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