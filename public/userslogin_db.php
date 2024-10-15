<?php
$host = 'srv1711.hstgr.io';
$db = 'u376338418_root';
$user = 'Mahalkita29@@';
$pass = 'u376338418_primeroadside';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Could not connect to the database $db :" . $e->getMessage());
}
?>
