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

// Query the database to fetch all tags
$sql = "SELECT tag_data FROM tags_db";
$result = $conn->query($sql);

if ($result === false) {
    // Handle query error
    echo json_encode(["error" => "Internal Server Error"]);
} else {
    if ($result->num_rows === 0) {
        // No tags found
        echo json_encode(["error" => "No tags available"]);
    } else {
        // Fetch all the tags and process them
        $allTags = [];
        while ($row = $result->fetch_assoc()) {
            $tags = json_decode($row['tag_data'], true); // Decode JSON data
            if (is_array($tags)) {
                $allTags = array_merge($allTags, $tags); // Merge all tags into one array
            }
        }
        echo json_encode($allTags); // Send tags as JSON response
    }
}

// Close the database connection
$conn->close();
?>
