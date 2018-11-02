<?php
include('functions.php');
$nombre = $_GET["nombre"];
if($resultset=getSQLResultSet("SELECT * FROM `estacionamientos` WHERE `nombre` = '$nombre' ORDER BY `nombre` ASC")){
	while ($row = $resultset->fetch_array(MYSQLI_NUM)){
		echo json_encode($row);
	}
}
?>
