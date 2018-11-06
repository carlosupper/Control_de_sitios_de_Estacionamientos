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

    <!-- PARKING SCRIPT -->
    <script type="text/javascript" src="scripts/parking.js"></script>
    <!-- GMAPS PARKING LOCATION SCRIPT -->
    <script type="text/javascript" src="scripts/gMapsParking.js"></script>

  </head>

  <!-- BODY  -->
  <body>

    <!-- NAVIGATION -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top color-nav">
      <div class="container">
        <a class="navbar-brand" href="./index.php">
          <img src="img/logo.png" width="35" height="35" class="d-inline-block align-top" alt="Inicio">
            F-Estacionamientos
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">

          <form class="form-inline my-2 my-lg-0 ml-auto">
            <input class="form-control mr-sm-2" type="search" placeholder="Ingrese su búsqueda" aria-label="Search">
            <button class="btn btn-success my-2 my-sm-0" type="submit">Buscar</button>
          </form>

          <!-- ml-auto -> MarginLeft-auto -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="index.php">Inicio</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">Ayuda</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="php/registrate.php">Registrarse</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="php/login.php">Entrar</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
