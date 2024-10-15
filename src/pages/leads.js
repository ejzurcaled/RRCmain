import React, { useEffect, useState } from "react";
import UseContainerVisibility from "../components/UseContainerVisibility";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import DarkMode from "../components/DarkMode.js";
import Pikaday from "pikaday";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTags,
  faSave,
  faStickyNote,
  faExclamationTriangle,
  faArrowLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Bounce, ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Leads() {
  const [notes, setNotes] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [leadData, setLeadData] = useState(null);
  const [modifiedLeadData, setModifiedLeadData] = useState(null); // New state to hold modified data
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 800));
  const [isActive, setIsActive] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const [isTagContainerOpen, setIsTagContainerOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [newTagLabel, setNewTagLabel] = useState("");
  const [newTagColor, setNewTagColor] = useState("#FFFFFF");
  const [filteredTags, setFilteredTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const handleOpenTagContainer = () => setIsTagContainerOpen(true);
  const handleCloseTagContainer = () => setIsTagContainerOpen(false);

  const fetchLeadData = async (leadId) => {
    try {
      const response = await fetch(
        `https://roadrescueconnect.com/rrc/leads2.php?id=${leadId}`
      );
      if (response.ok) {
        const data = await response.json();
        setLeadData(data);
        setModifiedLeadData(data); // Initialize modified data with fetched data
        /* console.log("Lead Data:", data); */
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  // Call the custom hook
  UseContainerVisibility("notesContainer", ["showButton"], "closeButton");

  useEffect(() => {
    // Get the leadId from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const leadId = queryParams.get("leadId");

    if (leadId) {
      // If leadId exists in the URL, fetch lead data
      document.getElementById("leadidnumberhidden3").value = leadId;
      fetchLeadData(leadId);
    } else {
      // Handle case where leadId is not found in the URL
      console.log("Lead ID not found in the URL");
    }
  }, []);

  useEffect(() => {
    // Get the current time
    const now = new Date();

    // Get hours and minutes
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Format hours and minutes to ensure they have leading zeros if necessary
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Initialize dropdowns
    initializeDropdown(2);
    initializeDropdown(3);
    initializeDropdown(4);
    initializeDropdown(5);
    initializeDropdown(6);

    // Set placeholder for datepickers
    setPlaceholder();
  }, []);

  // Define fetchNotes function
  const fetchNotes = async () => {
    try {
      const leadId = document.getElementById("leadidnumberhidden3").value;
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
            const creator = `<span style="color: rgb(7, 255, 7);">Creator: </span><span style="color: rgb(255, 255, 255);" >${note.creator}</span><h1></h1>`;
            const timestamp = `<span style="color: rgb(7, 255, 7);">Date/Time: </span><span style="color: rgb(255, 255, 255);">${formattedDate} ${formattedTime}</span><h1></h1>`;
            const notes = `<span class="editable" data-note-id="${note.id}" style="color: rgb(7, 255, 7); cursor: pointer;">Notes: </span><span class="note-text" id="note-text" style="color: rgb(255, 255, 255); font-weight: normal;">${note.notes}</span>`;
            const editButton = `<button class="edit-btn" data-note-id="${note.id}">Edit</button>`;

            // Combine all parts together with a delete button
            return `
      <div style="margin-bottom: 10px; border: 1px solid #ccc; border-radius: 15px; padding: 10px; position: relative;">
      <span style="position: absolute; top: 0; right: 0; margin: 10px;">Actions: ${editButton}<button class="delete-btn" data-note-id="${note.id}">Delete</button></span>
      <h1></h1>
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
          toast.success("Note deleted succesfully!", {
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
    const leadid = document.getElementById("leadidnumberhidden3").value;

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
        toast.success("Note added succesfully!", {
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

  function saveData() {
    const clientname = document.getElementById("clientname").value; // Fetch clientname value

    // Check if clientname is empty
    if (clientname.trim() === "") {
      /* alert("Client name cannot be empty. Please fill in the client name."); */
      toast.error(
        "Client name cannot be empty. Please fill in the client name."
      );
      return; // Exit the function if clientname is empty
    }

    const data = {
      status: document.getElementById("status").value,
      leadidnumberhidden: document.getElementById("leadidnumberhidden3").value,
      clientname: clientname, // Use the fetched clientname value
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
    xhr.open("POST", "https://roadrescueconnect.com/rrc/update_lead.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Handle successful response
          setIsButtonDisabled(true);
          toast.promise(resolveAfter3Sec, {
            pending: "Lead data updated successfully!",
            success: "Lead data updated successfully!",
            error: "Failed to update lead data",
          });
          // Add a delay before redirecting
          setTimeout(function () {
            window.location.reload();
          }, 800);
        } else {
          console.error("Error occurred while updating lead.");
          alert("An error occurred while updating lead. Please try again.");
        }
      }
    };
    xhr.send(JSON.stringify(data));
  }

  const fetchData = async () => {
    const leadId = document.getElementById("leadidnumberhidden3").value;
    try {
      const response = await fetch(
        `https://roadrescueconnect.com/rrc/fetchtagging_id.php?id=${leadId}`
      );

      if (!response.ok) {
        /* throw new Error("No tags available for this ID"); */
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tags:", error.message);
      alert(error.message);
      return null;
    }
  };

  const fetchAllTags = async () => {
    try {
      const response = await fetch(
        "https://roadrescueconnect.com/rrc/fetch_tagging.php"
      );
      if (!response.ok) {
        /* throw new Error("Failed to fetch all tags"); */
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching all tags:", error.message);
      alert(error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchAllTags()
      .then((data) => {
        if (!data) {
          throw new Error("No tags available");
        }
        setAllTags(data);
        setFilteredTags(data);
      })
      .catch((error) => {
        console.error("Error fetching all tags:", error);
        setAllTags([]);
        setFilteredTags([]);
      });
  }, [tags, isTagContainerOpen]);

  useEffect(() => {
    const leadId = document.getElementById("leadidnumberhidden3").value;
    fetchData(leadId)
      .then((data) => {
        if (!data) {
          throw new Error("ID not found in the database");
        }
        const parsedData = JSON.parse(data);
        setTags(parsedData);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        setTags([]);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = allTags.filter((tag) =>
      tag.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTags(filtered);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setTagSearchTerm(searchTerm);
    handleSearch(searchTerm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTagLabel.trim()) {
      alert("Tag label must be filled out");
      return;
    }

    const newTag = {
      leadId: "1", // Hardcoding leadId as "1" (for now)
      tag_data: {
        label: newTagLabel.toLowerCase(),
        originalLabel: newTagLabel,
        color: newTagColor,
      },
    };

    try {
      const response = await fetch(
        `https://roadrescueconnect.com/rrc/fetch_tags_1.php?id=1`, // Send id as a query parameter
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTag),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }

      const addedTag = await response.json();
      setFilteredTags([...filteredTags, addedTag]);
      setNewTagLabel("");
      setNewTagColor("#FFFFFF");

      fetchAllTags()
        .then((data) => {
          if (!data) {
            throw new Error("No tags available");
          }
          setAllTags(data);
          const filtered = data.filter((tag) =>
            tag.label.toLowerCase().includes(tagSearchTerm.toLowerCase())
          );
          setFilteredTags(filtered);
          toast.success("Tag successfully added!");
        })
        .catch((error) => {
          console.error("Error fetching all tags:", error);
          alert(error.message);
        });
    } catch (error) {
      console.error("Error adding tag:", error);
      toast.error(error.message);
    }
  };

  const logTagInformation = async (tag, leadidnumberhidden3) => {
    /* console.log("Tag Information:");
    console.log("Label:", tag.label);
    console.log("Original Label:", tag.originalLabel);
    console.log("Color:", tag.color);
    console.log("leadidnumberhidden3:", leadidnumberhidden3); */

    const leadId = document.getElementById("leadidnumberhidden3").value;

    // Create the new tag data object
    const newTagData = {
      label: tag.label.toLowerCase(),
      originalLabel: tag.originalLabel,
      color: tag.color,
    };

    // Prompt the user for confirmation before proceeding
    const confirmAddTag = window.confirm(
      `Are you sure you want to add the tag "${tag.originalLabel}"?`
    );

    if (!confirmAddTag) {
      return; // If user cancels, exit function
    }

    try {
      const response = await fetch(
        `https://roadrescueconnect.com/rrc/fetch_tags_3.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leadId: leadidnumberhidden3,
            tag_data: newTagData,
          }), // Send leadId along with tag_data in the request body
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }

      // Tag successfully added, now refetch the tag list
      fetchData(leadId)
        .then((data) => {
          if (!data) {
            throw new Error("ID not found in the database");
          }
          const parsedData = JSON.parse(data);
          setTags(parsedData);
        })
        .catch((error) => {
          console.error("Error fetching tags:", error);
          setTags([]);
        });

      const updatedTagData = await response.json();
      /* console.log(
        `Tag data updated successfully for lead ID ${leadidnumberhidden3}:`,
        updatedTagData
      ); */
      toast.success("Tag successfully added on the Lead/Job!");
    } catch (error) {
      console.error("Error updating tag data:", error);
      toast.error(error.message);
    }
  };

  // handleDeleteTag2 function
  const handleDltTag2 = async (label, color) => {
    const leadId = document.getElementById("leadidnumberhidden3").value;

    // Prompt the user for confirmation before deleting the tag
    const confirmDelete = window.confirm(
      `Are you sure you want to remove the tag "${label}"?`
    );

    if (!confirmDelete) {
      // User cancelled the deletion action
      return;
    }

    try {
      const response = await fetch(
        `https://roadrescueconnect.com/rrc/delete_tags_2.php?leadId=${leadId}`, // Updated URL
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label, color }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }

      // Tag successfully deleted, now refetch the tag list
      const data = await fetchData(leadId);
      if (!data) {
        throw new Error("ID not found in the database");
      }
      const parsedData = JSON.parse(data);
      setTags(parsedData);

      toast.success("Tag successfully deleted!");
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast.error(error.message);
    }
  };

  const handleDeleteTag = async (label, color) => {
    // Prompt the user for confirmation before deleting the tag
    const leadId = document.getElementById("leadidnumberhidden3").value;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the tag "${label}"?`
    );

    if (!confirmDelete) {
      // User cancelled the deletion action
      return;
    }

    try {
      const response = await fetch(
        "https://roadrescueconnect.com/rrc/delete_tags_1.php/1",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label, color }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }

      const deletedTag = await response.json();
      const updatedTags = tags.filter((tag) => tag.label !== deletedTag.label);
      setTags(updatedTags);

      // Tag successfully deleted, now refetch the tag list
      fetchData(leadId)
        .then((data) => {
          if (!data) {
            throw new Error("ID not found in the database");
          }
          const parsedData = JSON.parse(data);
          setTags(parsedData);
        })
        .catch((error) => {
          console.error("Error fetching tags:", error);
          setTags([]);
        });

      toast.success("Tag successfully deleted !");
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast.error(error.message);
    }
  };

  const getContrastColor = (backgroundColor) => {
    if (!backgroundColor || typeof backgroundColor !== "string") {
      return "#000000"; // Default to black if background color is not valid
    }

    const hexToRgb = (hex) =>
      hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));

    const [r, g, b] = hexToRgb(backgroundColor);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  return (
    <div>
      <header className="header" id="header">
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
        <div className="box0">
          <div>
            <div>
              <input
                style={{
                  border: "none",
                  background: "none",
                  outline: "none",
                  width: "100%",
                  fontWeight: "bold",
                }}
                type="text"
                id="leadidnumber"
                name="leadidnumber"
                className="leadidnumber"
                value={
                  leadData && leadData.clientname && leadData.id
                    ? `Lead ID #: ${leadData.id} - ${leadData.clientname}`
                    : ""
                }
                readOnly
              />

              <input
                type="hidden"
                id="leadidnumberhidden3"
                name="id"
                readOnly
              />
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
                onChange={(e) =>
                  setLeadData({ ...leadData, status: e.target.value })
                }
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
                {/* <span id="tagList" className="tagList"></span> */}
                <div className="tagList" id="tagList">
                  <ul>
                    {Array.isArray(tags) && tags.length > 0 ? (
                      tags.map((tag, index) => (
                        <li
                          className="tag"
                          key={index}
                          style={{
                            backgroundColor: tag.color,
                            color: getContrastColor(tag.color),
                            fontWeight: "bold",
                          }}
                        >
                          {tag.originalLabel}
                          <div className="close1-container">
                            <button
                              className="close1"
                              onClick={() =>
                                handleDltTag2(tag.originalLabel, tag.color)
                              }
                            >
                              X
                            </button>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>No tags available</li>
                    )}
                  </ul>
                </div>
              </span>
              <h1></h1>
              <div>
                <span>
                  <strong>Actions: </strong>
                </span>

                <button
                  id="showButton"
                  className="showButton"
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "rgb(255, 217, 0)",
                  }}
                >
                  Notes
                </button>
                <button
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "rgb(255, 217, 0)",
                  }}
                  type="submit"
                  className="opentagcontainer"
                  id="opentagcontainer"
                  onClick={handleOpenTagContainer}
                >
                  <FontAwesomeIcon icon={faTags} className="opensavedtags1" />
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
          {isTagContainerOpen && (
            <div className="tagContainerOverlay">
              <div className="tagContainer">
                <button
                  className="closeTagContainerButton"
                  onClick={handleCloseTagContainer}
                >
                  X
                </button>
                <div className="savedtags" id="savedtags">
                  <div className="tag-action" id="tag-action">
                    <form onSubmit={handleSubmit}>
                      <span>Add tag </span>
                      <input
                        className="taginputhere"
                        id="taginputhere"
                        type="text"
                        placeholder="Enter tag label"
                        value={newTagLabel}
                        onChange={(e) => setNewTagLabel(e.target.value)}
                      />
                      <input
                        className="colorchanger"
                        id="colorchanger"
                        type="color"
                        value={newTagColor}
                        onChange={(e) => setNewTagColor(e.target.value)}
                      />
                      <button type="submit">Submit</button>
                    </form>
                  </div>
                  <br />
                  <h3>Search:</h3>
                  <input
                    className="tagsearching"
                    id="tagsearching"
                    type="text"
                    placeholder="Search tag here.."
                    onChange={handleSearchChange}
                  ></input>
                  <div className="savedtagscontainer" id="savedtagscontainer">
                    <br />

                    <ul>
                      {Array.isArray(filteredTags) &&
                      filteredTags.length > 0 ? (
                        filteredTags.map((tag, index) => (
                          <li
                            className="tag"
                            key={index}
                            style={{
                              backgroundColor: tag.color,
                              color: getContrastColor(tag.color),
                              fontWeight: "bold",
                            }}
                            onClick={() =>
                              logTagInformation(
                                tag,
                                document.getElementById("leadidnumberhidden3")
                                  .value
                              )
                            }
                          >
                            {tag.originalLabel}
                            <div className="close5-container">
                              <button
                                className="close5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteTag(tag.originalLabel, tag.color);
                                }}
                              >
                                X
                              </button>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li>No tags available</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
              value={leadData && leadData.clientname ? leadData.clientname : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, clientname: e.target.value })
              }
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
              value={
                leadData && leadData.companyname ? leadData.companyname : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, companyname: e.target.value })
              }
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
              value={leadData && leadData.phone ? leadData.phone : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, phone: e.target.value })
              }
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
              maxLength="5"
              value={leadData && leadData.ext ? leadData.ext : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, ext: e.target.value })
              }
            />
            <label htmlFor="ext">Ext:</label>
          </div>
          <div className="input-container">
            <input
              className="email"
              type="text"
              id="email"
              name="email"
              value={leadData && leadData.email ? leadData.email : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, email: e.target.value })
              }
              required
            />
            <label htmlFor="email">Email:</label>
          </div>
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
              value={leadData && leadData.address ? leadData.address : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, address: e.target.value })
              }
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
              value={leadData && leadData.unit ? leadData.unit : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, unit: e.target.value })
              }
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
              value={leadData && leadData.city ? leadData.city : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, city: e.target.value })
              }
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
              value={leadData && leadData.region ? leadData.region : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, region: e.target.value })
              }
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
              value={leadData && leadData.postalcode ? leadData.postalcode : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, postalcode: e.target.value })
              }
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
              value={leadData && leadData.country ? leadData.country : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, country: e.target.value })
              }
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
              value={
                leadData && leadData.servicearea ? leadData.servicearea : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, servicearea: e.target.value })
              }
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
              value={leadData && leadData.jobtype ? leadData.jobtype : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, jobtype: e.target.value })
              }
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
              value={leadData && leadData.jobsource ? leadData.jobsource : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, jobsource: e.target.value })
              }
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
            value={
              leadData && leadData.jobdescription ? leadData.jobdescription : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, jobdescription: e.target.value })
            }
            cols="50"
            rows="10"
            placeholder="Please input job description here.."
            style={{
              fontFamily: "monospace",
              whiteSpace: "pre-wrap", // Preserve spaces and newlines
              resize: "both", // Allow both vertical and horizontal resizing
            }}
          ></textarea>
        </div>
        <div className="box4">
          <p style={{ textAlign: "left", marginBottom: "20px" }}>
            <strong>Scheduled</strong>
          </p>
          <h1 style={{ fontSize: "15px" }}>
            <strong>Starts</strong>
          </h1>
          <input
            type="text"
            id="datepicker"
            onClick={showDatePicker}
            value={leadData && leadData.datepicker ? leadData.datepicker : ""}
            onChange={(e) =>
              setLeadData({ ...leadData, datepicker: e.target.value })
            }
          />
          <input
            type="time"
            id="timepickerStart"
            name="timepickerStart"
            value={
              leadData && leadData.timepickerStart
                ? leadData.timepickerStart
                : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, timepickerStart: e.target.value })
            }
            required
          />
          <h1 style={{ fontSize: "15px" }}>
            <strong>Ends</strong>
          </h1>
          <input
            type="text"
            id="datepickerEnd"
            onClick={showDatePickerEnd}
            value={
              leadData && leadData.datepickerEnd ? leadData.datepickerEnd : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, datepickerEnd: e.target.value })
            }
          />
          <input
            type="time"
            id="timepickerEnd"
            name="timepickerEnd"
            required
            value={
              leadData && leadData.timepickerEnd ? leadData.timepickerEnd : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, timepickerEnd: e.target.value })
            }
          />
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
              value={
                leadData && leadData.specialjobs ? leadData.specialjobs : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, specialjobs: e.target.value })
              }
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
              value={
                leadData && leadData.highprofitjobs
                  ? leadData.highprofitjobs
                  : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, highprofitjobs: e.target.value })
              }
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
              value={
                leadData && leadData.cancellationfee
                  ? leadData.cancellationfee
                  : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, cancellationfee: e.target.value })
              }
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
            value={
              leadData && leadData.cancellationreason
                ? leadData.cancellationreason
                : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, cancellationreason: e.target.value })
            }
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
              value={leadData && leadData.year ? leadData.year : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, year: e.target.value })
              }
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
              value={leadData && leadData.make ? leadData.make : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, make: e.target.value })
              }
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
              value={leadData && leadData.model ? leadData.model : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, model: e.target.value })
              }
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
              value={leadData && leadData.agentname ? leadData.agentname : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, agentname: e.target.value })
              }
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
              value={
                leadData && leadData.inscompname ? leadData.inscompname : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, inscompname: e.target.value })
              }
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
              value={
                leadData && leadData.insagentname ? leadData.insagentname : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, insagentname: e.target.value })
              }
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
              value={
                leadData && leadData.insponumber ? leadData.insponumber : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, insponumber: e.target.value })
              }
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
              value={leadData && leadData.insGOA ? leadData.insGOA : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, insGOA: e.target.value })
              }
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
              value={leadData && leadData.insEMAIL ? leadData.insEMAIL : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, insEMAIL: e.target.value })
              }
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
              value={
                leadData && leadData.persongivequote
                  ? leadData.persongivequote
                  : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, persongivequote: e.target.value })
              }
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
              value={leadData && leadData.pricequote ? leadData.pricequote : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, pricequote: e.target.value })
              }
              required
            />
            <label htmlFor="pricequote">Price quoted & Total amount:</label>
          </div>
          <div className="input-container">
            <input
              className="eta"
              type="text"
              id="eta"
              name="eta"
              required
              value={leadData && leadData.eta ? leadData.eta : ""}
              onChange={(e) =>
                setLeadData({ ...leadData, eta: e.target.value })
              }
            />
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
              value={
                leadData && leadData.transactionnumber
                  ? leadData.transactionnumber
                  : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, transactionnumber: e.target.value })
              }
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
              value={
                leadData && leadData.transactiongrandtotal
                  ? leadData.transactiongrandtotal
                  : ""
              }
              onChange={(e) =>
                setLeadData({
                  ...leadData,
                  transactiongrandtotal: e.target.value,
                })
              }
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
              value={
                leadData && leadData.dispatchername
                  ? leadData.dispatchername
                  : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, dispatchername: e.target.value })
              }
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
              value={
                leadData && leadData.dispatchedby ? leadData.dispatchedby : ""
              }
              onChange={(e) =>
                setLeadData({ ...leadData, dispatchedby: e.target.value })
              }
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
            value={
              leadData && leadData.vendorquote1 ? leadData.vendorquote1 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote1: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote2"
            type="text"
            id="vendorquote2"
            name="vendorquote2"
            value={
              leadData && leadData.vendorquote2 ? leadData.vendorquote2 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote2: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote3"
            type="text"
            id="vendorquote3"
            name="vendorquote3"
            value={
              leadData && leadData.vendorquote3 ? leadData.vendorquote3 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote3: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote4"
            type="text"
            id="vendorquote4"
            name="vendorquote4"
            value={
              leadData && leadData.vendorquote4 ? leadData.vendorquote4 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote4: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote5"
            type="text"
            id="vendorquote5"
            name="vendorquote5"
            value={
              leadData && leadData.vendorquote5 ? leadData.vendorquote5 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote5: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote6"
            type="text"
            id="vendorquote6"
            name="vendorquote6"
            value={
              leadData && leadData.vendorquote6 ? leadData.vendorquote6 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote6: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote7"
            type="text"
            id="vendorquote7"
            name="vendorquote7"
            value={
              leadData && leadData.vendorquote7 ? leadData.vendorquote7 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote7: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote8"
            type="text"
            id="vendorquote8"
            name="vendorquote8"
            value={
              leadData && leadData.vendorquote8 ? leadData.vendorquote8 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote8: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote9"
            type="text"
            id="vendorquote9"
            name="vendorquote9"
            value={
              leadData && leadData.vendorquote9 ? leadData.vendorquote9 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote9: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote10"
            type="text"
            id="vendorquote10"
            name="vendorquote10"
            value={
              leadData && leadData.vendorquote10 ? leadData.vendorquote10 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote10: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote11"
            type="text"
            id="vendorquote11"
            name="vendorquote11"
            value={
              leadData && leadData.vendorquote11 ? leadData.vendorquote11 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote11: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote12"
            type="text"
            id="vendorquote12"
            name="vendorquote12"
            value={
              leadData && leadData.vendorquote12 ? leadData.vendorquote12 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote12: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote13"
            type="text"
            id="vendorquote13"
            name="vendorquote13"
            value={
              leadData && leadData.vendorquote13 ? leadData.vendorquote13 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote13: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote14"
            type="text"
            id="vendorquote14"
            name="vendorquote14"
            value={
              leadData && leadData.vendorquote14 ? leadData.vendorquote14 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote14: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote15"
            type="text"
            id="vendorquote15"
            name="vendorquote15"
            value={
              leadData && leadData.vendorquote15 ? leadData.vendorquote15 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote15: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote16"
            type="text"
            id="vendorquote16"
            name="vendorquote16"
            value={
              leadData && leadData.vendorquote16 ? leadData.vendorquote16 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote16: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote17"
            type="text"
            id="vendorquote17"
            name="vendorquote17"
            value={
              leadData && leadData.vendorquote17 ? leadData.vendorquote17 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote17: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote18"
            type="text"
            id="vendorquote18"
            name="vendorquote18"
            value={
              leadData && leadData.vendorquote18 ? leadData.vendorquote18 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote18: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote19"
            type="text"
            id="vendorquote19"
            name="vendorquote19"
            value={
              leadData && leadData.vendorquote19 ? leadData.vendorquote19 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote19: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote20"
            type="text"
            id="vendorquote20"
            name="vendorquote20"
            value={
              leadData && leadData.vendorquote20 ? leadData.vendorquote20 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote20: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote21"
            type="text"
            id="vendorquote21"
            name="vendorquote21"
            value={
              leadData && leadData.vendorquote21 ? leadData.vendorquote21 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote21: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote22"
            type="text"
            id="vendorquote22"
            name="vendorquote22"
            value={
              leadData && leadData.vendorquote22 ? leadData.vendorquote22 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote22: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote23"
            type="text"
            id="vendorquote23"
            name="vendorquote23"
            value={
              leadData && leadData.vendorquote23 ? leadData.vendorquote23 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote23: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote24"
            type="text"
            id="vendorquote24"
            name="vendorquote24"
            value={
              leadData && leadData.vendorquote24 ? leadData.vendorquote24 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote24: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote25"
            type="text"
            id="vendorquote25"
            name="vendorquote25"
            value={
              leadData && leadData.vendorquote25 ? leadData.vendorquote25 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote25: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote26"
            type="text"
            id="vendorquote26"
            name="vendorquote26"
            value={
              leadData && leadData.vendorquote26 ? leadData.vendorquote26 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote26: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote27"
            type="text"
            id="vendorquote27"
            name="vendorquote27"
            value={
              leadData && leadData.vendorquote27 ? leadData.vendorquote27 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote27: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote28"
            type="text"
            id="vendorquote28"
            name="vendorquote28"
            value={
              leadData && leadData.vendorquote28 ? leadData.vendorquote28 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote28: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote29"
            type="text"
            id="vendorquote29"
            name="vendorquote29"
            value={
              leadData && leadData.vendorquote29 ? leadData.vendorquote29 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote29: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
          <input
            className="vendorquote30"
            type="text"
            id="vendorquote30"
            name="vendorquote30"
            value={
              leadData && leadData.vendorquote30 ? leadData.vendorquote30 : ""
            }
            onChange={(e) =>
              setLeadData({ ...leadData, vendorquote30: e.target.value })
            }
            placeholder="AMT ETA GOA NAME PHONE EMAIL"
          />
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
export default Leads;
