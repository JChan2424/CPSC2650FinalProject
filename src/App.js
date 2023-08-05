import React, { useState, useEffect } from "react";
import Navbar from "./navbar.js";
import Footer from "./footer.js";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

const App = (props) => {
    const [posts, setPosts] = useState();
    const [search, setSearchStatus] = useState(false);
    const [appRole, setAppRole] = useState();
    const [errMessage, setErrMessage] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/view-announcements");
    }, []);
    
    return (
        <>
            <div>
                <Navbar
                    posts={posts}
                    setPosts={setPosts}
                    search={search}
                    setSearchStatus={setSearchStatus}
                    appRole={appRole}
                    setAppRole={setAppRole}
                />
                <div className="d-flex justify-content-center">
                    <Outlet
                        context={[
                            appRole,
                            setAppRole,
                            errMessage,
                            setErrMessage,
                        ]}
                    />
                </div>
                <Footer />
            </div>
        </>
    );
};
export default App;
