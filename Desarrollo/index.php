<?php
  include('php/header.php');
?>

    <div class="container mt-4"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 centrar">
          <h1 class="mt-5">Bienvenido a este sitio de estacionamientos.</h1>
        </div>
      </div>

      <!-- GOOGLE MAPS -->
      <div class="row">


        <div id="map" class="col-md-12 my-2" style="width: 100%;height: 500px;"></div>

        <script async defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDy1Lgx05CgWi-PxUgU2iw4P1pvaIWqL1Y&callback=initMap">
        </script>

        <!-- GOOGLE MAPS SCRIPT -->
        <script type="text/javascript" src="scripts/main.js"></script>

      </div>
      <!-- FIN GOOGLE MAPS -->

    </div>
  </body>
</html>
