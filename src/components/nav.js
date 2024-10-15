// src/components/Navbar.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";

const Navbar = ({ onSignOut }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="l-navbar" id="nav-bar">
      <span className="bx bx-menu header_toggle" id="header_toggle"></span>
      <nav className="nav">
        <div>
          <a className="nav_link">
            <div
              className={`dropdown ${isActive ? "active" : ""}`}
              id="myDropdown"
            >
              <button className="button1" onClick={toggleDropdown}>
                Add new
              </button>
              <div className="dropdown-content">
                <a href="/rrc/NewLead">Lead</a>
              </div>
            </div>
          </a>
          <div className="nav_list">
            <a href="/rrc/Dashboard" className="nav_link active">
              <i className="bx bx-grid-alt nav_icon"></i>
              <span className="nav_name">Dashboard</span>
            </a>
            <a href="/rrc/Users" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">Users</span>
            </a>
            <a href="/rrc/Clients" className="nav_link">
              <i className="bx bx-group nav_icon"></i>
              <span className="nav_name">Clients</span>
            </a>
            <a href="/rrc/Schedule" className="nav_link">
              <i className="bx bx-message-square-detail nav_icon"></i>
              <span className="nav_name">Schedule</span>
            </a>
            <a href="/rrc/Jobreports" className="nav_link">
              <i className="bx bx-bookmark nav_icon"></i>
              <span className="nav_name">Jobs</span>
            </a>
            <a href="/rrc/Leadreports" className="nav_link">
              <i className="bx bx-folder nav_icon"></i>
              <span className="nav_name">Leads</span>
            </a>
            <a href="/rrc/Reports" className="nav_link">
              <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span className="nav_name">Reports</span>
            </a>
          </div>
          <a href="/rrc/#" className="nav_link" onClick={onSignOut}>
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
