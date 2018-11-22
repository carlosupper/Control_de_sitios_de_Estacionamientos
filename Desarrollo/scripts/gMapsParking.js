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
      estIcon = '/Github/Control_de_sitios_de_Estacionamientos/Desarrollo/img/verde.png'
      break;
    case 2:
      estIcon = '/Github/Control_de_sitios_de_Estacionamientos/Desarrollo/img/amarillo.png'
      break;
    case 3:
      estIcon = '/Github/Control_de_sitios_de_Estacionamientos/Desarrollo/img/rojo.png'
      break;
  }
  const marcador = new google.maps.Marker({
    position: parkingLocation,
    map: googleMap,
    animation: google.maps.Animation.BOUNCE,
    title: "Aquí se encuentra: \n"+nombre,
    icon: estIcon
  });
}


function autocompletar(arreglo){
    
  const inputLugar= document.querySelector('#estacionamiento');
  let indexFocus=-1;
    
  inputLugar.addEventListener('input', function(){
    const lugar = this.value;
      
    if(!lugar) return false;
      
    cerrarLista();
      
    //lista de sugerencias
    const divList = document.createElement('div');
    divList.setAttribute('id', this.id + '-lista-autocompletar');
    divList.setAttribute('class', 'lista-autocompletar-items');
    this.parentNode.appendChild(divList);
      
    //conexion
    httpRequest('controler.php?estacionamiento=' + lugar, function(){
      console.log(this.responseText);
        
        const arreglo = JSON.parse(this.responseText);
        
        if (arreglo.length==0) return false;
        arreglo.forEach(item => {
            if(item.substr(0,lugar.length)== lugar){
              const elementoLista = document.createElement('div');
              elementoLista.innerHTML = `<strong>${ item.substr(0, lugar.length) }</strong>${item.substr(lugar.length)}`;
              elementoLista.addEventListener('click', function(){
                inputLugar.value= this.innerText;
                cerrarLista();
                return false;
              });
              divList.appendChild(elementoLista);
            }
        });
        
    });
  });
  inputLugar.addEventListener('keydown', function(e){
    const divList= document.querySelector('#' + this.id + '-lista-autocompletar');
    let items;
    if (divList) {
      items = divList.querySelectorAll('div');
      switch (e.keyCode) {
        case 40://abajo
          indexFocus++;
          if (indexFocus> items.length-1) indexFocus= items.length-1;
          break;
        case 38://arriba
          indexFocus--;
          if (indexFocus < 0) indexFocus = 0;
          break;//enter
        case 13:
          e.preventDefault();
          items[indexFocus].click();
          indexFocus=-1;
          break;
        default:
      }
      seleccionar(items,indexFocus);
      return false;
    }
  });
  document.addEventListener('click', function(){
    cerrarLista();
  });
}

function seleccionar(items, indexFocus){

  if (!items || indexFocus == -1) return false;
  items.forEach(x => {x.classList.remove('autocompletar-active');});
  items[indexFocus].classList.add('autocompletar-active');
}
function cerrarLista(){
  const items = document.querySelectorAll('.lista-autocompletar-items');
  items.forEach(item => {
    item.parentNode.removeChild(item);
  });
  indexFocus = -1;
}

 function httpRequest(url,callback){
   const http = new XMLHttpRequest();
   http.open('GET', url);
   http.send();

   http.onreadystatechange = function(){
     if (this.readyState === 4 && this.status === 200){
       callback.apply(http);
     }
   }
   

 }
autocompletar([]);
