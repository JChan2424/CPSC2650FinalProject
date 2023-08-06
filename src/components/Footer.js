import React from "react";

const Footer = () => {
  return (
    <>
      <hr />
      <div className="h4 text-center">
        <footer>
          <kbd>
            {" "}
            &copy; <span>{new Date().getFullYear()}</span> Joshua Chan, Ashwin
            Charathsandran, Kieran Lee. All Rights Reserved.
          </kbd>
        </footer>
      </div>
    </>
  );
};
export default Footer;
