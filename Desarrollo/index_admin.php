<?php

  $id_Recv=$_GET["idEst"];

?>


<!DOCTYPE html>
<html lang="es">

  <head>
    <meta charset="utf-8">
    <title>Control de sitios de Estacionamiento</title>
    <!-- BOOTSTRAP 4 -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <!-- GOOGLE FONTS (ROBOTO) -->
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <!-- CUSTOM CSS -->
    <link rel="stylesheet" href="css/style.css">
      <!-- UPDATE CAJONES SCRIPT -->
    <script type="text/javascript" src="scripts/update.js"></script>
    <!-- actualiza en tiempo -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

  </head>




  <!-- BODY  -->
  <body>

    <!-- NAVIGATION -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top color-nav">
      <div class="container">
        <a class="navbar-brand" href="#inicio">
          <img src="img/logo.png" width="35" height="35" class="d-inline-block align-top" alt="Inicio">
            F-Estacionamientos
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">

          <!-- ml-auto -> MarginLeft-auto -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="index_admin.html">Inicio</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="ranking.html">Ranking</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="perfil.html">Perfil</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="help.html">Ayuda</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="about.html">About</a>
            </li>
                        <li class="nav-item active">
              <a class="nav-link" href="php/cerrar.php">Salir</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    <div class="container mt-5"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 centrar">
          <h1 class="mt-5">Bienvenido, <h3 id="nombre"></h3></h1>
          <h1 id="name_parking"></h1>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-12 centrar">
          <h1>Sistema de estacionamiento</h1>
          <button id="Entrar"class="btn btn-success" type="button">Ingresar</button>
          <button id="Salir" class="btn btn-success" type="button">Salir</button>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-12 centrar">
          <h1>Estado actual</h1>
          <p id="vacios">Lugares disponibles: </p>
          <p id="ocupados">Lugares ocupados: </p>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-12 centrar">
          <h1>Total de entradas en el día: 37</h1>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-12 centrar">
          <h1>Personas que han visitado tu estacionamiento hoy: 95</h1>
        </div>
      </div>

    </div>

    <script>
      /*Variables globales
        id_parking = ID de estacionamiento
        dat = obtiene los datos del JSON
      */
      var id_parking= "<?= $id_Recv ?>";
      console.log(id_parking);
      var dat;
      /* Función que obtiene los datos del json.
         Esta función es llamada desde el archivo de update.js
         Requiere:
            id_parking = ID de estacionamiento
            function() = es la función a la que llamara para actualizar los datos de la pagina
      */
      datos(id_parking,function(){
         dat = JSON.parse(this.responseText);
         //Obtiene el nombre del estacionamiento
         var nombre= dat[1];
         $('#name_parking').html(nombre);
         $('#nombre').html(dat[2]);
         //Incrementa el valor de ocupados en la BD hacer click
         $('#Entrar').click(function(){
            update(id_parking,dat[0]=parseInt(dat[0])+1);
            setCajones();
        });
         //Decrementa el valor de ocupados en la BD hacer click
         $('#Salir').click(function(){
            update(id_parking,dat[0]=parseInt(dat[0])-1);
            setCajones();
        });
      });

      /*Función que actualiza las estiquetas en donde se muestra los lugares vacios y los lugares ocupados*/
      function setCajones(){
        $('#ocupados').html('Lugares ocupados: '+dat[0]);
        var diponibles = dat[3] - dat[0];
        $('#vacios').html('Lugares disponibles:'+(dat[3]-dat[0]));
      }
    </script>

</body>
</html>
