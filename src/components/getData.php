<?php
// Database connection parameters
$servername = "srv1711.hstgr.io";
$username = "u376338418_root";
$password = "Mahalkita29@@";
$dbname = "u376338418_primeroadside";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to get data
$sql = "SELECT status, COUNT(*) as count FROM leads GROUP BY status";

$result = $conn->query($sql);

// Prepare data for JSON
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = array(
        "label" => $row['status'],
        "value" => $row['count']
    );
}

// Close connection
$conn->close();

// Output data as JSON
echo json_encode($data);
?>