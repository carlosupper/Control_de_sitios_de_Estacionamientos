<?php session_start();
session_unset($_SESSION['admin']);
session_destroy();
//$_SESSION = array();

header('Location: login.php');

?>
