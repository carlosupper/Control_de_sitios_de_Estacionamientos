<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Registro</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link rel="stylesheet" href="css/estilo1.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
  </head>
  <body>
    <div class="wrap">
        <h1>Registrate</h1>
        <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" class="formulario" name="login">
        <i class="icono izquierda fa fa-user"></i><input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre(s)" value="" required>
        <input type="text" class="form-control" id="appaterno" name="appaterno" placeholder="Apellido Paterno" value="" required>
           <input type="text" class="form-control" id="appmaterno" name="appmaterno" placeholder="Apellido Materno" value="" required>
           <input type="text" class="form-control" id="nickname" name="nickname" placeholder="NickName" value="" required>
        <i class="icono izquierda fa fa-envelope"></i><input type="email" class="form-control" id="correo" name="correo" placeholder="Correo" value=""required>
        <i class="icono izquierda fa fa-key"></i><input type="password" name="contrasena" class="contrasena" placeholder="Contraseña">
  			<input type="password" name="password2" class="password_btn" placeholder="Repetir Contraseña">

        <input type="submit" name="submit" class="BotonPrimario" value="Enviar">

        <?php if(!empty($errores)): ?>
  				<div class="error">
  					<ul>
  						<?php echo $errores; ?>
  					</ul>
  				</div>
  			<?php endif; ?>

        <p class="texto-registrate">
          ¿ Ya tienes cuenta ?
          <a href="../login.php">Iniciar Sesión</a>
        </p>
      </form>
    </div>
  </body>
</html>
