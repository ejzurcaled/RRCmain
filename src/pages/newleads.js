import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Pikaday from "pikaday";
import DarkMode from "../components/DarkMode";
import { Bounce, ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "react-router-dom";

function NewLead() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
  const [lastInsertedId, setLastInsertedId] = useState(null); // State to hold the last inserted ID

  const [formData, setFormData] = useState({
    clientname: "",
    companyname: "",
    phone: "",
    clientname: "",
    companyname: "",
    phone: "",
    ext: "",
    email: "",
    address: "",
    unit: "",
    city: "",
    region: "",
    postalcode: "",
    country: "",
    servicearea: "",
    jobtype: "",
    jobsource: "",
    jobdescription: "",
    timepickerStart: "",
    datepicker: "",
    datepickerEnd: "",
    timepickerEnd: "",
    specialjobs: "",
    highprofitjobs: "",
    cancellationfee: "",
    cancellationreason: "",
    year: "",
    make: "",
    model: "",
    agentname: "",
    inscompname: "",
    insagentname: "",
    insponumber: "",
    insGOA: "",
    insEMAIL: "",
    persongivequote: "",
    pricequote: "",
    eta: "",
    transactionnumber: "",
    transactiongrandtotal: "",
    dispatchername: "",
    dispatchedby: "",
    vendorquote1: "",
    vendorquote2: "",
    vendorquote3: "",
    vendorquote4: "",
    vendorquote5: "",
    vendorquote6: "",
    vendorquote7: "",
    vendorquote8: "",
    vendorquote9: "",
    vendorquote10: "",
    vendorquote11: "",
    vendorquote12: "",
    vendorquote13: "",
    vendorquote14: "",
    vendorquote15: "",
    vendorquote16: "",
    vendorquote17: "",
    vendorquote18: "",
    vendorquote19: "",
    vendorquote20: "",
    vendorquote21: "",
    vendorquote22: "",
    vendorquote23: "",
    vendorquote24: "",
    vendorquote25: "",
    vendorquote26: "",
    vendorquote27: "",
    vendorquote28: "",
    vendorquote29: "",
    vendorquote30: "",
    // Add other form fields here...
  });

  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  // UseEffect to fetch last inserted ID on component mount
  useEffect(() => {
    fetchLastInsertedId();
  });

  useEffect(() => {
    handleInputChange({ target: { name: "", value: "" } });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const clientNameInput = document.getElementById("clientname");
    if (clientNameInput && clientNameInput.value.trim() === "") {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
    setFormData({ ...formData, [name]: value });
  };

  function saveDataLead() {
    var clientname = document.getElementById("clientname").value;
    var companyname = document.getElementById("companyname").value;
    var phone = document.getElementById("phone").value;
    var ext = document.getElementById("ext").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var unit = document.getElementById("unit").value;
    var city = document.getElementById("city").value;
    var region = document.getElementById("region").value;
    var postalcode = document.getElementById("postalcode").value;
    var country = document.getElementById("country").value;
    var servicearea = document.getElementById("servicearea").value;
    var jobtype = document.getElementById("jobtype").value;
    var jobsource = document.getElementById("jobsource").value;
    var jobdescription = document.getElementById("jobdescription").value;
    var timepickerStart = document.getElementById("timepickerStart").value;
    var datepicker = document.getElementById("datepicker").value;
    var datepickerEnd = document.getElementById("datepickerEnd").value;
    var timepickerEnd = document.getElementById("timepickerEnd").value;
    var specialjobs = document.getElementById("specialjobs").value;
    var highprofitjobs = document.getElementById("highprofitjobs").value;
    var cancellationfee = document.getElementById("cancellationfee").value;
    var cancellationreason =
      document.getElementById("cancellationreason").value;
    var year = document.getElementById("year").value;
    var make = document.getElementById("make").value;
    var model = document.getElementById("model").value;
    var agentname = document.getElementById("agentname").value;
    var inscompname = document.getElementById("inscompname").value;
    var insagentname = document.getElementById("insagentname").value;
    var insponumber = document.getElementById("insponumber").value;
    var insGOA = document.getElementById("insGOA").value;
    var insEMAIL = document.getElementById("insEMAIL").value;
    var persongivequote = document.getElementById("persongivequote").value;
    var pricequote = document.getElementById("pricequote").value;
    var eta = document.getElementById("eta").value;
    var transactionnumber = document.getElementById("transactionnumber").value;
    var transactiongrandtotal = document.getElementById(
      "transactiongrandtotal"
    ).value;
    var dispatchername = document.getElementById("dispatchername").value;
    var dispatchedby = document.getElementById("dispatchedby").value;
    var vendorquote1 = document.getElementById("vendorquote1").value;
    var vendorquote2 = document.getElementById("vendorquote2").value;
    var vendorquote3 = document.getElementById("vendorquote3").value;
    var vendorquote4 = document.getElementById("vendorquote4").value;
    var vendorquote5 = document.getElementById("vendorquote5").value;
    var vendorquote6 = document.getElementById("vendorquote6").value;
    var vendorquote7 = document.getElementById("vendorquote7").value;
    var vendorquote8 = document.getElementById("vendorquote8").value;
    var vendorquote9 = document.getElementById("vendorquote9").value;
    var vendorquote10 = document.getElementById("vendorquote10").value;
    var vendorquote11 = document.getElementById("vendorquote11").value;
    var vendorquote12 = document.getElementById("vendorquote12").value;
    var vendorquote13 = document.getElementById("vendorquote13").value;
    var vendorquote14 = document.getElementById("vendorquote14").value;
    var vendorquote15 = document.getElementById("vendorquote15").value;
    var vendorquote16 = document.getElementById("vendorquote16").value;
    var vendorquote17 = document.getElementById("vendorquote17").value;
    var vendorquote18 = document.getElementById("vendorquote18").value;
    var vendorquote19 = document.getElementById("vendorquote19").value;
    var vendorquote20 = document.getElementById("vendorquote20").value;
    var vendorquote21 = document.getElementById("vendorquote21").value;
    var vendorquote22 = document.getElementById("vendorquote22").value;
    var vendorquote23 = document.getElementById("vendorquote23").value;
    var vendorquote24 = document.getElementById("vendorquote24").value;
    var vendorquote25 = document.getElementById("vendorquote25").value;
    var vendorquote26 = document.getElementById("vendorquote26").value;
    var vendorquote27 = document.getElementById("vendorquote27").value;
    var vendorquote28 = document.getElementById("vendorquote28").value;
    var vendorquote29 = document.getElementById("vendorquote29").value;
    var vendorquote30 = document.getElementById("vendorquote30").value;

    // Validate specific fields
    if (
      clientname.trim() === "" ||
      companyname.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === ""
    ) {
      var requiredFields = []; // Array to hold names of required fields

      // Check each required field and add its name to the array if it's empty
      if (clientname.trim() === "") {
        requiredFields.push("Client Name");
      }
      if (companyname.trim() === "") {
        requiredFields.push("Company Name");
      }
      if (email.trim() === "") {
        requiredFields.push("Email");
      }
      if (phone.trim() === "") {
        requiredFields.push("Phone Number");
      }

      // Create the alert message based on the required fields array
      var alertMessage =
        "Please fill in the following required fields: \n-     " +
        requiredFields.join("\n, ");

      // Display the alert with the specific required fields
      /* alert(alertMessage); */
      toast.error(alertMessage);
      return; // Exit the function if validation fails
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://roadrescueconnect.com/rrc/save_leads.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText); // Parse JSON response
        if (response.leadId) {
          // Success message
          toast.promise(resolveAfter3Sec, {
            pending: response.message,
            success: response.message,
            error: response.message,
          });

          // Redirect to the lead details page after a delay
          setTimeout(function () {
            var url = "/rrc/Leads?leadId=" + response.leadId;
            window.location.href = url;
          }, 1500); // 3 seconds delay
        } else {
          // Handle case where there's no leadId
          alert("Lead saved, but unable to retrieve the lead ID.");
        }
      } else {
        console.error(xhr.responseText);
        alert("An error occurred while saving data. Please try again.");
      }
    };
    xhr.onerror = function () {
      console.error(xhr.responseText);
      alert("An error occurred while saving data. Please try again.");
    };

    // Data to be sent in the request
    var data = JSON.stringify({
      clientname: clientname,
      companyname: companyname,
      phone: phone,
      ext: ext,
      email: email,
      address: address,
      unit: unit,
      city: city,
      region: region,
      postalcode: postalcode,
      country: country,
      servicearea: servicearea,
      jobtype: jobtype,
      jobsource: jobsource,
      jobdescription: jobdescription,
      timepickerStart: timepickerStart,
      datepicker: datepicker,
      datepickerEnd: datepickerEnd,
      timepickerEnd: timepickerEnd,
      specialjobs: specialjobs,
      highprofitjobs: highprofitjobs,
      cancellationfee: cancellationfee,
      cancellationreason: cancellationreason,
      year: year,
      make: make,
      model: model,
      agentname: agentname,
      inscompname: inscompname,
      insagentname: insagentname,
      insponumber: insponumber,
      insGOA: insGOA,
      insEMAIL: insEMAIL,
      persongivequote: persongivequote,
      pricequote: pricequote,
      eta: eta,
      transactionnumber: transactionnumber,
      transactiongrandtotal: transactiongrandtotal,
      dispatchername: dispatchername,
      dispatchedby: dispatchedby,
      vendorquote1: vendorquote1,
      vendorquote2: vendorquote2,
      vendorquote3: vendorquote3,
      vendorquote4: vendorquote4,
      vendorquote5: vendorquote5,
      vendorquote6: vendorquote6,
      vendorquote7: vendorquote7,
      vendorquote8: vendorquote8,
      vendorquote9: vendorquote9,
      vendorquote10: vendorquote10,
      vendorquote11: vendorquote11,
      vendorquote12: vendorquote12,
      vendorquote13: vendorquote13,
      vendorquote14: vendorquote14,
      vendorquote15: vendorquote15,
      vendorquote16: vendorquote16,
      vendorquote17: vendorquote17,
      vendorquote18: vendorquote18,
      vendorquote19: vendorquote19,
      vendorquote20: vendorquote20,
      vendorquote21: vendorquote21,
      vendorquote22: vendorquote22,
      vendorquote23: vendorquote23,
      vendorquote24: vendorquote24,
      vendorquote25: vendorquote25,
      vendorquote26: vendorquote26,
      vendorquote27: vendorquote27,
      vendorquote28: vendorquote28,
      vendorquote29: vendorquote29,
      vendorquote30: vendorquote30,
    });
    xhr.send(data);
  }

  // Function to fetch last inserted ID
  function fetchLastInsertedId() {
    return new Promise((resolve, reject) => {
      fetch("https://roadrescueconnect.com/rrc/fetch_leadreport.php")
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const latestId = data[data.length - 1].id;
            setLastInsertedId(latestId);
            resolve(latestId);
          } else {
            resolve(null); // Resolve with null if no data is returned
          }
        })
        .catch((error) => {
          console.error("Error fetching last inserted ID:", error);
          reject(error);
        });
    });
  }

  return (
    <div>
      <header className="header" id="header">
        <div className="alert">
          <span className="alertmsg" id="alertmsg"></span>
        </div>
        <DarkMode />
        <span className="nav_logo-name">New Lead</span>
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
                <div
                  className={`dropdown ${isActive ? "active" : ""}`}
                  id="myDropdown"
                ></div>
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
        <div className="box1">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Client Details</strong>
          </p>
          <div className="input-container">
            <input
              className="clientname"
              type="text"
              id="clientname"
              name="clientname"
              value={formData.clientname}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="clientname">Client name:</label>
          </div>
          <div className="input-container">
            <input
              className="companyname"
              type="text"
              id="companyname"
              name="companyname"
              value={formData.companyname}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="companyname">Company name:</label>
          </div>
          <div className="input-container">
            <input
              className="phone"
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="phone">Phone:</label>
          </div>
          <div className="input-container">
            <input
              className="ext"
              type="text"
              id="ext"
              name="ext"
              value={formData.ext}
              onChange={handleInputChange}
              maxLength="5"
            />
            <label htmlFor="ext">Ext:</label>
          </div>
          <div className="input-container">
            <input
              className="email"
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <h1></h1>
          </div>
          <strong
            style={{
              fontSize: "20px",
            }}
          >
            Actions:{" "}
          </strong>
          <button
            id="createLeadBtn"
            style={{
              borderRadius: "15px",
              backgroundColor: "rgb(255, 217, 0)",
              fontWeight: "bold",
            }}
            className="createlead"
            onClick={saveDataLead}
            disabled={isButtonDisabled} // Disables the button if isButtonDisabled is true
          >
            Create Lead
          </button>
        </div>

        <div className="box2">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Service Location</strong>
          </p>
          <div className="input-container">
            <input
              className="textbox"
              type="text"
              id="address"
              name="address"
              required
            />
            <label htmlFor="address">Address:</label>
          </div>
          <div className="input-container">
            <input
              className="textbox"
              type="text"
              id="unit"
              name="unit"
              required
            />
            <label htmlFor="unit">Unit:</label>
          </div>
          <div className="input-container">
            <input
              className="textbox"
              type="text"
              id="city"
              name="city"
              required
            />
            <label htmlFor="city">City:</label>
          </div>
          <div className="input-container">
            <input
              className="textbox"
              type="text"
              id="region"
              name="region"
              required
            />
            <label htmlFor="region">Region:</label>
          </div>
          <div className="input-container">
            <input
              className="textbox"
              type="text"
              id="postalcode"
              name="postalcode"
              required
            />
            <label htmlFor="postalcode">Postal Code:</label>
          </div>
          <div className="dropdown4">
            <input
              type="text"
              className="dropdown4-input"
              name=" country"
              id="country"
              placeholder="Country"
              readOnly
            />
            <ul className="dropdown4-list">
              <li>United States</li>
              <li>Canada</li>
              <li>Other</li>
            </ul>
          </div>
          <div className="dropdown5">
            <input
              type="text"
              className="dropdown5-input"
              name=" servicearea"
              id="servicearea"
              placeholder="Service Area"
              readOnly
            />
            <ul className="dropdown5-list">
              <li>New York, NY</li>
              <li>Los Angeles, CA</li>
              <li>Chicago, IL</li>
              <li>Houston, TX</li>
              <li>Phoenix, AZ</li>
              <li>Philadelphia, PA</li>
              <li>San Antonio, TX</li>
              <li>San Diego, CA</li>
              <li>Dallas, TX</li>
              <li>San Jose, CA</li>
              <li>Austin, TX</li>
              <li>Jacksonville, FL</li>
              <li>Fort Worth, TX</li>
              <li>Columbus, OH</li>
              <li>Charlotte, NC</li>
              <li>San Francisco, CA</li>
              <li>Indianapolis, IN</li>
              <li>Seattle, WA</li>
              <li>Denver, CO</li>
              <li>Other</li>
            </ul>
          </div>
        </div>
        <div className="box3">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Job Details</strong>
          </p>
          <div className="dropdown2">
            <input
              type="text"
              className="dropdown2-input"
              name=" jobtype"
              id="jobtype"
              placeholder="Job Type"
              readOnly
            />
            <ul className="dropdown2-list">
              <li>Tow</li>
              <li>Jump</li>
              <li>Tire Change</li>
              <li>Other</li>
            </ul>
          </div>
          <div className="dropdown3">
            <input
              type="text"
              className="dropdown3-input"
              name=" jobsource"
              id="jobsource"
              placeholder="Job Source"
              readOnly
            />
            <ul className="dropdown3-list">
              <li>Google</li>
              <li>Yelp</li>
              <li>Facebook</li>
              <li>Home Advisor</li>
              <li>Other</li>
            </ul>
          </div>
          <h1></h1>
          <textarea
            className="jobdescription"
            name="jobdescription"
            id="jobdescription"
            cols="50"
            rows="10"
            placeholder="Please put the data later after creating the lead."
            style={{
              fontFamily: "monospace",
              whiteSpace: "pre-wrap", // Preserve spaces and newlines
              resize: "both", // Allow both vertical and horizontal resizing
            }}
            disabled // Make the textarea non-editable
          ></textarea>
        </div>
        <div className="box4">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Scheduled</strong>
          </p>
          <h1 style={{ fontSize: "15px" }}>
            <strong>Starts</strong>
          </h1>
          <input type="text" id="datepicker" onClick={showDatePicker} />
          <input
            type="time"
            id="timepickerStart"
            name="timepickerStart"
            required
          />
          <h1 style={{ fontSize: "15px" }}>
            <strong>Ends</strong>
          </h1>
          <input type="text" id="datepickerEnd" onClick={showDatePickerEnd} />
          <input type="time" id="timepickerEnd" name="timepickerEnd" required />
          <h1></h1>
          <input
            type="checkbox"
            id="allDayEventCheckbox"
            name="allDayEventCheckbox"
          />
          <label htmlFor="allDayEventCheckbox">All day event:</label>
        </div>
        <div className="box5">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Extra Info</strong>
          </p>
          <div className="input-container">
            <input
              className="specialjobs"
              type="text"
              id="specialjobs"
              name="specialjobs"
              required
            />
            <label htmlFor="specialjobs">Special Jobs:</label>
          </div>
          <div className="input-container">
            <input
              className="highprofitjobs"
              type="text"
              id="highprofitjobs"
              name="highprofitjobs"
              required
            />
            <label htmlFor="highprofitjobs">High Profit Jobs:</label>
          </div>
          <div className="input-container">
            <input
              className="cancellationfee"
              type="text"
              id="cancellationfee"
              name="cancellationfee"
              required
            />
            <label htmlFor="cancellationfee">Cancellation Fee:</label>
          </div>
          <h1></h1>
          <textarea
            className="cancellationreason"
            id="cancellationreason"
            name="cancellationreason"
            placeholder="Cancellation Reason"
            cols="50"
            rows="10"
          ></textarea>
        </div>
        <div className="box6">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Vehicle Info</strong>
          </p>
          <div className="input-container">
            <input
              className="year"
              type="text"
              id="year"
              name="year"
              required
            />
            <label htmlFor="year">Year:</label>
          </div>
          <div className="input-container">
            <input
              className="make"
              type="text"
              id="make"
              name="make"
              required
            />
            <label htmlFor="make">Make:</label>
          </div>
          <div className="input-container">
            <input
              className="model"
              type="text"
              id="model"
              name="model"
              required
            />
            <label htmlFor="model">Model:</label>
          </div>
        </div>
        <div className="box7">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Agent Information</strong>
          </p>
          <div className="input-container">
            <input
              className="agentname"
              type="text"
              id="agentname"
              name="agentname"
              required
            />
            <label htmlFor="agentname">Agent Name:</label>
          </div>
          <div className="input-container">
            <input
              className="inscompname"
              type="text"
              id="inscompname"
              name="inscompname"
              required
            />
            <label htmlFor="inscompname">Insurance Company Name:</label>
          </div>
          <div className="input-container">
            <input
              className="insagentname"
              type="text"
              id="insagentname"
              name="insagentname"
              required
            />
            <label htmlFor="insagentname">Insurance Agent Name:</label>
          </div>
          <div className="input-container">
            <input
              className="insponumber"
              type="text"
              id="insponumber"
              name="insponumber"
              required
            />
            <label htmlFor="insponumber">Insurance PO Number:</label>
          </div>
          <div className="input-container">
            <input
              className="insGOA"
              type="text"
              id="insGOA"
              name="insGOA"
              required
            />
            <label htmlFor="insGOA">Insurance GOA:</label>
          </div>
          <div className="input-container">
            <input
              className="insEMAIL"
              type="text"
              id="insEMAIL"
              name="insEMAIL"
              required
            />
            <label htmlFor="insEMAIL">Insurance Email received:</label>
          </div>
          <div className="input-container">
            <input
              className="persongivequote"
              type="text"
              id="persongivequote"
              name="persongivequote"
              required
            />
            <label htmlFor="persongivequote">Person gave the Quote:</label>
          </div>
          <div className="input-container">
            <input
              className="pricequote"
              type="text"
              id="pricequote"
              name="pricequote"
              required
            />
            <label htmlFor="pricequote">Price quoted & Total amount:</label>
          </div>
          <div className="input-container">
            <input className="eta" type="text" id="eta" name="eta" required />
            <label htmlFor="eta">ETA:</label>
          </div>
        </div>
        <div className="box8">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Managers Section</strong>
          </p>
          <div className="input-container">
            <input
              className="transactionnumber"
              type="text"
              id="transactionnumber"
              name="transactionnumber"
              required
            />
            <label htmlFor="transactionnumber">Transaction #:</label>
          </div>
          <div className="input-container">
            <input
              className="transactiongrandtotal"
              type="text"
              id="transactiongrandtotal"
              name="transactiongrandtotal"
              required
            />
            <label htmlFor="transactiongrandtotal">Grand Total:</label>
          </div>
        </div>
        <div className="box9">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Dispatcher Section</strong>
          </p>
          <div className="input-container">
            <input
              className="dispatchername"
              type="text"
              id="dispatchername"
              name="dispatchername"
              required
            />
            <label htmlFor="dispatchername">Dispatcher Name:</label>
          </div>
          <div className="input-container">
            <input
              className="dispatchedby"
              type="text"
              id="dispatchedby"
              name="dispatchedby"
              required
            />
            <label htmlFor="dispatchedby">Dispatched By:</label>
          </div>
        </div>
        <div className="box10">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Vendor Quotes</strong>
          </p>
          <input
            className="vendorquote1"
            type="text"
            id="vendorquote1"
            name="vendorquote1"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote2"
            type="text"
            id="vendorquote2"
            name="vendorquote2"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote3"
            type="text"
            id="vendorquote3"
            name="vendorquote3"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote4"
            type="text"
            id="vendorquote4"
            name="vendorquote4"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote5"
            type="text"
            id="vendorquote5"
            name="vendorquote5"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote6"
            type="text"
            id="vendorquote6"
            name="vendorquote6"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote7"
            type="text"
            id="vendorquote7"
            name="vendorquote7"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote8"
            type="text"
            id="vendorquote8"
            name="vendorquote8"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote9"
            type="text"
            id="vendorquote9"
            name="vendorquote9"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote10"
            type="text"
            id="vendorquote10"
            name="vendorquote10"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote11"
            type="text"
            id="vendorquote11"
            name="vendorquote11"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote12"
            type="text"
            id="vendorquote12"
            name="vendorquote12"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote13"
            type="text"
            id="vendorquote13"
            name="vendorquote13"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote14"
            type="text"
            id="vendorquote14"
            name="vendorquote14"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote15"
            type="text"
            id="vendorquote15"
            name="vendorquote15"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote16"
            type="text"
            id="vendorquote16"
            name="vendorquote16"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote17"
            type="text"
            id="vendorquote17"
            name="vendorquote17"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote18"
            type="text"
            id="vendorquote18"
            name="vendorquote18"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote19"
            type="text"
            id="vendorquote19"
            name="vendorquote19"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote20"
            type="text"
            id="vendorquote20"
            name="vendorquote20"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote21"
            type="text"
            id="vendorquote21"
            name="vendorquote21"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote22"
            type="text"
            id="vendorquote22"
            name="vendorquote22"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote23"
            type="text"
            id="vendorquote23"
            name="vendorquote23"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote24"
            type="text"
            id="vendorquote24"
            name="vendorquote24"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote25"
            type="text"
            id="vendorquote25"
            name="vendorquote25"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote26"
            type="text"
            id="vendorquote26"
            name="vendorquote26"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote27"
            type="text"
            id="vendorquote27"
            name="vendorquote27"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote28"
            type="text"
            id="vendorquote28"
            name="vendorquote28"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote29"
            type="text"
            id="vendorquote29"
            name="vendorquote29"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote30"
            type="text"
            id="vendorquote30"
            name="vendorquote30"
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default NewLead;
