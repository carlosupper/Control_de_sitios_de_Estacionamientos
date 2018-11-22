
<?php
include('functions.php');
$id_estacionamiento = $_GET["id_estacionamiento"];
if($resultset=getSQLResultSet("SELECT e.ocupados,e.nombre,a.nombre,e.total FROM `estacionamientos` as e INNER JOIN usuarios as a on usuario_id=id_usuarios WHERE `id_estacionamiento` = '$id_estacionamiento'")){
	while ($row = $resultset->fetch_array(MYSQLI_NUM)){
		echo json_encode($row);
	}
}
?>
