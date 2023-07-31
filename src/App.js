import React from "react";
import Navbar from "./navbar.js";
import Body from "./body.js";
import Footer from "./footer.js";
const App = props => {

    return (
        <>
            <div >
                <Navbar />
                <Body />
                <Footer />
            </div>
        </>
    );
}
export default App;