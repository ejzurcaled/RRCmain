<?php
// update_tags.php
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

// Get leadId and tags from POST request
$leadId = $_POST['leadid'];
$tags = $_POST['tags'];

// Update the tags for the specific leadId
$sql = "UPDATE leads SET tags = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $tags, $leadId);

if ($stmt->execute()) {
    echo json_encode(["message" => "Tags updated successfully."]);
} else {
    echo json_encode(["error" => "An error occurred while updating tags."]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
