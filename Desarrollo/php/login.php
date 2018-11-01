<?php session_start();

if (isset($_SESSION['correo'])) {
	header('Location: ../index_user.html');
}
$errores = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $correo = filter_var(strtolower($_POST['correo']), FILTER_SANITIZE_STRING);
	$password = $_POST['password'];
	$password = hash('sha512', $password);
	echo $password, $correo;
  try {
    	  $conexion = new PDO('mysql:host=localhost;dbname=control_de_sitios_de_estacionamientos', 'root', 'sayyeah1993');

  } catch (PDOException $e) {
      echo "Error:" . $e->getMessage();;
  }
  $statement = $conexion->prepare('
		SELECT * FROM usuarios WHERE correo = :correo AND contrasena = :password'
	);
	$statement->execute(array(
		':correo' => $correo,
		':password' => $password
	));
	$resultado = $statement->fetch();
	if ($resultado !== false) {
		$_SESSION['correo']=$correo;
		header('Location: ../index_user.html');
	} else {
		$errores .= '<li>Datos Incorrectos</li>';
	}
 }
require 'views/login.view.php';
?>
