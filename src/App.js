import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tabs from "./pages/Tabs";
import Dashboard from "./pages/Dashboard";
import NewLead from "./pages/newleads";
import Users from "./pages/users";
import Clients from "./pages/clients";
import Schedule from "./pages/schedule";
import Jobreports from "./pages/jobreports";
import Leadreports from "./pages/leadreports";
import Reports from "./pages/reports";
import Signout from "./pages/signout";
import Leads from "./pages/leads";
import Testing from "./pages/testing";
import Notes from "./pages/notesTest.js";
import WorkOrderForm from "./pages/WorkOrderForm.js";
import SignWorkOrder from "./pages/SignWorkOrder.js";
import WorkOrderPDF from "./pages/WorkOrderPDF.js";
import GetLocation from "./components/GetLocation.js";
import InvoiceForm from "./pages/InvoiceForm.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import PrivateRoute from "./components/privateroute.js"; // Import the PrivateRoute component
import Logout from "./pages/logout.js"; // Import the Logout component
import "./App.css";
import "./components/style.css";
import "@popperjs/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/function.js";
import "./components/Navbar.js";
import "./leadreports.css";
import "react-modal";
import "react-data-table-component";
import "datatables.net";

function App() {
  return (
    <div>
      <BrowserRouter basename="/rrc">
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Tabs" element={<Tabs />} />
          <Route path="/Leadreports" element={<Leadreports />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Leads" element={<Leads />} />
          <Route path="/GetLocation" element={<GetLocation />} />
          <Route path="/NewLead" element={<NewLead />} />
          <Route path="/Users" element={<Users />} />

          {/* Protect the routes by wrapping them with PrivateRoute */}
          {/* <Route
            path="/NewLead"
            element={
              <PrivateRoute>
                <NewLead />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/Tabs"
            element={
              <PrivateRoute>
                <Tabs />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/Users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/Clients"
            element={
              <PrivateRoute>
                <Clients />
              </PrivateRoute>
            }
          />
          <Route
            path="/Schedule"
            element={
              <PrivateRoute>
                <Schedule />
              </PrivateRoute>
            }
          />
          <Route
            path="/Jobreports"
            element={
              <PrivateRoute>
                <Jobreports />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/Leadreports"
            element={
              <PrivateRoute>
                <Leadreports />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/Reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />
          <Route
            path="/Signout"
            element={
              <PrivateRoute>
                <Login />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/Leads"
            element={
              <PrivateRoute>
                <Leads />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/Testing"
            element={
              <PrivateRoute>
                <Testing />
              </PrivateRoute>
            }
          />
          <Route
            path="/Notes"
            element={
              <PrivateRoute>
                <Notes />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/GetLocation"
            element={
              <PrivateRoute>
                <GetLocation />
              </PrivateRoute>
            }
          /> */}
          {/* Add the logout route */}
          <Route path="/" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
