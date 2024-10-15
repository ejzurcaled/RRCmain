<?php
// fetch_user.php
header("Content-Type: application/json");
include 'config.php';

$userId = $_GET['id'];
$sql = "SELECT * FROM users WHERE id = '$userId'";
$result = $connection->query($sql);

if ($result->num_rows === 0) {
    echo json_encode(["error" => "User not found."]);
    exit();
}

echo json_encode($result->fetch_assoc());
?>
