import React, {useState, useEffect} from "react";
import Navbar from "./navbar.js";
import Body from "./body.js";
import Footer from "./footer.js";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

const App = props => {
    const [posts, setPosts] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        navigate("/announcements");
    }, []);
    return (
        <>
            <div >

                <Navbar posts={posts} setPosts={setPosts} />
                    <div id="login">
                        <Outlet />
                    </div>
                {/* <Body posts={posts} setPosts={setPosts} /> */}
                <Footer />


            </div>
        </>
    );
}
export default App;