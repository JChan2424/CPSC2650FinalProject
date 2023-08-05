import React from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const Error = (props) => {
    const [, , errMessage] = useOutletContext();
    return (
        <div className="card d-inline-block ms-2">
            <h5 className="card-title p-2">Error</h5>
            <div className="card-body">
                <p className="text-start">{errMessage}</p>
            </div>
            <Link to={"/view-announcements"} className="btn btn-primary m-2">
                Return to home
            </Link>
        </div>
    );
};

export default Error;
