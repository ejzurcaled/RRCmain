import React, { useEffect, useState } from "react";
import UseContainerVisibility from "../components/UseContainerVisibility.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import DarkMode from "../components/DarkMode.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTags,
  faSave,
  faStickyNote,
  faExclamationTriangle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Leads() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [leadData, setLeadData] = useState(null);
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
  const [isActive, setIsActive] = useState(false);
  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    initializeDropdown(2);
    initializeDropdown(3);
    initializeDropdown(4);
    initializeDropdown(5);
    initializeDropdown(6);
  }, []);

  UseContainerVisibility(
    "notesContainer",
    ["showButton1", "showButton"],
    "closeButton"
  );

  useEffect(() => {
    // Fetch lead data based on leadidnumberhidden2
    const leadId = document.getElementById("leadidnumberhidden2").value;
    fetchLeadData(leadId);
  }, []);

  const fetchLeadData = async (leadId) => {
    try {
      const response = await fetch(`http://localhost:8081/user/${leadId}`);
      if (response.ok) {
        const data = await response.json();
        setLeadData(data);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  function initializeDropdown(dropdownNumber) {
    const dropdownInput = document.querySelector(
      `.dropdown${dropdownNumber}-input`
    );
    const dropdownList = document.querySelector(
      `.dropdown${dropdownNumber}-list`
    );

    if (dropdownInput && dropdownList) {
      dropdownInput.addEventListener("click", () => {
        dropdownList.style.display =
          dropdownList.style.display === "block" ? "none" : "block";
      });

      dropdownList.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
          dropdownInput.value = e.target.textContent;
          dropdownList.style.display = "none";
        }
      });

      document.addEventListener("click", (e) => {
        if (
          !dropdownInput.contains(e.target) &&
          !dropdownList.contains(e.target)
        ) {
          dropdownList.style.display = "none";
        }
      });
    }
  }

  function saveData() {
    const data = {
      status: document.getElementById("status").value,
      leadidnumberhidden: document.getElementById("leadidnumberhidden").value,
      clientname: document.getElementById("clientname").value,
      companyname: document.getElementById("companyname").value,
      phone: document.getElementById("phone").value,
      ext: document.getElementById("ext").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      unit: document.getElementById("unit").value,
      city: document.getElementById("city").value,
      region: document.getElementById("region").value,
      postalcode: document.getElementById("postalcode").value,
      country: document.getElementById("country").value,
      servicearea: document.getElementById("servicearea").value,
      jobtype: document.getElementById("jobtype").value,
      jobsource: document.getElementById("jobsource").value,
      jobdescription: document.getElementById("jobdescription").value,
      timepickerStart: document.getElementById("timepickerStart").value,
      datepicker: document.getElementById("datepicker").value,
      datepickerEnd: document.getElementById("datepickerEnd").value,
      timepickerEnd: document.getElementById("timepickerEnd").value,
      specialjobs: document.getElementById("specialjobs").value,
      highprofitjobs: document.getElementById("highprofitjobs").value,
      cancellationfee: document.getElementById("cancellationfee").value,
      cancellationreason: document.getElementById("cancellationreason").value,
      year: document.getElementById("year").value,
      make: document.getElementById("make").value,
      model: document.getElementById("model").value,
      agentname: document.getElementById("agentname").value,
      inscompname: document.getElementById("inscompname").value,
      insagentname: document.getElementById("insagentname").value,
      insponumber: document.getElementById("insponumber").value,
      insGOA: document.getElementById("insGOA").value,
      insEMAIL: document.getElementById("insEMAIL").value,
      persongivequote: document.getElementById("persongivequote").value,
      pricequote: document.getElementById("pricequote").value,
      eta: document.getElementById("eta").value,
      transactionnumber: document.getElementById("transactionnumber").value,
      transactiongrandtotal: document.getElementById("transactiongrandtotal")
        .value,
      dispatchername: document.getElementById("dispatchername").value,
      dispatchedby: document.getElementById("dispatchedby").value,
      vendorquote1: document.getElementById("vendorquote1").value,
      vendorquote2: document.getElementById("vendorquote2").value,
      vendorquote3: document.getElementById("vendorquote3").value,
      vendorquote4: document.getElementById("vendorquote4").value,
      vendorquote5: document.getElementById("vendorquote5").value,
      vendorquote6: document.getElementById("vendorquote6").value,
      vendorquote7: document.getElementById("vendorquote7").value,
      vendorquote8: document.getElementById("vendorquote8").value,
      vendorquote9: document.getElementById("vendorquote9").value,
      vendorquote10: document.getElementById("vendorquote10").value,
      vendorquote11: document.getElementById("vendorquote11").value,
      vendorquote12: document.getElementById("vendorquote12").value,
      vendorquote13: document.getElementById("vendorquote13").value,
      vendorquote14: document.getElementById("vendorquote14").value,
      vendorquote15: document.getElementById("vendorquote15").value,
      vendorquote16: document.getElementById("vendorquote16").value,
      vendorquote17: document.getElementById("vendorquote17").value,
      vendorquote18: document.getElementById("vendorquote18").value,
      vendorquote19: document.getElementById("vendorquote19").value,
      vendorquote20: document.getElementById("vendorquote20").value,
      vendorquote21: document.getElementById("vendorquote21").value,
      vendorquote22: document.getElementById("vendorquote22").value,
      vendorquote23: document.getElementById("vendorquote23").value,
      vendorquote24: document.getElementById("vendorquote24").value,
      vendorquote25: document.getElementById("vendorquote25").value,
      vendorquote26: document.getElementById("vendorquote26").value,
      vendorquote27: document.getElementById("vendorquote27").value,
      vendorquote28: document.getElementById("vendorquote28").value,
      vendorquote29: document.getElementById("vendorquote29").value,
      vendorquote30: document.getElementById("vendorquote30").value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8081/updatelead", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText); // Parse JSON response
          const leadId = response.leadId; // Retrieve leadId from response
          const {
            status,
            clientname,
            companyname,
            phone,
            ext,
            email,
            address,
            unit,
            city,
            region,
            postalcode,
            country,
            servicearea,
            jobtype,
            jobsource,
            jobdescription,
            timepickerStart,
            datepicker,
            datepickerEnd,
            timepickerEnd,
            specialjobs,
            highprofitjobs,
            cancellationfee,
            cancellationreason,
            year,
            make,
            model,
            agentname,
            inscompname,
            insagentname,
            insponumber,
            insGOA,
            insEMAIL,
            persongivequote,
            pricequote,
            eta,
            transactionnumber,
            transactiongrandtotal,
            dispatchername,
            dispatchedby,
            vendorquote1,
            vendorquote2,
            vendorquote3,
            vendorquote4,
            vendorquote5,
            vendorquote6,
            vendorquote7,
            vendorquote8,
            vendorquote9,
            vendorquote10,
            vendorquote11,
            vendorquote12,
            vendorquote13,
            vendorquote14,
            vendorquote15,
            vendorquote16,
            vendorquote17,
            vendorquote18,
            vendorquote19,
            vendorquote20,
            vendorquote21,
            vendorquote22,
            vendorquote23,
            vendorquote24,
            vendorquote25,
            vendorquote26,
            vendorquote27,
            vendorquote28,
            vendorquote29,
            vendorquote30,
          } = data;
          const redirectUrl = `/rrc/Leads?leadId=${encodeURIComponent(
            leadId
          )}&status=${encodeURIComponent(
            status
          )}&clientname=${encodeURIComponent(
            clientname
          )}&companyname=${encodeURIComponent(
            companyname
          )}&phone=${encodeURIComponent(phone)}&ext=${encodeURIComponent(
            ext
          )}&email=${encodeURIComponent(email)}&address=${encodeURIComponent(
            address
          )}&unit=${encodeURIComponent(unit)}&city=${encodeURIComponent(
            city
          )}&region=${encodeURIComponent(
            region
          )}&postalcode=${encodeURIComponent(
            postalcode
          )}&country=${encodeURIComponent(
            country
          )}&servicearea=${encodeURIComponent(
            servicearea
          )}&jobtype=${encodeURIComponent(
            jobtype
          )}&jobsource=${encodeURIComponent(
            jobsource
          )}&jobdescription=${encodeURIComponent(
            jobdescription
          )}&timepickerStart=${encodeURIComponent(
            timepickerStart
          )}&datepicker=${encodeURIComponent(
            datepicker
          )}&datepickerEnd=${encodeURIComponent(
            datepickerEnd
          )}&timepickerEnd=${encodeURIComponent(
            timepickerEnd
          )}&specialjobs=${encodeURIComponent(
            specialjobs
          )}&highprofitjobs=${encodeURIComponent(
            highprofitjobs
          )}&cancellationfee=${encodeURIComponent(
            cancellationfee
          )}&cancellationreason=${encodeURIComponent(
            cancellationreason
          )}&year=${encodeURIComponent(year)}&make=${encodeURIComponent(
            make
          )}&model=${encodeURIComponent(model)}&agentname=${encodeURIComponent(
            agentname
          )}&inscompname=${encodeURIComponent(
            inscompname
          )}&insagentname=${encodeURIComponent(
            insagentname
          )}&insponumber=${encodeURIComponent(
            insponumber
          )}&insGOA=${encodeURIComponent(insGOA)}&insEMAIL=${encodeURIComponent(
            insEMAIL
          )}&persongivequote=${encodeURIComponent(
            persongivequote
          )}&pricequote=${encodeURIComponent(
            pricequote
          )}&eta=${encodeURIComponent(
            eta
          )}&transactionnumber=${encodeURIComponent(
            transactionnumber
          )}&transactiongrandtotal=${encodeURIComponent(
            transactiongrandtotal
          )}&dispatchername=${encodeURIComponent(
            dispatchername
          )}&dispatchedby=${encodeURIComponent(
            dispatchedby
          )}&vendorquote1=${encodeURIComponent(
            vendorquote1
          )}&vendorquote2=${encodeURIComponent(
            vendorquote2
          )}&vendorquote3=${encodeURIComponent(
            vendorquote3
          )}&vendorquote4=${encodeURIComponent(
            vendorquote4
          )}&vendorquote5=${encodeURIComponent(
            vendorquote5
          )}&vendorquote6=${encodeURIComponent(
            vendorquote6
          )}&vendorquote7=${encodeURIComponent(
            vendorquote7
          )}&vendorquote8=${encodeURIComponent(
            vendorquote8
          )}&vendorquote9=${encodeURIComponent(
            vendorquote9
          )}&vendorquote10=${encodeURIComponent(
            vendorquote10
          )}&vendorquote11=${encodeURIComponent(
            vendorquote11
          )}&vendorquote12=${encodeURIComponent(
            vendorquote12
          )}&vendorquote13=${encodeURIComponent(
            vendorquote13
          )}&vendorquote14=${encodeURIComponent(
            vendorquote14
          )}&vendorquote15=${encodeURIComponent(
            vendorquote15
          )}&vendorquote16=${encodeURIComponent(
            vendorquote16
          )}&vendorquote17=${encodeURIComponent(
            vendorquote17
          )}&vendorquote18=${encodeURIComponent(
            vendorquote18
          )}&vendorquote19=${encodeURIComponent(
            vendorquote19
          )}&vendorquote20=${encodeURIComponent(
            vendorquote20
          )}&vendorquote21=${encodeURIComponent(
            vendorquote21
          )}&vendorquote22=${encodeURIComponent(
            vendorquote22
          )}&vendorquote23=${encodeURIComponent(
            vendorquote23
          )}&vendorquote24=${encodeURIComponent(
            vendorquote24
          )}&vendorquote25=${encodeURIComponent(
            vendorquote25
          )}&vendorquote26=${encodeURIComponent(
            vendorquote26
          )}&vendorquote27=${encodeURIComponent(
            vendorquote27
          )}&vendorquote28=${encodeURIComponent(
            vendorquote28
          )}&vendorquote29=${encodeURIComponent(
            vendorquote29
          )}&vendorquote30=${encodeURIComponent(vendorquote30)}`;
          setIsButtonDisabled(true);
          /* document.getElementById("alertmsg").innerHTML = response.message; */
          toast.promise(resolveAfter3Sec, {
            pending: response.message,
            success: response.message,
            error: response.message,
          });
          // Add a delay before redirecting
          setTimeout(function () {
            window.location.href = redirectUrl;
          }, 800); // 2000 milliseconds (2 seconds) delay
        } else {
          console.error("Error occurred while updating lead.");
          alert("An error occurred while updating lead. Please try again.");
        }
      }
    };
    xhr.send(JSON.stringify(data));
  }

  return (
    <div>
      <header className="header" id="header">
        <input
          type="show"
          id="leadidnumberhidden2"
          name="id"
          readOnly
          value={1}
        />
        <button
          id="Back1Level"
          style={{
            borderRadius: "30px",
            backgroundColor: "rgb(255, 217, 0)",
          }}
          className="Back1Level"
          onClick={() => (window.location.href = "/rrc/Leadreports")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <div className="alert">
          <span className="alertmsg" id="alertmsg"></span>
        </div>
        <DarkMode />
        <span className="nav_logo-name">Leads</span>
        <div>
          <img src="/rrc/rrc-logo.png" alt="Logo" className="logo" id="logo" />
        </div>
      </header>
      <div className="l-navbar" id="nav-bar">
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
        <div className="box0">
          <div>
            <div>
              {leadData && (
                <>
                  {/* Populate input fields with leadData */}
                  <input
                    type="text"
                    id="leadidnumber"
                    name="leadidnumber"
                    className="leadidnumber"
                    value={leadData && leadData.id ? leadData.id : ""}
                    readOnly
                  />
                  {/* Populate other input fields similarly */}
                </>
              )}
            </div>
            <div className="dropdown6">
              <span style={{ fontWeight: "bold" }}>
                <FontAwesomeIcon icon={faExclamationTriangle} /> Status:{" "}
              </span>
              <input
                type="text"
                className="dropdown6-input"
                name="status"
                id="status"
                placeholder="Status"
                value={leadData && leadData.status ? leadData.status : ""}
                readOnly
              />
              <ul className="dropdown6-list">
                <li>New</li>
                <li>Deleted</li>
                <li>Scheduled</li>
                <li>In-Progress</li>
                <li>Pending</li>
                <li>Approved</li>
              </ul>
              <span style={{ fontWeight: "bold" }}>
                <div>
                  <FontAwesomeIcon icon={faTags} /> Tags:
                </div>
                <span id="tagList" className="tagList"></span>
              </span>
              <h1></h1>
              <div>
                <span>
                  <strong>Actions: </strong>
                </span>
                <button
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "rgb(255, 217, 0)",
                  }}
                  type="submit"
                  id="opensavedtags1"
                  className="opensavedtags1"
                >
                  <FontAwesomeIcon icon={faTags} className="opensavedtags1" />
                </button>

                <button
                  id="showButton"
                  className="showButton"
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "rgb(255, 217, 0)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faStickyNote}
                    id="showButton1"
                    className="showButton1"
                  />
                </button>
                <button
                  id="createLeadBtn"
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "rgb(255, 217, 0)",
                  }}
                  className="createlead"
                  onClick={saveData}
                  disabled={isButtonDisabled} // Disables the button if isButtonDisabled is true
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
              </div>
            </div>
          </div>

          <div id="tagsmodal" className="modal">
            <div className="tagsmodal-content" id="tagsmodal-content">
              <span className="close1" id="close1">
                &times;
              </span>
              <div className="admin-tags">
                <input
                  type="text"
                  id="tagInput"
                  name="tagInput"
                  className="tagInput"
                  placeholder="Enter Tags here.."
                  required
                />
                <button id="buttonaddtags">Add</button>
                <span>Tags Color:</span>
                <input
                  className="colorInput"
                  type="color"
                  id="colorInput"
                  value="#ff0000"
                />
              </div>
              <h1></h1>
              <input
                type="text"
                id="searchtags"
                className="searchtags"
                placeholder="Search tags here.."
              />
              <h1></h1>
              <span>
                Tags available:
                <div className="savedtagswall">
                  <ul id="savedTags"></ul>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="box1">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Client Details</strong>
          </p>
          <div className="input-container">
            <input
              className="firstname"
              type="text"
              id="firstname"
              name="firstname"
              value={leadData && leadData.firstname ? leadData.firstname : ""}
              required
            />
            <label htmlFor="clientname">First name:</label>
          </div>
          <div className="input-container">
            <input
              className="lastname"
              type="text"
              id="lastname"
              name="lastname"
              value={leadData && leadData.lastname ? leadData.lastname : ""}
              required
            />
            <label htmlFor="companyname">Last name:</label>
          </div>
          <div className="input-container">
            <input
              className="contact"
              type="text"
              id="contact"
              name="contact"
              value={leadData && leadData.contact ? leadData.contact : ""}
              required
            />
            <label htmlFor="phone">Phone:</label>
          </div>
          <div className="input-container">
            <input
              className="email"
              type="text"
              id="email"
              name="email"
              value={leadData && leadData.email ? leadData.email : ""}
            />
            <label htmlFor="username">Email:</label>
          </div>
          <div className="input-container">
            <input
              className="username"
              type="text"
              id="username"
              name="username"
              value={leadData && leadData.username ? leadData.username : ""}
              required
            />
            <label htmlFor="email">Username:</label>
          </div>
          <div className="input-container">
            <input
              className="password"
              type="text"
              id="password"
              name="password"
              value={leadData && leadData.password ? leadData.password : ""}
              required
            />
            <label htmlFor="password">Password:</label>
          </div>
        </div>
      </div>
      <div className="container-notes1" id="notesContainer">
        <button className="close-button" id="closeButton">
          X
        </button>
        <span style={{ fontWeight: "bold" }}>
          <i className="fas fa-sticky-note"></i> Notes:
          <div id="notes">
            <textarea
              id="noteInput11"
              placeholder="Enter your note here..."
            ></textarea>
            <button id="notes-button">Save Note</button>
          </div>
          <div id="container-notes">
            <div id="confirmationDialog" style={{ display: "none" }}>
              <p>Are you sure you want to delete this note?</p>
              <div className="button-container">
                <button id="confirmDelete">Yes</button>
                <button id="cancelDelete">No</button>
              </div>
            </div>

            <div id="noteList"></div>
            <div id="notes1" className="notes1" name="notes1"></div>
          </div>
        </span>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Leads;
