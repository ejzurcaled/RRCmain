<?php
// update_note.php
header("Content-Type: application/json");
include 'config.php';

$request = json_decode(file_get_contents('php://input'), true);
$id = $request['id'];
$notes = $request['notes'];

if (!$id || !$notes) {
    echo json_encode(["error" => "Note ID and updated notes are required."]);
    exit();
}

$sql = "UPDATE notesdb SET notes = '$notes' WHERE id = '$id'";
if ($connection->query($sql) === TRUE) {
    echo json_encode(["message" => "Note updated successfully."]);
} else {
    echo json_encode(["error" => "An error occurred while updating note."]);
}
?>
