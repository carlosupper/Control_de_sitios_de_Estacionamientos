
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//header("Content-Type: /opt/lampp/htdocs/Proyects I+D1/Control_de_sitios_de_Estacionamientos/Desarrollo/scripts/main.js; charset=UTF-8");

$conn = new mysqli("localhost", "root", "sayyeah1993", "control_de_sitios_de_estacionamientos");

$result = $conn->query("SELECT nombre,direccion,notas,horario,precio,latitud,longitud FROM estacionamientos");

$outp = '{"Est":[{';
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
if ($outp != '{"Est":[{') {$outp .= ",{";}
    $outp .= '"Nombre":"'  . $rs["nombre"] . '",';
    $outp .= '"Direccion":"'   . $rs["direccion"]        . '",';
    $outp .= '"Notas":"'. $rs["notas"]     . '",';
    $outp .= '"Horario":"'. $rs["horario"]     . '",';
    $outp .= '"Precio":"'. $rs["precio"]     . '",';
    $outp .= '"Latitud":"'. $rs["latitud"]     . '",';
    $outp .= '"Longitud":"'. $rs["longitud"]     . '"}';
}
$outp .= "]}";
$conn->close();
echo ($outp);

 ?>
