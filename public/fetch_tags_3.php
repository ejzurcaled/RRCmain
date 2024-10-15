<?php
header("Content-Type: application/json");

$servername = "srv1711.hstgr.io";
$username = "u376338418_root";
$password = "Mahalkita29@@";
$dbname = "u376338418_primeroadside";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['leadId']) || !isset($data['tag_data'])) {
        http_response_code(400);
        echo json_encode(["error" => "Lead ID or tag data is missing"]);
        return;
    }

    $leadId = $data['leadId'];
    $tag_data = $data['tag_data'];

    $stmt = $conn->prepare("SELECT tag_data FROM leads WHERE id = ?");
    $stmt->bind_param("i", $leadId);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Lead not found"]);
            return;
        }

        $row = $result->fetch_assoc();
        $existingTagData = json_decode($row['tag_data'], true);

        $existingLabel = array_filter($existingTagData, function ($tag) use ($tag_data) {
            return strtolower($tag['label']) === strtolower($tag_data['label']);
        });

        if (!empty($existingLabel)) {
            http_response_code(400);
            echo json_encode(["error" => "Tag label already exists"]); // Return JSON response
            return;
        }

        $updatedTagData = array_merge($existingTagData, [$tag_data]);
        $stmt = $conn->prepare("UPDATE leads SET tag_data = ? WHERE id = ?");
        $stmt->bind_param("si", json_encode($updatedTagData), $leadId);

        if ($stmt->execute()) {
            header('Content-Type: application/json');
            echo json_encode(["id" => $leadId, "tag_data" => $updatedTagData]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Internal Server Error"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Internal Server Error"]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request"]);
}

$conn->close();
?>
