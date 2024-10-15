import React, { useEffect, useState } from "react";
import $ from "jquery"; // Import jQuery
import "@popperjs/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import DarkMode from "../components/DarkMode.js";
import Pikaday from "pikaday";
import { Bounce, ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/style.css"; // Import your CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faStickyNote,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ReactDOMServer from "react-dom/server";

import UseContainerVisibility from "../components/UseContainerVisibility";

function Leadreports() {
  const [isActive, setIsActive] = useState(false);
  const [notes, setNotes] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const styles = {
    background: "var(--body_background)",
    color: "var(--body_color)",
    borderRadius: "15px",
  };

  const stylescards = {
    border: "1px solid black",
  };

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  UseContainerVisibility("notesContainer", ["notes1-openmodal"], "closeButton");

  useEffect(() => {
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);

      // Get the day of the week, month, day, year, hour, and minute
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
      const dayOfWeek = days[date.getDay()];
      const month = months[date.getMonth()];
      const day = date.getDate();
      let year = date.getFullYear();
      let hour = date.getHours();
      const minute = date.getMinutes();
      const ampm = hour >= 12 ? "PM" : "AM";

      // Adjust hour to 12-hour format
      hour = hour % 12;
      hour = hour ? hour : 12;

      // Add leading zero to minute if necessary
      const formattedMinute = minute < 10 ? "0" + minute : minute;

      // Construct formatted timestamp string
      const formattedTimestamp = `${dayOfWeek} ${month} ${day} ${year} ${hour}:${formattedMinute} ${ampm}`;

      return formattedTimestamp;
    };

    // Check if DataTable instance exists
    let leadsTable = $("#leadsTable").DataTable({
      // Add placeholder for search input
      language: {
        searchPlaceholder: "Search here..",
      },
    });

    if (!leadsTable || !leadsTable.rows().any()) {
      // If DataTable instance doesn't exist or has no rows, initialize DataTable
      $("#leadsTable").DataTable();
    }

    // Initialize counts
    const counts = {
      All: 0,
      New: 0,
      Deleted: 0,
      Scheduled: 0,
      "In-Progress": 0,
      Pending: 0,
      Approved: 0,
    };

    // Fetch data using Fetch API
    const fetchData = async () => {
      const counts = {
        All: 0,
        New: 0,
        Deleted: 0,
        Scheduled: 0,
        // Add other statuses you want to count
      };

      try {
        const response = await fetch(
          "https://roadrescueconnect.com/rrc/fetch_leadreport.php"
        );
        const data = await response.json();
        let table = $("#leadsTable").DataTable();

        // Clear existing rows
        table.clear().draw();

        // Populate table with new data and update counts
        data.forEach((lead) => {
          table.row
            .add([
              `<button class="edit-button">${ReactDOMServer.renderToString(
                <FontAwesomeIcon icon={faEdit} />
              )}</button>
         <button class="notes1-button">${ReactDOMServer.renderToString(
           <FontAwesomeIcon icon={faStickyNote} />
         )}</button>
         <button class="delete-button" data-id="${
           lead.id
         }">${ReactDOMServer.renderToString(
                <FontAwesomeIcon icon={faTrash} />
              )}</button>`,
              lead.id,
              formatTimestamp(lead.timestamp),
              lead.status,
              lead.clientname,
              lead.companyname,
              lead.phone,
              lead.ext,
              lead.email,
              lead.address,
              lead.unit,
              lead.city,
              lead.region,
              lead.postalcode,
              lead.country,
              lead.servicearea,
              lead.jobtype,
              lead.jobsource,
              lead.jobdescription,
              lead.timepickerStart,
              lead.timepickerEnd,
              lead.datepicker,
              lead.datepickerEnd,
              lead.specialjobs,
              lead.highprofitjobs,
              lead.cancellationfee,
              lead.cancellationreason,
              lead.year,
              lead.make,
              lead.model,
              lead.agentname,
              lead.inscompname,
              lead.insagentname,
              lead.insponumber,
              lead.insGOA,
              lead.insEMAIL,
              lead.persongivequote,
              lead.pricequote,
              lead.eta,
              lead.transactionnumber,
              lead.transactiongrandtotal,
              lead.dispatchername,
              lead.dispatchedby,
              ...Array(31)
                .fill()
                .map((_, i) => lead[`vendorquote${i + 1}`] || ""),
            ])
            .draw();

          // Update counts based on lead status
          counts["All"]++;
          counts[lead.status] = (counts[lead.status] || 0) + 1; // Safely increment status count
          if (lead.datepicker !== "") {
            counts["Scheduled"]++;
          }
        });

        // Update the text of the cards with the counts
        Object.keys(counts).forEach((key) => {
          const card = $(`.card[data-status="${key}"]`);
          if (card.length) {
            card.html(`<strong>${key}: ${counts[key]}</strong>`);
          }
        });

        // Inside your delete button click handler
        $(".delete-button")
          .off("click")
          .on("click", async function () {
            const leadId = $(this).data("id"); // Get the lead ID from the button
            if (window.confirm("Are you sure you want to delete this lead?")) {
              try {
                const response = await fetch(
                  "https://roadrescueconnect.com/rrc/delete_lead.php",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ lead_id: leadId }),
                  }
                );
                const result = await response.json();
                if (result.success) {
                  alert(result.message); // Show success message
                  fetchData(); // Refresh the leads after deletion
                } else {
                  alert(result.message); // Show error message
                }
              } catch (error) {
                console.error("Error deleting lead:", error);
              }
            }
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function to retrieve data
    fetchData();

    // Event listeners
    $(document).on("click", ".notes1-button", function () {
      const row = $(this).closest("tr");
      const leadId = row.find("td:eq(1)").text(); // Assuming leadId is in the second cell of the clicked row
      $("#leadidnumberhidden1").val(leadId);
      $(".notes1-openmodal").click();
      fetchNotes();
    });

    $(document).on("click", ".edit-button", function () {
      // Get the closest table row to the clicked button
      var row = $(this).closest("tr");

      // Find the lead ID in the first row (index 0)
      var leadId = $(row)
        .closest("table")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(1)
        .text(); // Assuming leadId is in the second cell of the first row

      // Extract data from the clicked row
      var data = [];
      $(row)
        .find("td")
        .each(function () {
          data.push($(this).text());
        });

      // Exclude data[0] from URL parameters
      data.shift();

      // Extract other data as needed (omitting data[0])
      var leadId = data[0];
      var status = data[2];
      var tagList = data[3];
      var clientname = data[4];
      var companyname = data[5];
      var phone = data[6];
      var ext = data[7];
      var email = data[8];
      var address = data[9];
      var unit = data[10];
      var city = data[11];
      var region = data[12];
      var postalcode = data[13];
      var country = data[14];
      var servicearea = data[15];
      var jobtype = data[16];
      var jobsource = data[17];
      var jobdescription = data[18];
      var timepickerStart = data[19];
      var timepickerEnd = data[20];
      var datepicker = data[21];
      var datepickerEnd = data[22];
      var specialjobs = data[23];
      var highprofitjobs = data[24];
      var cancellationfee = data[25];
      var cancellationreason = data[26];
      var year = data[27];
      var make = data[28];
      var model = data[29];
      var agentname = data[30];
      var inscompname = data[31];
      var insagentname = data[32];
      var insponumber = data[33];
      var insGOA = data[34];
      var insEMAIL = data[35];
      var persongivequote = data[36];
      var pricequote = data[37];
      var eta = data[38];
      var transactionnumber = data[39];
      var transactiongrandtotal = data[40];
      var dispatchername = data[41];
      var dispatchedby = data[42];
      var vendorquotes = [];
      for (var i = 0; i < 31; i++) {
        vendorquotes.push(data[i + 42]);
      }

      // Construct URL parameters without using template literals
      var urlParams = [];
      urlParams.push("leadId=" + encodeURIComponent(leadId));

      // Construct URL
      var url = "/rrc/Leads?" + urlParams.join("&");

      // Check if opener window exists before attempting to close it
      if (window.opener) {
        // Close the opener window
        window.opener.close();
      }

      // Open the new URL in a new tab
      window.location.href = url;
    });
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // Define fetchNotes function
  const fetchNotes = async () => {
    try {
      const leadId = document.getElementById("leadidnumberhidden1").value;
      const response = await fetch(
        "https://roadrescueconnect.com/rrc/fetch_notes.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: leadId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json(); // Assuming the data is JSON

      // Sort the data array by timestamp in descending order
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      let formattedData = ""; // Initialize formattedData variable

      if (Array.isArray(data) && data.length > 0) {
        // If data is an array of notes objects
        formattedData = data
          .map((note) => {
            // Convert timestamp to Date object
            const timestampDate = new Date(note.timestamp);
            // Format date and time components separately
            const formattedDate = timestampDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "long",
              day: "numeric",
              year: "numeric",
            });
            const formattedTime = timestampDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });
            // Wrap creator, date, time, and notes title in <span> elements with red color
            const creator = `<span style="color: rgb(7, 255, 7);">Creator: </span><span style="color: rgb(255, 255, 255);" >${note.creator}</span><br />`;
            const timestamp = `<span style="color: rgb(7, 255, 7);">Date/Time: </span><span style="color: rgb(255, 255, 255);">${formattedDate} ${formattedTime}</span><br />`;
            const notes = `<span class="editable" data-note-id="${note.id}" style="color: rgb(7, 255, 7); cursor: pointer;">Notes: </span><span class="note-text" id="note-text" style="color: rgb(255, 255, 255); font-weight: normal;">${note.notes}</span>`;
            const editButton = `<button class="edit-btn" data-note-id="${note.id}">Edit</button>`;

            // Combine all parts together with a delete button
            return `
      <div style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 15px; padding: 10px; position: relative;">
      <span style="position: absolute; top: 0; right: 0; margin: 10px;">Actions: ${editButton}<button class="delete-btn" data-note-id="${note.id}">Delete</button></span>
      <br />
      ${creator} ${timestamp} ${notes}
      </div>`;
          })
          .join(""); // No need for <br> as we're wrapping each note in a <div>
      } else {
        formattedData = "No notes found."; // Display a message if no notes are found
      }

      document.getElementById("notes1").innerHTML = formattedData;

      // Add event listeners to delete buttons
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", async (event) => {
          const noteId = button.getAttribute("data-note-id");
          // Show confirmation dialog
          document.getElementById("confirmationDialog").style.display = "block";

          // Store the note id in a data attribute of the confirmation dialog
          document
            .getElementById("confirmationDialog")
            .setAttribute("data-note-id", noteId);
        });
      });

      // Add event listeners to edit buttons
      document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", async (event) => {
          const noteId = button.getAttribute("data-note-id");
          const notesElement = button.parentNode.parentNode.querySelector(
            `.editable[data-note-id="${noteId}"]`
          );

          // Select the sibling element
          const siblingElement = notesElement.nextSibling;

          // Allow user to edit the notes directly
          const originalNotes = siblingElement.textContent;
          siblingElement.contentEditable = true;
          siblingElement.style.border = "2px solid orange";
          siblingElement.style.color = "white";
          siblingElement.style.backgroundColor = "black";
          siblingElement.style.paddingBottom = "40px";
          siblingElement.style.padding = "20px";
          siblingElement.style.paddingRight = "40px";
          siblingElement.style.zIndex = "1"; // Corrected typo here
          siblingElement.style.borderRadius = "10px";
          siblingElement.style.boxShadow = "0 0 10px black"; // Corrected typo here
          siblingElement.style.textAlign = "left";

          // Centering the element on the screen
          siblingElement.style.position = "fixed";
          siblingElement.style.top = "50%";
          siblingElement.style.left = "50%";
          siblingElement.style.transform = "translate(-50%, -50%)";
          siblingElement.style.width = "900px";
          siblingElement.style.height = "auto";

          // Change the "Edit" button to "Save"
          button.textContent = "Save";

          // Handle click event for the "Save" button
          button.removeEventListener("click", event);
          button.addEventListener("click", async (event) => {
            const updatedNotes = notesElement.nextSibling.textContent.trim();
            if (updatedNotes !== originalNotes) {
              // Save the updated notes
              try {
                const response = await fetch(
                  "https://roadrescueconnect.com/rrc/update_note.php",
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: noteId, notes: updatedNotes }),
                  }
                );
                if (!response.ok) {
                  throw new Error("Failed to update note");
                }
                // Reload notes after update
                fetchNotes();
              } catch (error) {
                console.error("Error updating note:", error);
              }
            }
            // Reset the notes element to non-editable state
            notesElement.nextSibling.contentEditable = false;
            // Assuming notesElement is the element you want to modify
            var siblingElement = notesElement.nextSibling;

            // Apply width and height styles to the sibling element
            siblingElement.style.width = "400px";
            siblingElement.style.height = "auto";

            // Remove border from the sibling element
            siblingElement.style.border = "none";

            // Change the "Save" button back to "Edit"
            button.textContent = "Edit";
            fetchNotes();
          });
        });
      });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // useEffect hook
  useEffect(() => {
    // Event listener for confirm delete button in the confirmation dialog
    document
      .getElementById("confirmDelete")
      .addEventListener("click", async () => {
        // Retrieve the note id from the confirmation dialog
        const noteId = document
          .getElementById("confirmationDialog")
          .getAttribute("data-note-id");

        try {
          const deleteResponse = await fetch(
            "https://roadrescueconnect.com/rrc/delete_note.php",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: noteId }),
            }
          );
          if (!deleteResponse.ok) {
            throw new Error("Failed to delete note");
          }
          // If deletion is successful, fetch notes again to update the list
          fetchNotes();
          toast("Note deleted succesfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Flip,
          });
        } catch (error) {
          console.error("Error deleting note:", error);
        }

        // Hide the confirmation dialog after deletion
        document.getElementById("confirmationDialog").style.display = "none";
      });

    // Event listener for cancel delete button in the confirmation dialog
    document.getElementById("cancelDelete").addEventListener("click", () => {
      // Hide the confirmation dialog if the user cancels
      document.getElementById("confirmationDialog").style.display = "none";
    });

    // Call fetchNotes function
    fetchNotes();
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  function saveNotesAndRefreshParentPage() {
    const noteInput11 = document.getElementById("noteInput11").value;
    const leadid = document.getElementById("leadidnumberhidden1").value;

    console.log("noteInput11:", noteInput11);
    console.log("leadid:", leadid);

    fetch("https://roadrescueconnect.com/rrc/add_note.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteInput11, leadid }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save notes");
        }
        // Optionally, you can handle the response here
        // Close and then reopen the container
        fetchNotes();
      })
      .then(() => {
        setIsSaved(true); // Update state to indicate success
        // Clear the value of noteInput11
        toast("Note added succesfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
        document.getElementById("noteInput11").value = "";
      })
      .catch((error) => {
        console.error("Error saving notes:", error);
        // You might want to handle the error here, e.g., display a message to the user
      });
  }

  return (
    <div>
      <header className="header" id="header">
        <div className="alert">
          <span className="alertmsg" id="alertmsg"></span>
        </div>
        <DarkMode />
        <span className="nav_logo-name">Lead Reports</span>
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
        <button
          style={{ display: "none" }}
          id="notes1-openmodal"
          className="notes1-openmodal"
        >
          show
        </button>
        <input
          style={{ display: "none" }}
          id="leadidnumberhidden1"
          className="leadidnumberhidden1"
          readOnly
        ></input>
        <div className="main-content1" style={styles}>
          <h1 style={{ display: "none" }} id="counter"></h1>
          <h1>Leads</h1>
          <div
            id="counters-container"
            className="counters-container"
            style={{ marginBottom: "20px" }}
          >
            <div className="card" data-status="All" style={stylescards}></div>
            <div className="card" data-status="New" style={stylescards}></div>
            <div
              className="card"
              data-status="Deleted"
              style={stylescards}
            ></div>
            <div
              className="card"
              data-status="Scheduled"
              style={stylescards}
            ></div>
            <div
              className="card"
              data-status="In-Progress"
              style={stylescards}
            ></div>
            <div
              className="card"
              data-status="Pending"
              style={stylescards}
            ></div>
            <div
              className="card"
              data-status="Approved"
              style={stylescards}
            ></div>
          </div>
          <br />

          <table id="leadsTable" className="display" style={{ width: "auto" }}>
            <thead>
              <tr>
                <th>Actions</th>
                <th>Lead #</th>
                <th>Created</th>
                <th>Status</th>
                {/* <th>Tags</th> */}
                <th>Client</th>
                {/* <th>Company Name</th>
                <th>Phone</th>
                <th>Ext</th>
                <th>Email</th>
                <th>Address</th>
                <th>Unit</th>
                <th>City</th>
                <th>Region</th>
                <th>Postal Code</th>
                <th>Country</th>
                <th>Service Area</th>
                <th>Job Type</th>
                <th>Job Source</th>
                <th>Job description</th>
                <th>Time Start</th>
                <th>Time End</th>
                <th>Schedule Start</th>
                <th>Schedule End</th>
                <th>Special Jobs</th>
                <th>High Profit Jobs</th>
                <th>Cancellation Fee</th>
                <th>Cancellation Reason</th>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>Assigned Agent</th>
                <th>Insurance Company Name</th>
                <th>Insurance Agent Name</th>
                <th>PO Number</th>
                <th>Insurance GOA</th>
                <th>Insurance Received Email</th>
                <th>Person Give Quote</th>
                <th>Price Quote</th>
                <th>ETA</th>
                <th>Transaction Number</th>
                <th>Transaction Grand Total</th>
                <th>Dispatcher Name</th>
                <th>Dispatched By</th>
                <th>Vendor Quote 1</th>
                <th>Vendor Quote 2</th>
                <th>Vendor Quote 3</th>
                <th>Vendor Quote 4</th>
                <th>Vendor Quote 5</th>
                <th>Vendor Quote 6</th>
                <th>Vendor Quote 7</th>
                <th>Vendor Quote 8</th>
                <th>Vendor Quote 9</th>
                <th>Vendor Quote 10</th>
                <th>Vendor Quote 11</th>
                <th>Vendor Quote 12</th>
                <th>Vendor Quote 13</th>
                <th>Vendor Quote 14</th>
                <th>Vendor Quote 15</th>
                <th>Vendor Quote 16</th>
                <th>Vendor Quote 17</th>
                <th>Vendor Quote 18</th>
                <th>Vendor Quote 19</th>
                <th>Vendor Quote 20</th>
                <th>Vendor Quote 21</th>
                <th>Vendor Quote 22</th>
                <th>Vendor Quote 23</th>
                <th>Vendor Quote 24</th>
                <th>Vendor Quote 25</th>
                <th>Vendor Quote 26</th>
                <th>Vendor Quote 27</th>
                <th>Vendor Quote 28</th>
                <th>Vendor Quote 29</th>
                <th>Vendor Quote 30</th> */}
              </tr>
            </thead>
            <tbody></tbody>
          </table>
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
            <button id="notes-button" onClick={saveNotesAndRefreshParentPage}>
              Save Note
            </button>
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
export default Leadreports;
