
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

// Esta función obtiene los valores en JSON desde la base de datos y crea
// las variables (Arrays) que se usarán para mostrar los estacionameientos
// y su información en un Google Map.
function mostrarGMaps(response, userLocation) {
  var arr = JSON.parse(response);
  var i, name, lat, lng, notes, address, disponibles;
  var markers = [], infoWindowContent = [];

  for(i = 0; i < arr["Est"].length ; i++) {
    name = arr["Est"][i].Nombre;
    lat = parseFloat(arr["Est"][i].Latitud);
    lng = parseFloat(arr["Est"][i].Longitud);
    notes = arr["Est"][i].Notas;
    address = arr["Est"][i].Direccion;
    disponibles =  parseInt(arr["Est"][i].Total -  arr["Est"][i].Ocupados);


    // Array que contiene los nombres, latitudes y longitudes de los
    // estacionameitnos a mostrar en Google Maps.
    markers[i] = [ name , lat , lng ];

    // Array que contiene la información de las tarjetas cuando se dé click
    // en un pin en el Google Maps.
    //var nameparking =
    infoWindowContent[i] = ['<div class="info_content">' +
    '<h1>'+name+'</h1>' +
    '<p><b>Dirección:</b> '+address+'</p>' +
    '<p><b>Notas Importantes:</b> '+notes+'</p>' +
    '<p><b>Lugares Disponibles:</b> '+disponibles+'</p>' +
    '<a href="./estacionamiento.php?nombre='+name+'&lat='+lat+'&lng='+lng+'">Más información</a>' +
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
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
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

  var boundsListener = google.maps.event.addListener((googleMap), 'bounds_changed', function(event) {
    this.setZoom(16);
    google.maps.event.removeListener(boundsListener);
  });

}

function initMap() {

  const ubicacion = new Localizacion((pos)=>{
    var latLng_User = {lat: ubicacion.latitude, lng: ubicacion.longitude}
    //código para obtener los datos de la base de datos.
    //--------------------------------------------------------------------------
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost/Github/Control_de_sitios_de_Estacionamientos/Desarrollo/php/maps.php";
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        mostrarGMaps(this.responseText, latLng_User);
      }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
//------------------------------------------------------------------------------
  });
}

// Load initialize function
//google.maps.event.addDomListener(window, 'load', initMap);
