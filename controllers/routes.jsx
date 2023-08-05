const React = require("react");

import App from "../src/App";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import CreateAnnouncement from "../src/components/CreateAnnouncement";
import Body from "../src/components/Body";
import Error from "../src/components/Error";

const routes = [
    {
        path: "/",
        Component() {
            return <App />;
        },
        children: [
            {
                path: "/login",
                Component() {
                    return <Login />;
                },
            },
            {
                path: "/register",
                Component() {
                    return <Register />;
                },
            },
            {
                path: "/view-announcements",
                Component() {
                    return <Body />;
                },
            },
            {
                path: "/create-announcement",
                Component() {
                    return <CreateAnnouncement />;
                },
            },
            {
                path: "/error",
                Component() {
                    return <Error />;
                },
            },
        ],
    },
];

export default routes;
