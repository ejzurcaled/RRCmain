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

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    echo json_encode(["error" => "Invalid request method"]);
    exit();
}

// Get the leadId from the URL
$leadId = isset($_GET['leadId']) ? $_GET['leadId'] : null;

// Parse input from DELETE request (label and color)
$data = json_decode(file_get_contents("php://input"), true);
$label = $data['label'] ?? null; // Default to null if not set
$color = $data['color'] ?? null; // Default to null if not set

if ($leadId === null) {
    echo json_encode(["error" => "Lead ID not provided"]);
    exit();
}

// Fetch the existing tag data for the given lead ID
$sql = "SELECT tag_data FROM leads WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $leadId);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $existingTagData = json_decode($row['tag_data'], true);

        // Filter out the tag with matching label (case-insensitive) and color
        $updatedTagData = array_filter($existingTagData, function ($tag) use ($label, $color) {
            return !(strtolower($tag['label']) === strtolower($label) && $tag['color'] === $color);
        });

        // Update the tag_data in the database
        $update_sql = "UPDATE leads SET tag_data = ? WHERE id = ?";
        $update_stmt = $conn->prepare($update_sql);
        $updatedTagJson = json_encode(array_values($updatedTagData)); // Reindex array after filtering
        $update_stmt->bind_param("ss", $updatedTagJson, $leadId);

        if ($update_stmt->execute()) {
            // Return the deleted tag information as the response
            echo json_encode(["label" => $label, "color" => $color]);
        } else {
            echo json_encode(["error" => "Error updating tag data"]);
        }

        $update_stmt->close();
    } else {
        echo json_encode(["error" => "No tag found for the given lead ID"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Error fetching tags"]);
}

// Close the database connection
$conn->close();
?>
