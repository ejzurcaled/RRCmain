<?php
// fetch_notes.php
header("Content-Type: application/json");
include 'config.php';

$request = json_decode(file_get_contents('php://input'), true);
$leadId = $request['id'];

if (!$leadId) {
    echo json_encode(["error" => "Lead ID is required."]);
    exit();
}

$sql = "SELECT id, creator, timestamp, notes FROM notesdb WHERE leadid = '$leadId'";
$result = $connection->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['timestamp'] = date('Y-m-d H:i:s', strtotime($row['timestamp']));
        $data[] = $row;
    }
}
echo json_encode($data);
?>
