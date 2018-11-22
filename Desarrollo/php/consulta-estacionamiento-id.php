<?php
include('functions.php');
$id_estacionamiento = $_GET["id_estacionamiento"];
if($resultset=getSQLResultSet("SELECT * FROM `estacionamientos` WHERE `id_estacionamiento` = '$id_estacionamiento' ORDER BY `nombre` ASC")){
	while ($row = $resultset->fetch_array(MYSQLI_NUM)){
		echo json_encode($row);
	}
}
?>
