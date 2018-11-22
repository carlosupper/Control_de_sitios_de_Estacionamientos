<?php
/*
  Aquí se conecta a la base de datos para obtener la información de los
  estacionamientos y se hace el parseo en formato .JSON para después manejar
  esos datos en "main.js".
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//header("Content-Type: /opt/lampp/htdocs/Proyects I+D1/Control_de_sitios_de_Estacionamientos/Desarrollo/scripts/main.js; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "control_de_sitios_de_estacionamientos");

//Esta función corrige el problema de los acentos.
mysqli_query ($conn,"SET NAMES 'utf8'");

$result = $conn->query("SELECT nombre,direccion,notas,horario,precio,latitud,longitud,total,ocupados FROM estacionamientos");

$outp = '{"Est":[{';
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
if ($outp != '{"Est":[{') {$outp .= ",{";}
    $outp .= '"Nombre":"'  . $rs["nombre"] . '",';
    $outp .= '"Direccion":"'   . $rs["direccion"]        . '",';
    $outp .= '"Notas":"'. $rs["notas"]     . '",';
    $outp .= '"Horario":"'. $rs["horario"]     . '",';
    $outp .= '"Precio":"'. $rs["precio"]     . '",';
    $outp .= '"Total":"'. $rs["total"]     . '",';
    $outp .= '"Ocupados":"'. $rs["ocupados"]     . '",';
    $outp .= '"Latitud":"'. $rs["latitud"]     . '",';
    $outp .= '"Longitud":"'. $rs["longitud"]     . '"}';
}
$outp .= "]}";
$conn->close();

echo ($outp);

 ?>
