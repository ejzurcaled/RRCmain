import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import DarkMode from "../components/DarkMode.js";
import Pikaday from "pikaday";

function Jobreports() {
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    // Get the current time
    const now = new Date();

    // Get hours and minutes
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Format hours and minutes to ensure they have leading zeros if necessary
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Set the value of the time input field for timepickerStart
    const timepickerStart = document.getElementById("timepickerStart");
    if (timepickerStart) {
      timepickerStart.value = hours + ":" + minutes;
    }

    // Increment hours for timepickerEnd
    let endHours = hours;
    if (hours === 23) {
      endHours = "00"; // If it's 11 PM, set to 12 AM
    } else {
      endHours = (parseInt(hours) + 1).toString(); // Otherwise, increment by 1
      endHours = endHours.length < 2 ? "0" + endHours : endHours; // Format
    }

    // Set the value of the time input field for timepickerEnd
    const timepickerEnd = document.getElementById("timepickerEnd");
    if (timepickerEnd) {
      timepickerEnd.value = endHours + ":" + minutes;
    }

    // Initialize dropdowns
    initializeDropdown(2);
    initializeDropdown(3);
    initializeDropdown(4);
    initializeDropdown(5);
    initializeDropdown(6);

    // Set placeholder for datepickers
    setPlaceholder();
  }, []);

  function initializeDropdown(dropdownNumber) {
    const dropdownInput = document.querySelector(
      `.dropdown${dropdownNumber}-input`
    );
    const dropdownList = document.querySelector(
      `.dropdown${dropdownNumber}-list`
    );

    if (dropdownInput && dropdownList) {
      dropdownInput.addEventListener("click", function () {
        dropdownList.style.display =
          dropdownList.style.display === "block" ? "none" : "block";
      });

      dropdownList.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
          dropdownInput.value = e.target.textContent;
          dropdownList.style.display = "none";
        }
      });

      document.addEventListener("click", function (e) {
        if (
          !dropdownInput.contains(e.target) &&
          !dropdownList.contains(e.target)
        ) {
          dropdownList.style.display = "none";
        }
      });
    }
  }

  function setPlaceholder() {
    /* console.log("Running setPlaceholder function..."); */
    // Get current date
    var today = new Date();

    // Define month names and suffixes for days
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var suffixes = ["st", "nd", "rd", "th"];

    // Format the date as Sun Feb 18th 2024
    var dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      today.getDay()
    ];
    var month = months[today.getMonth()];
    var day = today.getDate();
    var suffix = suffixes[(day - 1) % 10 <= 3 ? (day - 1) % 10 : 3];
    var year = today.getFullYear();

    /*     console.log(
      "Formatted date:",
      dayOfWeek + " " + month + " " + day + suffix + " " + year
    ); */

    // Set the placeholder of the inputs to today's date
    const datepicker = document.getElementById("datepicker");
    const datepickerEnd = document.getElementById("datepickerEnd");

    if (datepicker) {
      datepicker.setAttribute(
        "placeholder",
        dayOfWeek + " " + month + " " + day + suffix + " " + year
      );
    }

    if (datepickerEnd) {
      datepickerEnd.setAttribute(
        "placeholder",
        dayOfWeek + " " + month + " " + day + suffix + " " + year
      );
    }

    /*     console.log("Placeholder set successfully."); */
  }

  function showDatePicker() {
    // Create a date picker
    const picker = new Pikaday({
      field: document.getElementById("datepicker"),
      format: "ddd MMM D" + "S" + " YYYY", // Format the date
      onSelect: function (date) {
        const formattedDate = formatDate(date);
        document.getElementById("datepicker").value = formattedDate;
        picker.destroy(); // Destroy the picker after selecting a date
      },
    });
    picker.show();
  }

  function showDatePickerEnd() {
    // Create a date picker
    const picker = new Pikaday({
      field: document.getElementById("datepickerEnd"),
      format: "ddd MMM D" + "S" + " YYYY", // Format the date
      onSelect: function (date) {
        const formattedDate = formatDate(date);
        document.getElementById("datepickerEnd").value = formattedDate;
        picker.destroy(); // Destroy the picker after selecting a date
      },
    });
    picker.show();
  }

  function formatDate(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    // Add suffix to day of month
    let suffix = "th";
    if (dayOfMonth % 10 === 1 && dayOfMonth !== 11) {
      suffix = "st";
    } else if (dayOfMonth % 10 === 2 && dayOfMonth !== 12) {
      suffix = "nd";
    } else if (dayOfMonth % 10 === 3 && dayOfMonth !== 13) {
      suffix = "rd";
    }

    return `${day} ${month} ${dayOfMonth}${suffix} ${year}`;
  }

  return (
    <div>
      <header className="header" id="header">
        <DarkMode />
        <span className="nav_logo-name">Job Reports</span>
        <div>
          <img src="/rrc/rrc-logo.png" alt="Logo" className="logo" id="logo" />
        </div>
      </header>
      <div className="l-navbar" id="nav-bar">
        <span className="bx bx-menu header_toggle" id="header_toggle"></span>
        <nav className="nav">
          <div>
            <a /* href="#" */ className="nav_link">
              <div
                className={`dropdown ${isActive ? "active" : ""}`}
                id="myDropdown"
              >
                <button className="button1" onClick={toggleDropdown}>
                  Add new
                </button>
                <div className="dropdown-content">
                  <a href="/rrc/NewLead">
                    Lead <i className="bx bxs-right-arrow-square"></i>
                  </a>
                </div>
              </div>
            </a>

            <div className="nav_list">
              <a href="/rrc/Dashboard" className="nav_link">
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
      </div>
      <div className="containerNewlead">
        <h1>Job reports</h1>
      </div>
    </div>
  );
}
export default Jobreports;
