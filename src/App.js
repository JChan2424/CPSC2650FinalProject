import React, {useState, useEffect} from "react";
import Navbar from "./navbar.js";
import Body from "./body.js";
import Footer from "./footer.js";

const App = props => {
    const [posts, setPosts] = useState();
    const [search, setSearchStatus] = useState(false);
    return (
        <>
            <div >
                <Navbar posts={posts} setPosts={setPosts} search={search} setSearchStatus={setSearchStatus}/>
                <Body posts={posts} setPosts={setPosts} search={search} setSearchStatus={setSearchStatus}/>
                <Footer />
            </div>
        </>
    );
}
export default App;