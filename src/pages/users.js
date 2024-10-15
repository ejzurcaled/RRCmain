import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Header from "../components/header.js";
import Navbar from "../components/nav.js";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    username: "",
    email: "",
    accounttype: "", // Make sure to use 'type' here for account type
  });
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/rrc/SignIn");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://roadrescueconnect.com/rrc/userslist.php"
      );
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (selectedUser) {
      const response = await fetch(
        `https://roadrescueconnect.com/rrc/delete_user.php?id=${selectedUser.id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setShowDeleteModal(false);
      } else {
        console.error("Failed to delete user.");
      }
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setUpdatedUser({
      name: user.name,
      username: user.username,
      email: user.email,
      accounttype: user.accounttype, // Properly setting the 'type' field
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleEditUser = async () => {
    const response = await fetch(
      `https://roadrescueconnect.com/rrc/edit_user.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedUser.id, ...updatedUser }),
      }
    );
    if (response.ok) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsers);
      setShowEditModal(false);
    } else {
      console.error("Failed to update user.");
    }
  };

  return (
    <div>
      <Header onSignOut={handleSignOut} />
      <Navbar onSignOut={handleSignOut} />
      <div className="main-content1">
        <h1>USERS</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Account Type</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.accounttype}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => openEditModal(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => openDeleteModal(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Confirmation</h5>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete user {selectedUser?.name}?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={updatedUser.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Account Type</label>
                    <input
                      type="text"
                      className="form-control"
                      name="accounttype"
                      value={updatedUser.accounttype}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={updatedUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditUser}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
