<?php
// MySQL database credentials
$servername = "srv1711.hstgr.io";
$username = "u376338418_root";
$password = "Mahalkita29@@";
$dbname = "u376338418_primeroadside";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from POST request and sanitize inputs
function sanitize($conn, $data) {
    return $conn->real_escape_string($data);
}

// Retrieve and sanitize data from POST request
$clientname = sanitize($conn, $_POST['clientname']);
$companyname = sanitize($conn, $_POST['companyname']);
$phone = sanitize($conn, $_POST['phone']);
$ext = sanitize($conn, $_POST['ext']);
$email = sanitize($conn, $_POST['email']);
$address = sanitize($conn, $_POST['address']);
$unit = sanitize($conn, $_POST['unit']);
$city = sanitize($conn, $_POST['city']);
$region = sanitize($conn, $_POST['region']);
$postalcode = sanitize($conn, $_POST['postalcode']);
$country = sanitize($conn, $_POST['country']);
$servicearea = sanitize($conn, $_POST['servicearea']);
$jobtype = sanitize($conn, $_POST['jobtype']);
$jobsource = sanitize($conn, $_POST['jobsource']);
$jobdescription = sanitize($conn, $_POST['jobdescription']);
$timepickerStart = sanitize($conn, $_POST['timepickerStart']);
$datepicker = sanitize($conn, $_POST['datepicker']);
$datepickerEnd = sanitize($conn, $_POST['datepickerEnd']);
$timepickerEnd = sanitize($conn, $_POST['timepickerEnd']);
$specialjobs = sanitize($conn, $_POST['specialjobs']);
$highprofitjobs = sanitize($conn, $_POST['highprofitjobs']);
$cancellationfee = sanitize($conn, $_POST['cancellationfee']);
$cancellationreason = sanitize($conn, $_POST['cancellationreason']);
$year = sanitize($conn, $_POST['year']);
$make = sanitize($conn, $_POST['make']);
$model = sanitize($conn, $_POST['model']);
$agentname = sanitize($conn, $_POST['agentname']);
$inscompname = sanitize($conn, $_POST['inscompname']);
$insagentname = sanitize($conn, $_POST['insagentname']);
$insponumber = sanitize($conn, $_POST['insponumber']);
$insGOA = sanitize($conn, $_POST['insGOA']);
$insEMAIL = sanitize($conn, $_POST['insEMAIL']);
$persongivequote = sanitize($conn, $_POST['persongivequote']);
$pricequote = sanitize($conn, $_POST['pricequote']);
$eta = sanitize($conn, $_POST['eta']);
$transactionnumber = sanitize($conn, $_POST['transactionnumber']);
$transactiongrandtotal = sanitize($conn, $_POST['transactiongrandtotal']);
$dispatchername = sanitize($conn, $_POST['dispatchername']);
$dispatchedby = sanitize($conn, $_POST['dispatchedby']);
$vendorquote1 = sanitize($conn, $_POST['vendorquote1']);
$vendorquote2 = sanitize($conn, $_POST['vendorquote2']);
$vendorquote3 = sanitize($conn, $_POST['vendorquote3']);
$vendorquote4 = sanitize($conn, $_POST['vendorquote4']);
$vendorquote5 = sanitize($conn, $_POST['vendorquote5']);
$vendorquote6 = sanitize($conn, $_POST['vendorquote6']);
$vendorquote7 = sanitize($conn, $_POST['vendorquote7']);
$vendorquote8 = sanitize($conn, $_POST['vendorquote8']);
$vendorquote9 = sanitize($conn, $_POST['vendorquote9']);
$vendorquote10 = sanitize($conn, $_POST['vendorquote10']);
$vendorquote11 = sanitize($conn, $_POST['vendorquote11']);
$vendorquote12 = sanitize($conn, $_POST['vendorquote12']);
$vendorquote13 = sanitize($conn, $_POST['vendorquote13']);
$vendorquote14 = sanitize($conn, $_POST['vendorquote14']);
$vendorquote15 = sanitize($conn, $_POST['vendorquote15']);
$vendorquote16 = sanitize($conn, $_POST['vendorquote16']);
$vendorquote17 = sanitize($conn, $_POST['vendorquote17']);
$vendorquote18 = sanitize($conn, $_POST['vendorquote18']);
$vendorquote19 = sanitize($conn, $_POST['vendorquote19']);
$vendorquote20 = sanitize($conn, $_POST['vendorquote20']);
$vendorquote21 = sanitize($conn, $_POST['vendorquote21']);
$vendorquote22 = sanitize($conn, $_POST['vendorquote22']);
$vendorquote23 = sanitize($conn, $_POST['vendorquote23']);
$vendorquote24 = sanitize($conn, $_POST['vendorquote24']);
$vendorquote25 = sanitize($conn, $_POST['vendorquote25']);
$vendorquote26 = sanitize($conn, $_POST['vendorquote26']);
$vendorquote27 = sanitize($conn, $_POST['vendorquote27']);
$vendorquote28 = sanitize($conn, $_POST['vendorquote28']);
$vendorquote29 = sanitize($conn, $_POST['vendorquote29']);
$vendorquote30 = sanitize($conn, $_POST['vendorquote30']);

// Insert data into the database
$sql = "INSERT INTO leads (clientname, companyname, phone, ext, email, address, unit, city, region, postalcode, country, servicearea, jobtype, jobsource, jobdescription, timepickerStart, datepickerEnd, datepicker, timepickerEnd, specialjobs, highprofitjobs, cancellationfee, cancellationreason, year, make, model, agentname, inscompname, insagentname, insponumber, insGOA, insEMAIL, persongivequote, pricequote, eta, transactionnumber, transactiongrandtotal, dispatchername, dispatchedby, vendorquote1, vendorquote2, vendorquote3, vendorquote4, vendorquote5, vendorquote6, vendorquote7, vendorquote8, vendorquote9, vendorquote10, vendorquote11, vendorquote12, vendorquote13, vendorquote14, vendorquote15, vendorquote16, vendorquote17, vendorquote18, vendorquote19, vendorquote20, vendorquote21, vendorquote22, vendorquote23, vendorquote24, vendorquote25, vendorquote26, vendorquote27, vendorquote28, vendorquote29, vendorquote30) 
VALUES ('$clientname', '$companyname', '$phone', '$ext', '$email', '$address', '$unit', '$city', '$region', '$postalcode', '$country', '$servicearea', '$jobtype', '$jobsource', '$jobdescription', '$timepickerStart', '$datepickerEnd', '$datepicker', '$timepickerEnd', '$specialjobs', '$highprofitjobs', '$cancellationfee', '$cancellationreason', '$year', '$make', '$model', '$agentname', '$inscompname', '$insagentname', '$insponumber', '$insGOA', '$insEMAIL', '$persongivequote', '$pricequote', '$eta', '$transactionnumber', '$transactiongrandtotal', '$dispatchername', '$dispatchedby', '$vendorquote1', '$vendorquote2', '$vendorquote3', '$vendorquote4', '$vendorquote5', '$vendorquote6', '$vendorquote7', '$vendorquote8', '$vendorquote9', '$vendorquote10', '$vendorquote11', '$vendorquote12', '$vendorquote13', '$vendorquote14', '$vendorquote15', '$vendorquote16', '$vendorquote17', '$vendorquote18', '$vendorquote19', '$vendorquote20', '$vendorquote21', '$vendorquote22', '$vendorquote23', '$vendorquote24', '$vendorquote25', '$vendorquote26', '$vendorquote27', '$vendorquote28', '$vendorquote29', '$vendorquote30')";

if ($conn->query($sql) === TRUE) {
    echo "Data saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>