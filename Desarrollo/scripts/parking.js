
/*
-------------------------------IMPORTANTE-------------------------------------
 La variable NOMBRE se recibe desde el archivo: "estacionamiento.php"
 Es como si se declarara aquí de la siguiente manera:

 var nombre;

 Solo que la variable ya viene con el nombre del estacionamiento seleccionado.
------------------------------------------------------------------------------
*/

var xmlhttp = new XMLHttpRequest();
//Ruta de consulta de php
var url = "http://localhost/Github/Control_de_sitios_de_Estacionamientos/Desarrollo/php/consulta-estacionamiento.php?nombre="+nombre;
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      mostrar(this.responseText);
  }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();


function mostrar(response) {
//para obtener los datos es recorriendo los indices de 0-n, estos se guardan como estan la base de datos
//arr[0]=id_estacionamiento...
  var arr = JSON.parse(response);
  var out ="";
  //cajones disponibles con los que cuenta el estacionamiento
  var disponible;
  //Arr contiene los datos de la BD en .JSON
  //arr[12] = totales.
  //arr[11] = ocupados.
  disponible = parseInt(arr[12])-parseInt(arr[11]);
  out+= '<div class="mt-5"></div>'+
  	'<div class="container">'+
  		'<div class="row">'+
        	'<div class="col-md-12 centrar">'+
  		      	'<div class="card text-white bg-info " style="max-width: 90rem;">'+
        		 	'<div class="card-header">'+'<h1>'+ arr[2] +'</h1>'+'</div>'+
        			'<div class ="card-body text-dark">'+
        				'<h4 class="card-text">'+'<b>'+ 'CUPO DISPONIBLE: '+'</b>'+disponible + '</h4>'+
        			'</div>'+
        		'</div>'+
        	'</div>'+
        '</div>'+
    '</div>';
     out+= '<div class="container mt-4"></div>'+
  	'<div class="container">'+
  		'<div class="row">'+
        	'<div class="col-md-12 ">'+
  		      	'<div class="card text-white bg-secondary " style="max-width: 35rem;">'+
        		 	'<div class="card-header">'+'<h5>'+ 'INFORMACIÓN' +'</h5>'+'</div>'+
        			'<div class ="card-body">'+
        				'<h5 class="card-text">'+'<b>'+'<img src="img/ubicacion.png" width="30" height="30" class="d-inline-block align-top">'+'  Dirección: '+ arr[3] +'</h5>'+
        				'<h5 class="card-text">'+'<b>'+'<img src="img/horario.png" width="30" height="30" class="d-inline-block align-top">  '+'	Horario:   '+ arr[8] +'</h5>'+
        				'<h5 class="card-text">'+'<b>'+'<img src="img/hora.png" width="30" height="30" class="d-inline-block align-top">     '+'	Precio por hora/fracción: '+ arr[9] +'</h5>'+
        				'<h5 class="card-text">'+'<b>'+'<img src="img/telefono.png" width="30" height="30" class="d-inline-block align-top"> '+'	Teléfono:  '+ arr[6] +'</h5>'+
        				'<h5 class="card-text">'+'<b>'+ 'NOTAS: '+'</b>'+'</h5>'+'<p class="card-text">'+arr[7] + '</p>'+
        			'</div>'+
        		'</div>'+
        	'</div>'+
        '</div>'+
    '</div>';
 document.getElementById("info").innerHTML = out;
}
