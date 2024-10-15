const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 8081;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Create the MySQL connection without using dotenv
const db = mysql.createConnection({
  host: "srv1711.hstgr.io", // Your database host
  user: "u376338418_root", // Your database username
  password: "Mahalkita29@@", // Your database password
  database: "u376338418_primeroadside", // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

// Route to handle saving leads
app.post("/savelead", (req, res) => {
  const leadData = req.body;

  const columns = [
    "clientname",
    "companyname",
    "phone",
    "ext",
    "email",
    "address",
    "unit",
    "city",
    "region",
    "postalcode",
    "country",
    "servicearea",
    "jobtype",
    "jobsource",
    "jobdescription",
    "timepickerStart",
    "datepickerEnd",
    "datepicker",
    "timepickerEnd",
    "specialjobs",
    "highprofitjobs",
    "cancellationfee",
    "cancellationreason",
    "year",
    "make",
    "model",
    "agentname",
    "inscompname",
    "insagentname",
    "insponumber",
    "insGOA",
    "insEMAIL",
    "persongivequote",
    "pricequote",
    "eta",
    "transactionnumber",
    "transactiongrandtotal",
    "dispatchername",
    "dispatchedby",
    "vendorquote1",
    "vendorquote2",
    "vendorquote3",
    "vendorquote4",
    "vendorquote5",
    "vendorquote6",
    "vendorquote7",
    "vendorquote8",
    "vendorquote9",
    "vendorquote10",
    "vendorquote11",
    "vendorquote12",
    "vendorquote13",
    "vendorquote14",
    "vendorquote15",
    "vendorquote16",
    "vendorquote17",
    "vendorquote18",
    "vendorquote19",
    "vendorquote20",
    "vendorquote21",
    "vendorquote22",
    "vendorquote23",
    "vendorquote24",
    "vendorquote25",
    "vendorquote26",
    "vendorquote27",
    "vendorquote28",
    "vendorquote29",
    "vendorquote30",
  ];

  const values = columns.map((col) => leadData[col]);

  const sql = `INSERT INTO leads (${columns.join(", ")}) VALUES (${Array(
    columns.length
  )
    .fill("?")
    .join(", ")})`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while saving data." });
    }
    console.log("Lead saved successfully.");
    return res
      .status(200)
      .json({ message: "Lead updated successfully. Redirecting.." });
  });
});

app.get("/", (req, res) => {
  return res.json("from backend side");
});

app.get("/leads", (req, res) => {
  const sql = "SELECT status, COUNT(*) as count FROM leads GROUP BY status";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

app.get("/leadreport", (req, res) => {
  const sql = "SELECT * FROM leads";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.json(result);
    }
  });
});

// // Update the /savelead endpoint
// app.post("/savelead", (req, res) => {
//   const leadData = req.body;

//   /* // Extract tags from leadData
//   const tags = leadData.tags;
//   delete leadData.tags; // Remove tags from leadData */

//   // Insert leadData into leads table
//   db.query("INSERT INTO leads SET ?", leadData, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res
//         .status(500)
//         .json({ error: "An error occurred while saving data." });
//     }
//     console.log("Lead saved successfully.");

//     // Get the ID of the newly inserted lead
//     const leadId = result.insertId;
//   });
// });

// Route to update lead status
app.post("/updateleadstatus", (req, res) => {
  console.log("Request Body:", req.body); // Log the request body
  const { leadId, newStatus } = req.body;

  if (!leadId || !newStatus) {
    return res
      .status(400)
      .json({ error: "Lead ID and new status are required." });
  }

  const sql = "UPDATE leads SET status = ? WHERE id = ?";
  db.query(sql, [newStatus, leadId], (err, result) => {
    if (err) {
      console.error("Error updating lead status:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while updating lead status." });
    } else {
      // If update is successful
      const successMessage = "Lead status updated successfully.";
      // Return the updated leadId
      return res.status(200).json({ leadId: leadId, message: successMessage });
    }
  });
});

// Route to update a note
app.put("/updatenote", (req, res) => {
  const { id, notes } = req.body; // Assuming the ID and updated notes are sent via PUT request body

  if (!id || !notes) {
    return res
      .status(400)
      .json({ error: "Note ID and updated notes are required." });
  }

  // Prepare and execute the query to update the note
  const sql = "UPDATE notesdb SET notes = ? WHERE id = ?";
  db.query(sql, [notes, id], (err, result) => {
    if (err) {
      console.error("Error updating note:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while updating note." });
    } else {
      if (result.affectedRows > 0) {
        return res.status(200).json({ message: "Note updated successfully." });
      } else {
        /* return res.status(404).json({ error: "Note not found." }); */
      }
    }
  });
});

// Route to add a new note
app.post("/addnote", (req, res) => {
  const { noteInput11, leadid } = req.body; // Assuming note content and lead ID are sent via POST request body
  const creator = "Jaime"; // Static value

  if (!noteInput11 || !leadid) {
    return res
      .status(400)
      .json({ error: "Note content and lead ID are required." });
  }

  // Get current date and time in Central Time
  const currentDateTime = new Date();
  const currentDateTimeCT = new Date(
    currentDateTime.toLocaleString("en-US", { timeZone: "America/Chicago" })
  );

  // Insert data into the database
  const sql =
    "INSERT INTO notesdb (notes, leadid, creator, timestamp) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [noteInput11, leadid, creator, currentDateTimeCT],
    (err, result) => {
      if (err) {
        console.error("Error adding note:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while adding note." });
      } else {
        console.log("Note added successfully.");
        return res.status(200).json({ message: "Note added successfully." });
      }
    }
  );
});

// Route to fetch notes
app.post("/fetchnotes", (req, res) => {
  const leadId = req.body.id; // Assuming the ID is sent via POST request

  if (!leadId) {
    return res.status(400).json({ error: "Lead ID is required." });
  }

  // Route to delete a note
  app.delete("/deletenote", (req, res) => {
    const noteId = req.body.id; // Assuming the ID is sent via DELETE request body

    if (!noteId) {
      return res.status(400).json({ error: "Note ID is required." });
    }

    // Prepare and execute the query to delete the note
    const sql = "DELETE FROM notesdb WHERE id = ?";
    db.query(sql, [noteId], (err, result) => {
      if (err) {
        console.error("Error deleting note:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while deleting note." });
      } else {
        if (result.affectedRows > 0) {
          return res
            .status(200)
            .json({ message: "Note deleted successfully." });
        } else {
          /* return res.status(404).json({ error: "Note not found." }); */
        }
      }
    });
  });

  // Prepare and execute the query to fetch notes
  const sql =
    "SELECT id, creator, timestamp, notes FROM notesdb WHERE leadid = ?";
  db.query(sql, [leadId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      if (results.length > 0) {
        let notes = [];
        results.forEach((row) => {
          const formattedTimestamp = new Date(row.timestamp).toLocaleString(
            "en-US",
            { timeZone: "America/Chicago" }
          );
          const note = {
            id: row.id,
            creator: row.creator,
            timestamp: formattedTimestamp,
            notes: row.notes,
          };
          notes.push(note);
        });
        return res.json(notes);
      } else {
        return res;
        /* .status(404)
          .json({ message: "No notes found for the given ID." }); */
      }
    }
  });
});

// Define API endpoint to fetch user data by ID
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM users WHERE id = ?`;
  db.query(sql, [userId], (err, results) => {
    // Change 'connection' to 'db' here
    if (err) {
      console.error("Error fetching user data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(results[0]); // Assuming only one user is returned
  });
});

// Define API endpoint to fetch user data by ID
app.get("/leads2/:id", (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM leads WHERE id = ?`;
  db.query(sql, [userId], (err, results) => {
    // Change 'connection' to 'db' here
    if (err) {
      console.error("Error fetching user data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(results[0]); // Assuming only one user is returned
  });
});

app.post("/updatelead", (req, res) => {
  const leadData = req.body;

  const id = leadData.leadidnumberhidden;
  delete leadData.leadidnumberhidden; // Remove ID from lead data

  const sql = "UPDATE leads SET ? WHERE id = ?";
  db.query(sql, [leadData, id], (err, result) => {
    if (err) {
      console.error("Error updating lead:", err);
      res.status(500).json({ error: "An error occurred while updating data." });
    } else {
      // If update is successful
      const successMessage = "Lead updated successfully. Redirecting..";
      // Return the updated leadId
      res.status(200).json({ leadId: id, message: successMessage });
    }
  });
});

///////////////////////////////////////////////////////////////////////////

// Endpoint to handle updating tag data for a lead
app.post("/tags3", (req, res) => {
  const leadId = req.body.leadId; // Extract lead ID from request body

  const { tag_data } = req.body;

  // Check if the label is already in the tag_data for the lead ID
  db.query(
    "SELECT tag_data FROM leads WHERE id = ?",
    [leadId],
    (error, results) => {
      if (error) {
        console.error("Error checking existing tags:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const existingTagData = JSON.parse(results[0].tag_data);

      // Check if the label already exists in the tag_data
      const existingLabel = existingTagData.find(
        (tag) => tag.label.toLowerCase() === tag_data.label.toLowerCase()
      );
      if (existingLabel) {
        console.log("Tag label already exists. Not adding the tag.");
        res.status(400).json({ error: "Tag label already exists" }); // Send response indicating tag label already exists
        return;
      }

      // If the label doesn't exist, update the tag_data for the lead ID with the new label and color
      const updatedTagData = [...existingTagData, tag_data];
      db.query(
        "UPDATE leads SET tag_data = ? WHERE id = ?",
        [JSON.stringify(updatedTagData), leadId],
        (error) => {
          if (error) {
            console.error("Error updating tag:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          console.log(`Tag updated successfully for lead ID ${leadId}`);
          res.json({ id: leadId, tag_data: updatedTagData });
        }
      );
    }
  );
});

//ADDING TAGS TO ALL LIST//

app.post("/tags/:id", (req, res) => {
  const id = "1"; // Always set ID to "1"
  console.log("Received ID:", id); // Log the received ID
  const { tag_data } = req.body;

  // Check if the label is already in the tag_data for ID "1"
  db.query(
    "SELECT tag_data FROM tags_db WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error checking existing tags:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const existingTagData = JSON.parse(results[0].tag_data);

      /* // Check if the label already exists in the tag_data
      const existingLabel = existingTagData.find(
        (tag) => tag.label === tag_data.label
      ); */
      // Check if the label already exists in the tag_data
      const existingLabel = existingTagData.find(
        (tag) => tag.label.toLowerCase() === tag_data.label.toLowerCase()
      );
      if (existingLabel) {
        console.log("Tag label already exists. Not adding the tag.");
        res.status(400).json({ error: "Tag label already exists" }); // Send response indicating tag label already exists
        return;
      }

      // If the label doesn't exist, update the tag_data of ID "1" with the new label and color
      const updatedTagData = [...existingTagData, tag_data];
      db.query(
        "UPDATE tags_db SET tag_data = ? WHERE id = ?",
        [JSON.stringify(updatedTagData), id],
        (error) => {
          if (error) {
            console.error("Error updating tag:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          console.log(`Tag updated successfully for ID ${id}`);
          res.json({ id, tag_data: updatedTagData });
        }
      );
    }
  );
});

//FETCHING TAGS FOR SPECIFIC ID//

app.get("/fetchtagging/:id", (req, res) => {
  const id = req.params.id; // Get ID from request parameters
  console.log("Request received for fetching tags from ID:", id); // Log ID from which data is fetched
  db.query(
    "SELECT tag_data FROM leads WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (results.length === 0) {
        // If no tags found for the ID, send an appropriate response to the client
        console.log("No tags available for ID:", id);
        res.status(404).json({ error: "No tags available for this ID" });
        return;
      }
      console.log("Tags fetched successfully");
      // No need to parse tag_data as JSON since it's already an array
      res.json(results[0].tag_data);
    }
  );
});

//FETCHING ALLTAGS FOR TAG_DATA//
// Define a new route for fetching all tags
app.get("/alltags", (req, res) => {
  // Query the database to fetch all tags
  db.query("SELECT tag_data FROM tags_db", (error, results) => {
    if (error) {
      console.error("Error fetching all tags:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (results.length === 0) {
      // If no tags found in the database, send an appropriate response to the client
      console.log("No tags available");
      res.status(404).json({ error: "No tags available" });
      return;
    }
    console.log("All tags fetched successfully");
    // Extract tag data from the results and send it to the client
    const allTags = results.map((result) => JSON.parse(result.tag_data)).flat();
    res.json(allTags);
  });
});

//FETCHING TAGS FOR TAG_DATA ONLY FOR tags_db//

app.delete("/tags/:id", (req, res) => {
  const id = "1"; // Always set ID to "1"
  const { label, color } = req.body;

  db.query(
    "SELECT tag_data FROM tags_db WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const existingTagData = JSON.parse(results[0].tag_data);

      // Filter out the tag with matching label (case-insensitive) and color
      const updatedTagData = existingTagData.filter(
        (tag) =>
          tag.label.toLowerCase() !== label.toLowerCase() || tag.color !== color
      );

      db.query(
        "UPDATE tags_db SET tag_data = ? WHERE id = ?",
        [JSON.stringify(updatedTagData), id],
        (error) => {
          if (error) {
            console.error("Error deleting tag:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          console.log(`Tag deleted successfully for ID ${id}`);
          res.json({ label, color }); // Send the deleted tag data as response
        }
      );
    }
  );
});

app.delete("/tags2/:leadId", (req, res) => {
  const leadId = req.params.leadId;
  const { label, color } = req.body;

  db.query(
    "SELECT tag_data FROM leads WHERE id = ?",
    [leadId],
    (error, results) => {
      if (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const existingTagData = JSON.parse(results[0].tag_data);

      // Filter out the tag with matching label (case-insensitive) and color
      const updatedTagData = existingTagData.filter(
        (tag) =>
          tag.label.toLowerCase() !== label.toLowerCase() || tag.color !== color
      );

      db.query(
        "UPDATE leads SET tag_data = ? WHERE id = ?",
        [JSON.stringify(updatedTagData), leadId],
        (error) => {
          if (error) {
            console.error("Error deleting tag:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          console.log(`Tag deleted successfully for lead ID ${leadId}`);
          res.json({ label, color }); // Send the deleted tag data as response
        }
      );
    }
  );
});

// Route to fetch notes
app.post("/fetchnotes1", (req, res) => {
  const leadId = req.body.id; // Extracting lead ID from the request body

  if (!leadId) {
    return res.status(400).json({ error: "Lead ID is required." });
  }

  // Prepare and execute the query to fetch notes
  const sql = "SELECT * FROM notesdb WHERE leadid = ?";
  db.query(sql, [leadId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      if (results.length > 0) {
        let notes = [];
        results.forEach((row) => {
          const formattedTimestamp = new Date(row.timestamp).toLocaleString(
            "en-US",
            { timeZone: "America/Chicago" }
          );
          const note = {
            id: row.id,
            creator: row.creator,
            timestamp: formattedTimestamp,
            notes: row.notes,
          };
          notes.push(note);
        });
        return res.json(notes);
      } else {
        return res
          .status(404)
          .json({ message: "No notes found for the given ID." });
      }
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
