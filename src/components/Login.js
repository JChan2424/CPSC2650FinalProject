import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Link } from "react-router-dom";

const Login = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [, setAppRole, , setErrMessage] = useOutletContext();
    const navigate = useNavigate();

    const submitLogin = (e) => {
        e.preventDefault();
        // Create the data to send to the server
        let data = {
            username: username,
            password: password,
        };
        // Send the data to the server
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                // If there is an error, redirect to error page with error message
                if (res.status === 401 || res.status === 402) {
                    res.json().then((data) => {
                        setErrMessage(data.message);
                        navigate("/error", { replace: true });
                    });
                } else if (res.status === 200) {
                    // If successful, redirect to view announcements
                    res.json().then((data) => {
                        // Save the token to local storage
                        localStorage.setItem("token", data.token);
                        setAppRole(data.role);
                        navigate("/view-announcements", {
                            state: { posts: data.posts },
                            replace: true,
                        });
                    });
                } else {
                    setErrMessage("unknown error");
                    navigate("/error", { replace: true });
                }
            })
            .catch((err) => {
                setErrMessage("unknown error");
                navigate("/error", { replace: true });
            });
    };

    return (
        <div className="card d-inline-block ms-2">
            <h5 className="card-title p-2" id="login-title">
                Login
            </h5>
            <form onSubmit={(e) => submitLogin(e)}>
                <label className="d-block p-2" for="username">
                    Enter username:
                    <br />
                    <input
                        id="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        aria-label="Enter username"
                        aria-required="true"
                        tabIndex="0"
                        required
                    ></input>
                </label>

                <label className="d-block p-2" for="password">
                    Enter password:
                    <br />
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        aria-label="Enter password"
                        aria-required="true"
                        tabIndex="0"
                        required
                    ></input>
                </label>
                <button
                    className="btn btn-primary p-2 m-2"
                    aria-label="Submit Login"
                    tabIndex="0"
                >
                    Submit
                </button>
            </form>
            <Link
                to={"/register"}
                className="btn btn-primary m-2"
                aria-label="No account? Sign up here."
                tabIndex="0"
            >
                No account? Sign up here.
            </Link>
        </div>
    );
};

export default Login;
