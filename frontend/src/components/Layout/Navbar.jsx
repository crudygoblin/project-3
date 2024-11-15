import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import "./layoutstyles.css";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  // Conditionally render the navbar only if the user is authorized
  if (!isAuthorized) return null;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="left-menu">
          <ul className={`menu ${show ? "show-menu" : ""}`}>
            <li><Link to="/" onClick={() => setShow(false)}>Home</Link></li>
            <li><Link to="/job/getall" onClick={() => setShow(false)}>Browse Jobs</Link></li>
            <li>
              <Link to="/applications/me" onClick={() => setShow(false)}>
                {user && user.role === "Employer" ? "Applicants" : "My Applications"}
              </Link>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li><Link to="/job/post" onClick={() => setShow(false)}>Create Job</Link></li>
                <li><Link to="/job/me" onClick={() => setShow(false)}>Manage Jobs</Link></li>
              </>
            )}
          </ul>
        </div>
        <div className="right-menu">
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
