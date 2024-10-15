import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the auth token from localStorage
    localStorage.removeItem("authToken");

    // Redirect to the login page
    navigate("/login");
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;
