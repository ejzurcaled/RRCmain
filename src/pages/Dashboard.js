import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";
import DarkMode from "../components/DarkMode.js";
import Header from "../components/header.js"; // Import Header component
import Navbar from "../components/nav.js"; // Import Navbar component

const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  // Function to handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("authToken"); // Remove the auth token
    navigate("/rrc/SignIn"); // Redirect to sign-in page
  };

  useEffect(() => {
    // Function to fetch data from API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://roadrescueconnect.com/rrc/fetch_leads.php"
        ); // Updated URL
        const data = await response.json();

        // Process data for Chart.js
        const labels = data.map((item) => item.status); // Assuming 'status' is a key in your data
        const values = data.map((item) => item.count); // Assuming 'count' is a key in your data

        // Define colors based on label
        const colors = labels.map((label) => {
          switch (label) {
            case "Approved":
              return "rgba(255, 165, 0, 0.5)"; // Orange for 'approved'
            case "Deleted":
              return "rgba(255, 0, 0, 0.5)"; // Red for 'deleted'
            case "In-Progress":
              return "rgba(255, 255, 0, 0.5)"; // Yellow for 'in-progress'
            case "New":
              return "rgba(0, 128, 0, 0.5)"; // Green for 'new'
            case "Pending":
              return "rgba(0, 0, 255, 0.5)"; // Blue for 'pending'
            case "Scheduled":
              return "rgba(128, 0, 128, 0.5)"; // Purple for 'scheduled'
            default:
              return "rgba(128, 128, 128, 0.5)"; // Default gray color for any other label
          }
        });

        // Create chart
        const ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Lead Status",
                data: values,
                backgroundColor: colors,
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: "white", // Set font color to white
                },
              },
            },
            plugins: {
              datalabels: {
                anchor: "end",
                align: "end",
                formatter: function (value) {
                  return value; // Display the value (count) on each bar
                },
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData function to fetch data and create chart
    fetchData();
  }, []);

  return (
    <div>
      <Header onSignOut={handleSignOut} />
      <Navbar onSignOut={handleSignOut} />
      <div className="container">
        <div className="box1">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Leads Graph Report</strong>
            <canvas id="myChart"></canvas>
          </p>
        </div>
        <div className="box2">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Service Location</strong>
          </p>
        </div>
        <div className="box3">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Job Details</strong>
          </p>
        </div>
        <div className="box4">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Job Details</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
