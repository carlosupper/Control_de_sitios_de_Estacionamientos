<?php
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
header( 'Content-Type: text/html;charset=utf-8' );
function ejecutarSQLCommand($commando){

  $mysqli = new mysqli("localhost", "root", "", "control_de_sitios_de_estacionamientos");

  mysqli_set_charset($mysqli, "utf8");
/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
if ( $mysqli->multi_query($commando)) {
     if ($resultset = $mysqli->store_result()) {
      while ($row = $resultset->fetch_array(MYSQLI_BOTH)) {

      }
      $resultset->free();
     }


}
$mysqli->close();
}
function getSQLResultSet($commando){

  $mysqli = new mysqli("localhost", "root", "", "control_de_sitios_de_estacionamientos");

  mysqli_set_charset($mysqli, "utf8");
/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
if ( $mysqli->multi_query($commando)) {
  return $mysqli->store_result();
}
$mysqli->close();
}
?>
