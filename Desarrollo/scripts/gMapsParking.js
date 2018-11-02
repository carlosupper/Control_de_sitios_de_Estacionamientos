/*
  Esta función imprime el mapa con la posición del estacionamiento seleccionado
  en "estacionamiento.php".
*/

function initMap() {

  var parkingLocation = {lat: parseFloat(latEst) , lng: parseFloat(lngEst)};

  const options = {
    center: parkingLocation,
    zoom: 16
  }

  //Se carga el mapa en la página web.
  const googleMap = new google.maps.Map(document.getElementById("mapParking"), options);

  //Aquí se coloca el marcador de la ubicación del usuario.
  var userIcon = '/Proyects I+D1/Control_de_sitios_de_Estacionamientos/Desarrollo/img/parking.png';
  const marcador = new google.maps.Marker({
    position: parkingLocation,
    map: googleMap,
    animation: google.maps.Animation.BOUNCE,
    title: "Aquí se encuentra: \n"+nombre,
    icon: userIcon
  });
}
