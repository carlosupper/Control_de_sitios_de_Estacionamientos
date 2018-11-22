
class Localizacion {
  constructor( callback ) {
    if (navigator.geolocation) {
      //Obtener ubicación
      navigator.geolocation.getCurrentPosition((position)=>{
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        callback();
      });

    } else {
      alert("Tu navegador no soporta geolocalización.")
    }
  }
}


function obtenerDatos(response) {

}

// Esta función obtiene los valores en JSON desde la base de datos y crea
// las variables (Arrays) que se usarán para mostrar los estacionameientos
// y su información en un Google Map.
var color;
function mostrarGMaps(response, userLocation) {
  var arr = JSON.parse(response);
  var i, name, lat, lng, notes, address;
  var markers = [], infoWindowContent = [];

  var total, ocupados, disponibles, bn;


  for(i = 0; i < arr["Est"].length ; i++) {
    name = arr["Est"][i].Nombre;
    lat = parseFloat(arr["Est"][i].Latitud);
    lng = parseFloat(arr["Est"][i].Longitud);
    notes = arr["Est"][i].Notas;
    address = arr["Est"][i].Direccion;

    /*
      En esta parte se hace el cálculo para mostrar los pines de colores en
      google Maps dependiendo de su capacidad actual.
    */
    total = arr["Est"][i].Total;
    ocupados = arr["Est"][i].Ocupados;

    disponibles =  parseInt(total - ocupados);

    if (disponibles == 0) {
      bn = false;
    } else {
      bn = true;
      if (  disponibles >= (parseInt((50*total)/100)) ) {
        color = 1;
      } else {
        if ( disponibles >= (parseInt((15*total)/100)) ) {
          color = 2;
        } else {
          color = 3;
        }
      }
    }
    //alert("Conversion: " + parseInt((50*total)/100) + " Disponibles: "+disponibles + " Color: "+color);

    /*
      Array que contiene los nombres, latitudes y longitudes de los
      estacionamietnos a mostrar en Google Maps. Las siguientes variables se
      usan para lo siguiente:

        * bn:     indica si se muestra o no el marcador en GMaps en base a si
                  tiene lugares o ya no.

        * color:  indica el color del pin a mostrar en GMaps.
                  Los valores que puede tomar es:
                    1 : +50% de su capacidad.       (Verde)
                    2 : 15% - 50% de su capacidad.  (Amarillo)
                    3 : -15% de su capacidad.       (Rojo)

    */

    markers[i] = [ name , lat , lng , bn, color ];

    // Array que contiene la información de las tarjetas cuando se dé click
    // en un pin en el Google Maps.
    //var nameparking =
    infoWindowContent[i] = ['<div class="info_content">' +
    '<h1>'+name+'</h1>' +
    '<p><b>Dirección:</b> '+address+'</p>' +
    '<p><b>Notas Importantes:</b> '+notes+'</p>' +
    '<p><b>Capacidad total:</b> '+total+'</p>' +
    '<p><b>Lugares Disponibles:</b> '+disponibles+'</p>' +
    '<a href="./estacionamiento.php?color='+color+'&nombre='+name+'&lat='+lat+'&lng='+lng+'">Más información</a>' +
    '</div>'];
  }

  // Formato de los marcadores para mostrarlos en Google Maps.
  /*var markers = [
    ['Estacionamiento Catedral', 19.041655, -98.197397],... ETC
  ];*/

  // Formato para mostrar los datos de las tarjetas en Google Maps.
  /*var infoWindowContent = [
    ['<div class="info_content">' +
    '<h1>Estacionamiento Catedral</h1>' +
    '<p>Estacionamiento ubicado a tan solo calle y media del zócalo de Puebla.</p>' +
    '<a href="#">Más información</a>' +
    '</div>'], ... ETC
  ];*/

  var bounds = new google.maps.LatLngBounds();
  const options = {
    center: userLocation,
    zoom: 16
  }

  //Se carga el mapa en la página web.
  const googleMap = new google.maps.Map(document.getElementById("map"), options);

  //Aquí se coloca el marcador de la ubicación del usuario.

  var userIcon = '/Github/Control_de_sitios_de_Estacionamientos/Desarrollo/img/user.png';

  const marcador = new google.maps.Marker({
    position: userLocation,
    map: googleMap,
    animation: google.maps.Animation.BOUNCE,
    title: "Aquí te encuentras.",
    icon: userIcon
  });

  var infoWindow = new google.maps.InfoWindow(), marker, i;

  var estIcon = '/Github/Control_de_sitios_de_Estacionamientos/Desarrollo/img/parking.png';

  //var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  for( i = 0; i < markers.length; i++ ) {
    if (markers[i][3]) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
      bounds.extend(position);

      switch (markers[i][4]) {
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

      marker = new google.maps.Marker({
        position: position,
        map: googleMap,
        animation: google.maps.Animation.DROP,
        title: markers[i][0]+"\n\nDa click para ver más.",
        icon: estIcon
      });

      // Add info window to marker
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infoWindow.setContent(infoWindowContent[i][0]);
          infoWindow.open(googleMap, marker);
        }
      })(marker, i));

      // Center the map to fit all markers on the screen
      //googleMap.fitBounds(bounds);

    }

  }

  var boundsListener = google.maps.event.addListener((googleMap), 'bounds_changed', function(event) {
    this.setZoom(15);
    google.maps.event.removeListener(boundsListener);
  });
  var p = "PRUEBAAAAAAA";
  return p;

}

var varGlobal;

function initMap() {
  const ubicacion = new Localizacion((pos)=>{
    var latLng_User = {lat: ubicacion.latitude, lng: ubicacion.longitude}
    //código para obtener los datos de la base de datos.
    //--------------------------------------------------------------------------
    var xmlhttp = new XMLHttpRequest();

    var url = "http://localhost/Github/Control_de_sitios_de_Estacionamientos/Desarrollo/php/maps.php";

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //obtnerDatos(this.responseText);
        varGlobal = mostrarGMaps(this.responseText, latLng_User);
      }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
//------------------------------------------------------------------------------
  });
}
//setInterval(initMap,5000);
// Load initialize function
//google.maps.event.addDomListener(window, 'load', initMap);
