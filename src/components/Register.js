import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const Register = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmedPassword, setConfirmedPassword] = useState();
    const [inviteCode, setInviteCode] = useState();
    const [role, setRole] = useState();
    const [...setErrMessage] = useOutletContext();
    const navigate = useNavigate();

    const submitRegister = (e) => {
        e.preventDefault();

        // Create the data to send to the server
        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                confirmedPassword: confirmedPassword,
                invite: inviteCode,
                role: role,
            }),
        })
            .then((res) => {
                // If there is an error, redirect to error page with error message
                if (res.status === 400 || res.status === 409) {
                    res.json().then((data) => {
                        setErrMessage(data.message);
                        navigate("/error", { replace: true });
                    });
                }

                if (res.status === 200) {
                    //redirect to login page if successful
                    navigate("/login", { replace: true });
                }
            })
            .catch((err) => {
                console.log("register err", err);
                setErrMessage("Unknown Error");
                navigate("/error", { replace: true });
            });
    };

    return (
        <div className="card d-inline-block ms-2">
            <h5 className="card-title p-2">Register</h5>
            <form onSubmit={(e) => submitRegister(e)}>
                <label className="d-block p-2">
                    Enter username:
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                </label>

                <label className="d-block p-2">
                    Enter password:
                    <br />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </label>

                <label className="d-block p-2">
                    Confirm password:
                    <br />
                    <input
                        type="password"
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                    ></input>
                </label>
                <label className="d-block p-2">
                    Invite Code (Optional):
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setInviteCode(e.target.value)}
                    ></input>
                </label>
                {inviteCode ? (
                    <label>
                        Role: <br />
                        <select onChange={(e) => setRole(e.target.value)}>
                            <option value={"USER"}>User</option>
                            <option value={"MODERATOR"}>Moderator</option>
                            <option value={"ADMIN"}>Admin</option>
                        </select>
                    </label>
                ) : (
                    <></>
                )}
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
};

export default Register;
