/*
  Esta función imprime el mapa con la posición del estacionamiento seleccionado
  en "estacionamiento.php".
*/
function obtenerColorPin() {
    var est = document.location.href;
    if(est.indexOf('?')>0){
        // Elimina todos los símbolos '?' que existan en la url de donde se llama
        // este archivo.
        var cad_1 = est.split('?')[1];
        // Ahora elimina todos los símbolos '&'.
        var cad_2 = cad_1.split('&');
        // Elimina los símbolos '=' y se obtiene el color
        var dato = cad_2[0].split('=')[1];
        //alert(dato);
        return dato;
    }
}

function initMap() {

  var parkingLocation = {lat: parseFloat(latEst) , lng: parseFloat(lngEst)};

  const options = {
    center: parkingLocation,
    zoom: 16
  }

  //Se carga el mapa en la página web.
  const googleMap = new google.maps.Map(document.getElementById("mapParking"), options);

  //Aquí se coloca el marcador de la ubicación del usuario, con el color
  //dependiendo del cupo disponible.
  var estIcon;

  switch (parseInt(obtenerColorPin())) {
    case 1:
      estIcon = '/Control_de_sitios_de_Estacionamientos/Desarrollo/img/verde.png'
      break;
    case 2:
      estIcon = '/Control_de_sitios_de_Estacionamientos/Desarrollo/img/amarillo.png'
      break;
    case 3:
      estIcon = '/Control_de_sitios_de_Estacionamientos/Desarrollo/img/rojo.png'
      break;
  }
  //var userIcon = '/Control_de_sitios_de_Estacionamientos/Desarrollo/img/parking.png';
  const marcador = new google.maps.Marker({
    position: parkingLocation,
    map: googleMap,
    animation: google.maps.Animation.BOUNCE,
    title: "Aquí se encuentra: \n"+nombre,
    icon: estIcon
  });
}
