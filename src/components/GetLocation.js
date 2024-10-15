import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS
import "../App.css";
import DarkMode from "./DarkMode.js";

const GetLocation = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    ip: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state for button visibility

  // Function to fetch location data from ipinfo.io
  const fetchLocation = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        "https://ipinfo.io/json?token=9e9afed582418f"
      );
      const data = await response.json();

      const [latitude, longitude] = data.loc.split(","); // Extract lat and lon from 'loc'

      // Update state with IP, latitude, and longitude
      setLocation({
        latitude,
        longitude,
        ip: data.ip,
      });

      // Send email with the fetched data
      sendEmail({
        name,
        phone,
        latitude,
        longitude,
        ip: data.ip,
      });
    } catch (err) {
      setError("Failed to fetch location");
    } finally {
      setLoading(false);
    }
  };

  // Function to send email using EmailJS
  const sendEmail = (data) => {
    const serviceID = "service_2gjjcr9"; // Replace with your EmailJS service ID
    const templateID = "template_wyfpm9g"; // Replace with your EmailJS template ID
    const userID = "L_R2M4jV9n12UDpID"; // Replace with your EmailJS user ID

    emailjs
      .send(serviceID, templateID, data, userID)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
      });
  };

  // Handle name input
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle phone number input, allowing only numbers
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone && name) {
      setIsButtonDisabled(true); // Disable the button
      fetchLocation();
    } else {
      setError("Please enter a valid phone number and full name");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Get Your Location</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Full Name:
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your full name"
              style={styles.input}
            />
          </label>
          <br />
          <label style={styles.label}>
            Phone Number:
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
              style={styles.input}
            />
          </label>
          <br />
          {!isButtonDisabled && ( // Render button only if it's not disabled
            <button type="submit" style={styles.button}>
              Get Location
            </button>
          )}
        </form>

        {loading && <p style={styles.loading}>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {location.latitude && location.longitude && location.ip && (
          <div style={styles.locationInfo}>
            <p>
              <strong>Full Name: </strong> {name}
            </p>
            <p>
              <strong>Phone Number: </strong> {phone}
            </p>
            <p>
              <strong>IP: </strong> {location.ip}
            </p>
            <p>
              <strong>Latitude: </strong> {location.latitude}
            </p>
            <p>
              <strong>Longitude: </strong> {location.longitude}
            </p>
          </div>
        )}
      </div>
      {/* <div className="l-navbar" id="nav-bar">
        <span className="bx bx-menu header_toggle" id="header_toggle"></span>
        <nav className="nav">
          <div>
            <a href="/rrc/#" className="nav_link">
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
            <a href="/rrc/login" className="nav_link">
              <i className="bx bx-log-out nav_icon"></i>
              <span className="nav_name">SignOut</span>
            </a>
          </div>
        </nav>
      </div> */}
      <header className="header" id="header">
        <DarkMode />
        <span className="nav_logo-name">Get Your Location</span>
        <div>
          <img src="/rrc/rrc-logo.png" alt="Logo" className="logo" id="logo" />
        </div>
      </header>
    </div>
  );
};

// CSS-in-JS style for professional look and feel with responsive design
const styles = {
  container: {
    backgroundImage:
      'url("https://roadrescueconnect.com/wp-content/uploads/2024/10/tow.png")', // Background image related to roadside assistance
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Arial', sans-serif",
    padding: "20px", // Padding for small screens
  },
  formWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    color: "#FFD700",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    margin: "0 20px", // Margins to prevent content from touching screen edges
  },
  title: {
    fontSize: "24px",
    color: "#FFD700", // Gold title color
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "10px",
    color: "#FFD700",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #FFD700",
    backgroundColor: "#000",
    color: "#FFD700",
    marginBottom: "15px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#daa520",
  },
  loading: {
    color: "#FFD700",
  },
  error: {
    color: "red",
  },
  locationInfo: {
    marginTop: "20px",
    color: "#FFD700",
    textAlign: "left",
  },
  // Media Queries for Responsive Design
  "@media (max-width: 600px)": {
    formWrapper: {
      padding: "20px",
      maxWidth: "100%", // Full-width on small screens
    },
    input: {
      fontSize: "14px", // Smaller input font size on small screens
    },
    button: {
      fontSize: "14px", // Smaller button font size on small screens
    },
    title: {
      fontSize: "20px", // Smaller title font size on small screens
    },
  },
  "@media (min-width: 601px) and (max-width: 1024px)": {
    formWrapper: {
      padding: "25px",
      maxWidth: "80%", // Larger but still responsive on tablets
    },
    input: {
      fontSize: "15px",
    },
    button: {
      fontSize: "15px",
    },
    title: {
      fontSize: "22px",
    },
  },
};

export default GetLocation;
