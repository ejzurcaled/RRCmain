import React, { useState, useEffect } from "react";
import "../components/style.css";

function NotesTest() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [editingContainerVisible, setEditingContainerVisible] = useState(false);

  useEffect(() => {
    // Make API call to fetch notes when component mounts
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    // Get the lead id from the input field
    const leadId = document.getElementById("leadidnumberhidden7").value;

    // Make a POST request to the API endpoint
    fetch("http://localhost:8081/fetchnotes1", {
      // Specify port 8081
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: leadId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update state with fetched notes
        setNotes(data);
        setError(null); // Clear any previous error
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        setError("No notes found!");
        setNotes([]); // Clear notes in case of error
      });
  };

  const handleEdit = (note) => {
    // Set values of inputs in editing container
    setEditingNote(note);
    setEditingContainerVisible(true); // Show the editing container
  };

  const handleCancel = () => {
    // Clear editing note and hide the editing container
    setEditingNote(null);
    setEditingContainerVisible(false);
  };

  return (
    <div>
      <h1>Notes</h1>
      {error && <div className="error">{error}</div>}
      <input
        type="hidden"
        id="leadidnumberhidden7"
        name="id"
        value="168"
        readOnly
      />
      <div className="noteList">
        <ul>
          {notes.map((note) => (
            <li className="notesItems" key={note.id}>
              <div className="message">
                <div className="messageContent">
                  <p className="author">{note.creator}</p>
                  <p className="timestamp">{note.timestamp}</p>
                  <p className="note">{note.notes}</p>
                  <button
                    className="editnotes-1"
                    id="editnotes-1"
                    onClick={() => handleEdit(note)}
                  >
                    Edit/Update
                  </button>
                  <button className="deletenotes-1" id="deletenotes-1">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {editingContainerVisible && (
        <div className="editing-container1 visible">
          <h3>Editing Container</h3>
          <input
            className="creator-input"
            id="creator-input"
            placeholder="Creator:"
            value={editingNote ? editingNote.creator : ""}
            readOnly
          />
          <input
            className="timestamp-input"
            id="timestamp-input"
            placeholder="TimeStamp:"
            value={editingNote ? editingNote.timestamp : ""}
            readOnly
          />
          <textarea
            className="notes-input"
            id="notes-input"
            placeholder="Notes:"
            defaultValue={editingNote ? editingNote.notes : ""}
          />
          <button onClick={handleCancel}>Cancel</button>
          <button>Save</button>
        </div>
      )}
    </div>
  );
}

export default NotesTest;
