<?php
// Database configuration
$servername = "srv1711.hstgr.io";
$username  = "u376338418_root";
$password  = "Mahalkita29@@";
$dbname  = "u376338418_primeroadside";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve lead data from the request
$leadData = json_decode(file_get_contents('php://input'), true);

if (!$leadData) {
    echo json_encode(["error" => "No data received"]);
    exit;
}

// Define columns for the INSERT query
$columns = [
    "clientname", "companyname", "phone", "ext", "email", "address", "unit", "city", 
    "region", "postalcode", "country", "servicearea", "jobtype", "jobsource", "jobdescription", 
    "timepickerStart", "datepickerEnd", "datepicker", "timepickerEnd", "specialjobs", 
    "highprofitjobs", "cancellationfee", "cancellationreason", "year", "make", "model", 
    "agentname", "inscompname", "insagentname", "insponumber", "insGOA", "insEMAIL", 
    "persongivequote", "pricequote", "eta", "transactionnumber", "transactiongrandtotal", 
    "dispatchername", "dispatchedby", "vendorquote1", "vendorquote2", "vendorquote3", 
    "vendorquote4", "vendorquote5", "vendorquote6", "vendorquote7", "vendorquote8", 
    "vendorquote9", "vendorquote10", "vendorquote11", "vendorquote12", "vendorquote13", 
    "vendorquote14", "vendorquote15", "vendorquote16", "vendorquote17", "vendorquote18", 
    "vendorquote19", "vendorquote20", "vendorquote21", "vendorquote22", "vendorquote23", 
    "vendorquote24", "vendorquote25", "vendorquote26", "vendorquote27", "vendorquote28", 
    "vendorquote29", "vendorquote30"
];

// Prepare the values for the INSERT query
$values = [];
foreach ($columns as $col) {
    $values[] = isset($leadData[$col]) ? $conn->real_escape_string($leadData[$col]) : null;
}

// Create the SQL query
$sql = "INSERT INTO leads (" . implode(", ", $columns) . ") VALUES (" . implode(", ", array_fill(0, count($columns), "?")) . ")";

// Prepare the statement
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "Error preparing statement: " . $conn->error]);
    exit;
}

// Bind parameters (Assuming all fields are strings; adjust as needed)
$types = str_repeat('s', count($values)); // Change this if necessary for specific data types
$stmt->bind_param($types, ...$values);

// Execute the statement
if ($stmt->execute()) {
    // Get the last inserted ID
    $lastInsertedId = $conn->insert_id;
    echo json_encode(["message" => "Lead saved successfully", "leadId" => $lastInsertedId]);
} else {
    echo json_encode(["error" => "Error saving lead: " . $stmt->error]);
}

// Close connection
$stmt->close();
$conn->close();
?>
