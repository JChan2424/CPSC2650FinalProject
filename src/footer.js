import React, { useState, useEffect } from "react";

const Footer = props => {
    let [year, setYear] = useState();
    useEffect(() => {
        let date = new Date();
        setYear(date.getFullYear());
    }, []);

    return (
        <>
            <hr/>
            <div className="h4 text-center">
                <footer>
                    <kbd> &copy; <span>{year}</span> Joshua Chan, Ashwin Charathsandran, Kieran Lee. All Rights Reserved.</kbd>
                </footer>
            </div>
        </>
    );
}
export default Footer;