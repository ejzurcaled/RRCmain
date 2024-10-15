import React, { useState, useEffect } from "react";

function NotesTest() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [editedContent, setEditedContent] = useState("");

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

  const handleEditNote = (noteId) => {
    const noteToEdit = notes.find((note) => note.id === noteId);
    setEditingNote(noteToEdit);
    setEditedContent(noteToEdit.notes);
  };

  const handleSaveNote = () => {
    // Update the note on the backend
    if (!editingNote) return;

    fetch("http://localhost:8081/updatenote", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: editingNote.id, notes: editedContent }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchNotes();
        setEditingNote(null);
        setEditedContent("");
      })
      .catch((error) => console.error("Error updating note:", error));
  };

  const handleDeleteNote = (noteId) => {
    // Delete the note on the backend
    fetch("http://localhost:8081/deletenote", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: noteId }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchNotes();
      })
      .catch((error) => console.error("Error deleting note:", error));
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
                  {editingNote && editingNote.id === note.id ? (
                    <textarea
                      className="noteTextArea"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                  ) : (
                    <p className="note">{note.notes}</p>
                  )}
                  {editingNote && editingNote.id === note.id ? (
                    <button onClick={handleSaveNote}>Save</button>
                  ) : (
                    <button
                      className="editnotes-1"
                      onClick={() => handleEditNote(note.id)}
                    >
                      Edit/Update
                    </button>
                  )}
                  <button
                    className="deletenotes-1"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NotesTest;
