<?php
// update_lead_status.php
header("Content-Type: application/json");
include 'config.php';

$request = json_decode(file_get_contents('php://input'), true);
$leadId = $request['leadId'];
$newStatus = $request['newStatus'];

if (!$leadId || !$newStatus) {
    echo json_encode(["error" => "Lead ID and new status are required."]);
    exit();
}

$sql = "UPDATE leads SET status = '$newStatus' WHERE id = '$leadId'";
if ($connection->query($sql) === TRUE) {
    echo json_encode(["leadId" => $leadId, "message" => "Lead status updated successfully."]);
} else {
    echo json_encode(["error" => "An error occurred while updating lead status."]);
}
?>
