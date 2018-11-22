<?php
  include ('functions.php');
  
  $id_estacionamiento = $_GET['id_estacionamiento'];
  $OCUPADOS=$_GET['ocupados'];
  ejecutarSQLCommand("UPDATE estacionamientos SET ocupados='$OCUPADOS' WHERE id_estacionamiento= '$id_estacionamiento'");
 ?>
