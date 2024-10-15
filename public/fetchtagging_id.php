<?php
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

// Get ID from the request URL
$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id === null) {
    // If ID is not provided, return a 400 Bad Request response
    http_response_code(400);
    echo json_encode(['error' => 'ID parameter is required']);
    exit;
}

// Log ID for debugging
error_log("Request received for fetching tags from ID: " . $id);

// Prepare the SQL query to fetch tag data
$query = "SELECT tag_data FROM leads WHERE id = ?";
$stmt = $conn->prepare($query);  // Corrected: use $conn instead of $db
$stmt->bind_param("i", $id); // Assuming ID is an integer
$stmt->execute();
$result = $stmt->get_result();

// Check for errors in the query execution
if ($stmt->error) {
    error_log("Error fetching tags: " . $stmt->error);
    http_response_code(500);
    echo json_encode(['error' => 'Internal Server Error']);
    exit;
}

// Fetch the results
if ($result->num_rows === 0) {
    // If no tags found for the ID
    error_log("No tags available for ID: " . $id);
    http_response_code(404);
    echo json_encode(['error' => 'No tags available for this ID']);
    exit;
}

// Tags fetched successfully
$row = $result->fetch_assoc();
$tagData = $row['tag_data']; // Get the tag_data

// Send the response
header('Content-Type: application/json');
echo json_encode($tagData);

// Close the statement and connection
$stmt->close();
$conn->close();  // Corrected: use $conn instead of $db
?>
