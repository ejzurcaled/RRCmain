<?php
// add_note.php
header("Content-Type: application/json");
include 'config.php';

$request = json_decode(file_get_contents('php://input'), true);
$noteInput11 = $request['noteInput11'];
$leadid = $request['leadid'];
$creator = "Jaime"; // Static value

if (!$noteInput11 || !$leadid) {
    echo json_encode(["error" => "Note content and lead ID are required."]);
    exit();
}

$currentDateTimeCT = date('Y-m-d H:i:s'); // Current date and time

$sql = "INSERT INTO notesdb (notes, leadid, creator, timestamp) VALUES ('$noteInput11', '$leadid', '$creator', '$currentDateTimeCT')";
if ($connection->query($sql) === TRUE) {
    echo json_encode(["message" => "Note added successfully."]);
} else {
    echo json_encode(["error" => "An error occurred while adding note."]);
}
?>
