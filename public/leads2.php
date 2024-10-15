<?php

header("Content-Type: application/json");
// Database connection parameters
$servername = "srv1711.hstgr.io";
$username = "u376338418_root";
$password = "Mahalkita29@@";
$dbname = "u376338418_primeroadside";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get the lead ID from the URL
$leadId = isset($_GET['id']) ? intval($_GET['id']) : 0; // Ensure it's an integer

// Prepare the SQL statement to fetch the user data
$sql = "SELECT * FROM leads WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $leadId);
$stmt->execute();
$result = $stmt->get_result();

// Check for errors and handle the response
if ($result->num_rows === 0) {
    echo json_encode(["error" => "User not found"]);
} else {
    // Fetch the user data as an associative array
    $userData = $result->fetch_assoc();
    echo json_encode($userData); // Send the user data as a JSON response
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
