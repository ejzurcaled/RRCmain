<?php
// update_lead.php
header("Content-Type: application/json");
include 'config.php';

// Get the raw POST data
$leadData = json_decode(file_get_contents('php://input'), true);

// Check if lead data is provided
if (!isset($leadData['leadidnumberhidden'])) {
    echo json_encode(["error" => "Lead ID is required."]);
    exit();
}

$id = $leadData['leadidnumberhidden'];
unset($leadData['leadidnumberhidden']); // Remove ID from lead data

// Prepare the SQL statement to prevent SQL injection
$setClause = [];
foreach ($leadData as $key => $value) {
    $setClause[] = "$key = '" . $connection->real_escape_string($value) . "'";
}

$sql = "UPDATE leads SET " . implode(", ", $setClause) . " WHERE id = '$id'";

if ($connection->query($sql) === TRUE) {
    // If update is successful
    $successMessage = "Lead updated successfully. Redirecting..";
    // Return the updated leadId
    echo json_encode(["leadId" => $id, "message" => $successMessage]);
} else {
    // Handle error
    echo json_encode(["error" => "An error occurred while updating data."]);
    error_log("Error updating lead: " . $connection->error);
}

$connection->close(); // Close the database connection
?>
