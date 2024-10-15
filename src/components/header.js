// src/components/Header.js

import React from "react";
import DarkMode from "./DarkMode"; // Import DarkMode component
import "../App.css";

const Header = ({ onSignOut }) => {
  return (
    <header className="header" id="header">
      <DarkMode />
      <span className="nav_logo-name">Dashboard</span>
      <div>
        <img src="/rrc/rrc-logo.png" alt="Logo" className="logo" id="logo" />
      </div>
    </header>
  );
};

export default Header;
