const React = require("react");

import App from '../src/App';
import Login from '../src/Login';
import Register from '../src/Register';
import CreateAnnouncement from '../src/CreateAnnouncement'
import Body from '../src/body';
import Error from '../src/Error'

const routes = [
    {
        path: "/",
        Component() { return <App/> } ,
        children: [
            {
                path: "/login",
                Component() {return <Login />}
            },
            {
                path: "/register",
                Component()  {return <Register />}
            },
            {
                path: "/view-announcements",
                Component()  {return <Body />}
            },
            {
                path: "/create-announcement",
                Component()  {return <CreateAnnouncement />}
            }, 
            {
                path: "/error",
                Component() {return <Error />}
            }

        ]
    }
]

export default routes;