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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['id'])) {
    $id = intval($_GET['id']); // Get ID from query parameter and convert to integer
    // echo "Received ID: " . htmlspecialchars($id); // Avoid echoing plain text

    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['tag_data'])) {
        http_response_code(400);
        echo json_encode(["error" => "Tag data is missing"]);
        return;
    }
    
    $tag_data = $data['tag_data'];

    // Check if the label already exists for the ID
    $stmt = $conn->prepare("SELECT tag_data FROM tags_db WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["error" => "No tags found for this ID"]);
            return;
        }

        $row = $result->fetch_assoc();
        $existingTagData = json_decode($row['tag_data'], true);

        $existingLabel = array_filter($existingTagData, function ($tag) use ($tag_data) {
            return strtolower($tag['label']) === strtolower($tag_data['label']);
        });

        if (!empty($existingLabel)) {
            http_response_code(400);
            echo json_encode(["error" => "Tag label already exists"]); // Return JSON
            return;
        }

        $updatedTagData = array_merge($existingTagData, [$tag_data]);
        $stmt = $conn->prepare("UPDATE tags_db SET tag_data = ? WHERE id = ?");
        $stmt->bind_param("si", json_encode($updatedTagData), $id);

        if ($stmt->execute()) {
            echo json_encode(["id" => $id, "tag_data" => $updatedTagData]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Internal Server Error"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error checking existing tags"]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request"]);
}

$conn->close();
?>
