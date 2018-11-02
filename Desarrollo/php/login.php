<?php session_start();

if (isset($_SESSION['correo'])) {
	header('Location: index.php');
}
$errores = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $correo = filter_var(strtolower($_POST['correo']), FILTER_SANITIZE_STRING);
	$password = $_POST['password'];
	$password = hash('sha512', $password);
  try {
    	  //$conexion = new PDO('mysql:host=localhost;dbname=control_de_sitios_de_estacionamientos', 'root', 'sayyeah1993');
    	  $conexion = new PDO('mysql:host=localhost;dbname=control_de_sitios_de_estacionamientos', 'root', '');
        if ($conexion) {
        	echo "dentro";
        }

  } catch (PDOException $e) {
      echo "Error:" . $e->getMessage();;
  }
  $statement = $conexion->prepare('
		SELECT * FROM usuarios1 WHERE correo = :correo AND password = :password'
	);
	$statement->execute(array(
		':correo' => $correo,
		':password' => $password
	));
	$resultado = $statement->fetch();
	if ($resultado !== false) {
		$_SESSION['correo']=$correo;
		header('Location: index.php');
	} else {
		$errores .= '<li>Datos Incorrectos</li>';
	}
 }
require 'registrate.php';
?>
