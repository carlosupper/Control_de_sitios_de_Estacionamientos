

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


  const ubicacion = new Localizacion(()=>{
    const latLong = {lat: ubicacion.latitude, lng: ubicacion.longitude}
    var texto = '<h1>Nombre del Estacionamiento</h1>' +
    '<p>Información relevante del estacionamiento.</p>' +
    '<a href="https://www.google.com">Página del estacionamiento</a>';

    const options = {
      center: latLong,
      zoom: 15
    }

    var map = document.getElementById('map');
    const googleMap = new google.maps.Map(map, options);

    const marcador = new google.maps.Marker({
      position: latLong,
      map: googleMap,
      title: "Nombre estacionamiento"
    });

    var informacion = new google.maps.InfoWindow({
      content: texto
    });

    marcador.addListener('click',function(){
      informacion.open(googleMap, marcador);
    });

  });
}
