//Método que actualiza los cajones ocupados del estacionamiento
function update(id_parking,ocupados){
	var xmlhttp = new XMLHttpRequest();
	//Ruta de php que actualiza el estacionamiento
	var url = "http://localhost/Github/Control_de_sitios_de_Estacionamientos/Desarrollo/php/actualiza-estacionamiento.php?id_estacionamiento="+id_parking+"&ocupados="+ocupados;
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

/* Método que obtine los datos de nuestra BD en un json
	requier:
		id_parking = es el ID del estacionamiento a buscar
		callback   = es una función que estara actualizando nuestros datos en html
*/
function datos(id_parking, callback){
var xmlhttp = new XMLHttpRequest();

//Ruta de consulta de php para obtener los datos del estacionamiento deseado
var url1 = "http://localhost/Github/Control_de_sitios_de_Estacionamientos/Desarrollo/php/consulta-estacionamiento-id.php?id_estacionamiento="+id_parking;
xmlhttp.open("GET", url1, true);
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      if( typeof callback === "function"){
      	callback.apply(xmlhttp);
      }

  }
};

xmlhttp.send();
}
