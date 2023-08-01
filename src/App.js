import React, {useState, useEffect} from "react";
import Navbar from "./navbar.js";
import Body from "./body.js";
import Footer from "./footer.js";

const App = props => {
    const [posts, setPosts] = useState();
    return (
        <>
            <div >
                <Navbar posts={posts} setPosts={setPosts} />
                <Body posts={posts} setPosts={setPosts} />
                <Footer />
            </div>
        </>
    );
}
export default App;