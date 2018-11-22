<?php
include_once 'database.php';
class Autocompletar extends Database{

  function buscar($texto){
    $res = array();
    $query = $this->connect()->prepare('SELECT nombre_area FROM zonas WHERE nombre_area LIKE :texto');
    $query->execute(['texto' => $texto . '%']);

    if ($query->rowCount()){
      while ($r = $query->fetch()) {
        array_push($res, $r['nombre_area']);
      }
     }
    return $res;
}
}
?>
