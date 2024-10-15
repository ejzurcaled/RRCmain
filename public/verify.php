<?php
require 'userslogin_db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->confirmationCode)) {
    $email = $data->email;
    $confirmationCode = $data->confirmationCode;

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND verification_code = ?");
    $stmt->execute([$email, $confirmationCode]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Optionally update the user's status to 'verified'
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid verification code."]);
    }
}
?>
