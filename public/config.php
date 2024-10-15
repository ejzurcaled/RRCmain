<?php
// config.php
$host = "srv1711.hstgr.io";
$user = "u376338418_root";
$password = "Mahalkita29@@";
$database = "u376338418_primeroadside";

$connection = new mysqli($host, $user, $password, $database);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
?>
