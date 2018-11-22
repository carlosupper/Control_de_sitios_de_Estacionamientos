<?php session_start();	
include('functions.php');
if (isset($_SESSION['usuario'])) {
	header('Location: ../index_user.html');
}if(isset($_SESSION['admin'])){
	header('Location: ../index_admin.html');
}
$errores = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $correo = filter_var(strtolower($_POST['correo']), FILTER_SANITIZE_STRING);
	$password = $_POST['password'];
	$password = hash('sha512', $password);
  try {
    
    	  $conexion = new PDO('mysql:host=localhost;dbname=control_de_sitios_de_estacionamientos', 'root', 'sayyeah1993');

  } catch (PDOException $e) {
      echo "Error:" . $e->getMessage();;
  }
  $statement = $conexion->prepare('
	SELECT id_usuarios,usuario_tipo FROM usuarios WHERE correo = :correo AND contrasena = :password'
	);
	$statement->execute(array(
		':correo' => $correo,
		':password' => $password
	));
	$resultado = $statement->fetch();
	if ($resultado !== false) {
if($resultado['usuario_tipo']==1){
			$_SESSION['usuario']=$correo;
	header('Location: ../index_user.html');
}else{
	$_SESSION['admin']=$correo;
	$id=$resultado['id_usuarios'];
	echo $id;
	if($resultset=getSQLResultSet("SELECT id_estacionamiento FROM `estacionamientos` WHERE `usuario_id` = '$id'")){
	while ($row = $resultset->fetch_array(MYSQLI_NUM)){
		echo json_encode($row);
		}
	}
	header('Location: ../index_admin.html');
}
	} else {
		$errores .= '<li>Datos Incorrectos</li>';
	}

 }
require 'views/login.view.php';
?>

