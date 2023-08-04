import React, {useState, useEffect} from "react";
import Navbar from "./navbar.js";
import Body from "./body.js";
import Footer from "./footer.js";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

const App = props => {
    const [posts, setPosts] = useState();
    const [search, setSearchStatus] = useState(false);
    const [appRole, setAppRole] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        navigate("/announcements");
    }, []);
    return (
        <>
            <div >
            <Navbar posts={posts} setPosts={setPosts} search={search} setSearchStatus={setSearchStatus} appRole={appRole} setAppRole={setAppRole} />
                    <div>
                        <Outlet context={[appRole, setAppRole]}/>
                    </div>
                <Footer />
            </div>
        </>
    );
}
export default App;