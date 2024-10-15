<?php
// delete_note.php
header("Content-Type: application/json");
include 'config.php';

$request = json_decode(file_get_contents('php://input'), true);
$noteId = $request['id'];

if (!$noteId) {
    echo json_encode(["error" => "Note ID is required."]);
    exit();
}

$sql = "DELETE FROM notesdb WHERE id = '$noteId'";
if ($connection->query($sql) === TRUE) {
    echo json_encode(["message" => "Note deleted successfully."]);
} else {
    echo json_encode(["error" => "An error occurred while deleting note."]);
}
?>
