import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="page-footer"
      style={{ paddingTop: "0px", backgroundColor: "#0a2f66" }}
    >
      <div className="footer-copyright">
        <div className="container" style={{ textAlign: "center" }}>
          © 2020 Copyright Task App
        </div>
      </div>
    </footer>
  );
};

export default Footer;
