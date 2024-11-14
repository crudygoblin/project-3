import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import "./homestyles.css"; // Import the CSS file

const HowItWorks = () => {
  return (
    <div className="howitworks">
    <div className="bg">
      <div className="container">
        <h3>Effortlessly Navigate Your Job Application Journey</h3>
        <div className="circular-banner">
          <div className="circular-card create-account">
            <FaUserPlus size={40} />
            <p>Create Account</p>
          </div>
          <div className="circular-card find-job">
            <MdFindInPage size={40} />
            <p>Find a Job/Post a Job</p>
          </div>
          <div className="circular-card apply-job">
            <IoMdSend size={40} />
            <p>Apply For Job/Recruit Suitable Candidates</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HowItWorks;
