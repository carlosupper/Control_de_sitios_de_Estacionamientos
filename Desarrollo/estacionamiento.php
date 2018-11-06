<?php
  /*
    El contenido de NOMBRE se recive desde main.js, al momento de crear el
    array con la información de las tarjetas de Google Maps.
  */
  $nombre = $_GET["nombre"];
  $latEst = $_GET["lat"];
  $lngEst = $_GET["lng"];
?>

<script type="text/javascript">
  // Se obtiene la variable recibida en el php de arriba.
  var nombre = "<?= $nombre ?>";
  var latEst = "<?= $latEst ?>";
  var lngEst = "<?= $lngEst ?>";
</script>

<?php
  /*
  Se llama el header en donde están todas las referencias a los archivos
  que se necesitan y ahí está la llamada al achivo 'parking.js' que recibe
  la variable 'nombre' del javascript de arriva.
   */
  include('php/header.php');
?>


</div>
	<div class="container mt-5">
		<div class="row">

      <div id="info" class="col-md-6"></div>

			<div class="col-md-6 centrar">
				<!-- GOOGLE MAPS -->
				<div class="row">
			    <div id="mapParking" class="col-md-12 my-5 " style="width: 100%;height: 500px;"></div>
			        <script async defer
			          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDy1Lgx05CgWi-PxUgU2iw4P1pvaIWqL1Y&callback=initMap">
			        </script>
			    </div>
			    <!-- -->
			</div>
		</div>
	</div>


</body>
</html>
