import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import "./homestyles.css";
const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <div className="image">
              <img src="/home.jpeg" alt="hero" />
            </div>
            <div class name="text">
            <h1>Find Your Dream Job Today</h1>
            <p>
              Discover thousands of job opportunities with top employers. Your
              next career move is just a click away.
            </p>
            </div>
          </div>
        </div>
        <div className="details">
        </div>
      </div>
    </>
  );
};

export default HeroSection;
