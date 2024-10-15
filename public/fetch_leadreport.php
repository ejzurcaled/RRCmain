<?php

header("Content-Type: application/json");
// Database configuration
$servername = "srv1711.hstgr.io";
$username = "u376338418_root";
$password = "Mahalkita29@@";
$dbname = "u376338418_primeroadside";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch leads
$sql = "SELECT * FROM leads";
$result = $conn->query($sql);

$leads = array(); // Array to hold the leads

if ($result->num_rows > 0) {
    // Fetch the data and store it in the array
    while($row = $result->fetch_assoc()) {
        $leads[] = $row;
    }
}
// Close the database connection
$conn->close();

// Set header for JSON response
header('Content-Type: application/json');

// Return the leads as JSON
echo json_encode($leads);
?>
