<?php
// fetch_lead.php
header("Content-Type: application/json");
include 'config.php';

$leadId = $_GET['id'];
$sql = "SELECT * FROM leads WHERE id = '$leadId'";
$result = $connection->query($sql);

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Lead not found."]);
    exit();
}

echo json_encode($result->fetch_assoc());
?>
