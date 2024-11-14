import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import "./layoutstyles.css";
const Footer = () => {
  const { isAuthorized } = useContext(Context);

  if (!isAuthorized) return null; // Conditionally render footer only if authorized

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; All Rights Reserved</p>
        <div className="social-links">
          <Link to="https://www.facebook.com/" target="_blank">
            <FaFacebookF />
          </Link>
          <Link to="https://www.youtube.com/" target="_blank">
            <FaYoutube />
          </Link>
          <Link to="https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit" target="_blank">
            <FaLinkedin />
          </Link>
          <Link to="https://www.instagram.com/crudygoblin/" target="_blank">
            <RiInstagramFill />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
