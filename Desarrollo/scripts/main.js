

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

/*var ubicacion = new Localizacion();

console.log(ubicacion)*/

function initMap() {

  const ubicacion = new Localizacion((pos)=>{

    var latLong = {lat: ubicacion.latitude, lng: ubicacion.longitude}


    var texto = '<h1>Nombre del Estacionamiento</h1>' +
    '<p>Información relevante del estacionamiento.</p>' +
    '<a href="https://www.google.com">Página del estacionamiento</a>';

    // Multiple markers location, latitude, and longitude
    var markers = [
        ['Estacionamiento Catedral', 19.041655, -98.197397],
        ['Estacionamiento Del Centro', 19.041684, -98.199979],
        ['Estacionamiento Público San Juan', 19.043293, -98.196201]
    ];

    // Info window content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h1>Estacionamiento Catedral</h1>' +
        '<p>Estacionamiento ubicado a tan solo calle y media del zócalo de Puebla.</p>' +
        '<a href="#">Más información</a>' +
        '</div>'],

        ['<div class="info_content">' +
        '<h1>Estacionamiento Del Centro</h1>' +
        '<p>Estacionamiento ubicado a dos calles del zócalo de Puebla.</p>' +
        '<a href="#">Más información</a>' +
        '</div>'],

        ['<div class="info_content">' +
        '<h1>Estacionamiento Público San Juan</h1>' +
        '<p>Este estacionamiento se ubica a solo media calle del zócalo de Puebla.</p>' +
        '<a href="#">Más información</a>' +
        '</div>']
    ];

    var bounds = new google.maps.LatLngBounds();
    const options = {
      center: latLong,
      zoom: 16
    }

    //var map = document.getElementById('map');
    const googleMap = new google.maps.Map(document.getElementById("map"), options);

    const marcador = new google.maps.Marker({
      position: latLong,
      map: googleMap,
      title: "Aquí estás."
    });

    var infoWindow = new google.maps.InfoWindow(), marker, i;
    var imagen = "/opt/lampp/htdocs/Proyects I+D1/Control_de_sitios_de_Estacionamientos/Desarrollo/img/logo.png";
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: googleMap,
            animation: google.maps.Animation.DROP,
            //icon: imagen,
            title: markers[i][0]
        });

        // Add info window to marker
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(googleMap, marker);
            }
        })(marker, i));

        // Center the map to fit all markers on the screen
        googleMap.fitBounds(bounds);
    }

    var boundsListener = google.maps.event.addListener((googleMap), 'bounds_changed', function(event) {
        this.setZoom(16);
        google.maps.event.removeListener(boundsListener);
    });

    /*const marcador = new google.maps.Marker({
      position: latLong,
      map: googleMap,
      title: "Nombre estacionamiento"
    });

    var informacion = new google.maps.InfoWindow({
      content: texto
    });

    marcador.addListener('click',function(){
      informacion.open(googleMap, marcador);
    });*/

  });


}

// Load initialize function
google.maps.event.addDomListener(window, 'load', initMap);
