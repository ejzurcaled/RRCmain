<?php
$servername = "srv1711.hstgr.io";
$username = "u376338418_root";
$password = "Mahalkita29@@";
$dbname = "u376338418_primeroadside";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the lead ID from the request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read the raw input and decode JSON
    $input = json_decode(file_get_contents("php://input"), true);
    
    if (isset($input['lead_id'])) {
        $leadId = $input['lead_id'];

        // Prepare and bind
        $stmt = $conn->prepare("DELETE FROM leads WHERE id = ?");
        $stmt->bind_param("i", $leadId);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Lead deleted successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error deleting lead: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "No lead ID provided."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

$conn->close();
?>
