import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
  <div className="box">  <footer className="footer">
      <p>© {new Date().getFullYear()} TaskApp. All rights reserved.</p>
      <div className="footer-links">
        <a href="https://github.com/pradeepnigam9452" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://pradeep-portfolio-react.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
        <a href="mailto:asds.ex@gmail.com">Email: asds.ex@gmail.com</a>
      </div>
    </footer></div>
  );
};

export default Footer;
