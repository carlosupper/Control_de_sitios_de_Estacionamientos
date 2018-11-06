<?php session_start();

if (isset($_SESSION['usuario'])) {
  header('Location: ../index_user.php');
}if (isset($_SESSION['admin'])) {
  header('Location: ../index_admin.php');
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') { // si el metodo de envio es igual a POST
  $nombre = filter_var(strtolower($_POST['nombre']), FILTER_SANITIZE_STRING);//pasar de mayusculas a minuscular y no dejar que escriban codigo dentro
  $appaterno = filter_var(strtolower($_POST['appaterno']), FILTER_SANITIZE_STRING);
  $appmaterno= filter_var(strtolower($_POST['appmaterno']), FILTER_SANITIZE_STRING);
  $nickname = filter_var(strtolower($_POST['nickname']), FILTER_SANITIZE_STRING);
  $correo = $_POST['correo'];
  $contrasena = $_POST['contrasena'];
  $password2 = $_POST['password2'];

 //echo "$nombre . $appaterno . $appmaterno . $nickname . $correo . $contrasena";

  $errores='';

  if (empty($nombre) or empty($correo) or empty($contrasena) or empty($password2) or empty($appaterno) or empty($appmaterno) or empty($nickname)) {
      $errores .= '<li>Por favor rellena todos los datos correctamente</li>';
  }else {
    try {
      $conexion = new PDO('mysql:host=localhost;dbname=control_de_sitios_de_estacionamientos', 'root', 'sayyeah1993');
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
    //buscar nombre repetido en la base de datos
    $statement = $conexion->prepare('SELECT * FROM usuarios WHERE nickname = :nickname LIMIT 1');
    $statement->execute(array(':nickname' => $nickname));
    $resultado = $statement->fetch();

    //nombre = existe en la base de datos
    if ($resultado != false) {
      $errores .= '<li>El nombre de usuario ya existe</li>';
    }
    //encriptar contraseña

    $contrasena = hash('sha512', $contrasena);
    $password2 = hash('sha512', $password2);

   if ($contrasena != $password2) {
    $errores .= '<li>Las contraseñas no son iguales</li>';
    }
  }
  if ($errores =='') {
    $query = "INSERT INTO usuarios(nickname,nombre,appaterno,appmaterno,contrasena,correo,usuario_tipo) VALUES('$nickname','$nombre','$appaterno','$appmaterno','$contrasena','$correo','2')";
    $resultado=$conexion -> query($query);
  }
header('Location: login.php');
}
 require 'views/registrate.view.php';
?>