import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Save the original console.error method
/* const originalError = console.error; */

// Override console.error to suppress specific warning
console.error = (...args) => {
  const [firstArg] = args;
  if (
    typeof firstArg === "string" &&
    firstArg.startsWith("Warning: ReactDOM.render is no longer supported")
  ) {
    return; // Suppress the specific warning
  }
  // Log other errors or warnings
  /* originalError(...args); */
};

// Render the App component
ReactDOM.render(<App />, document.getElementById("root"));
