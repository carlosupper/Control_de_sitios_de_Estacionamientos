-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.7.17-log


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema control_de_sitios_de_estacionamientos
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ control_de_sitios_de_estacionamientos;
USE control_de_sitios_de_estacionamientos;

--
-- Table structure for table `control_de_sitios_de_estacionamientos`.`cobros`
--

DROP TABLE IF EXISTS `cobros`;
CREATE TABLE `cobros` (
  `id_estacionamiento` int(6) NOT NULL,
  `vehiculo_id` int(6) NOT NULL,
  `tarifa` float NOT NULL,
  KEY `FK_ESTACIONAMIENTO2` (`id_estacionamiento`),
  KEY `FK_VEHICULO` (`vehiculo_id`),
  CONSTRAINT `FK_ESTACIONAMIENTO2` FOREIGN KEY (`id_estacionamiento`) REFERENCES `estacionamientos` (`id_estacionamiento`),
  CONSTRAINT `FK_VEHICULO` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculo` (`id_vehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `control_de_sitios_de_estacionamientos`.`cobros`
--

/*!40000 ALTER TABLE `cobros` DISABLE KEYS */;
/*!40000 ALTER TABLE `cobros` ENABLE KEYS */;


--
-- Table structure for table `control_de_sitios_de_estacionamientos`.`comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE `comentarios` (
  `id_comentario` int(6) NOT NULL AUTO_INCREMENT,
  `id_estacionamiento` int(6) NOT NULL,
  `calificacion` int(1) NOT NULL,
  `id_usuario` int(6) NOT NULL,
  `comentario` text NOT NULL,
  PRIMARY KEY (`id_comentario`),
  KEY `FK_ESTACIONAMIENTO3` (`id_estacionamiento`),
  CONSTRAINT `FK_ESTACIONAMIENTO3` FOREIGN KEY (`id_estacionamiento`) REFERENCES `estacionamientos` (`id_estacionamiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `control_de_sitios_de_estacionamientos`.`comentarios`
--

/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;


--
-- Table structure for table `control_de_sitios_de_estacionamientos`.`estacionamientos`
--

DROP TABLE IF EXISTS `estacionamientos`;
CREATE TABLE `estacionamientos` (
  `id_estacionamiento` int(6) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(6) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` double NOT NULL,
  `telefono` int(10) NOT NULL,
  `notas` text NOT NULL,
  `horario` text NOT NULL,
  `precio` int(10) NOT NULL,
  `visitas` int(6) NOT NULL,
  `contador` int(6) NOT NULL,
  `zona_id` int(6) NOT NULL,
  PRIMARY KEY (`id_estacionamiento`),
  KEY `FK_USUARIO` (`usuario_id`),
  KEY `FK_ZONA` (`zona_id`),
  CONSTRAINT `FK_USUARIO` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuarios`),
  CONSTRAINT `FK_ZONA` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`id_zona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `control_de_sitios_de_estacionamientos`.`estacionamientos`
--

/*!40000 ALTER TABLE `estacionamientos` DISABLE KEYS */;
/*!40000 ALTER TABLE `estacionamientos` ENABLE KEYS */;


--
-- Table structure for table `control_de_sitios_de_estacionamientos`.`fotos`
--

DROP TABLE IF EXISTS `fotos`;
CREATE TABLE `fotos` (
  `id_foto` int(6) NOT NULL AUTO_INCREMENT,
  `id_estacionamiento` int(6) NOT NULL,
  PRIMARY KEY (`id_foto`),
  KEY `FK_ESTACIONAMIENTO4` (`id_estacionamiento`),
  CONSTRAINT `FK_ESTACIONAMIENTO4` FOREIGN KEY (`id_estacionamiento`) REFERENCES `estacionamientos` (`id_estacionamiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `control_de_sitios_de_estacionamientos`.`fotos`
--

/*!40000 ALTER TABLE `fotos` DISABLE KEYS */;
/*!40000 ALTER TABLE `fotos` ENABLE KEYS */;


--
-- Table structure for table `control_de_sitios_de_estacionamientos`.`servicios`
--

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE `servicios` (
  `id_estacionamiento` int(11) NOT NULL,
  `baño` int(1) NOT NULL,
  `autolavado` int(1) NOT NULL,
  `24hrs` int(1) NOT NULL,
  `valet_parking` int(1) NOT NULL,
  `techado` int(1) NOT NULL,
  `motos` int(1) NOT NULL,
  `camionetas` int(1) NOT NULL,
  KEY `FK_ESTACIONAMIENTO` (`id_estacionamiento`),
  CONSTRAINT `FK_ESTACIONAMIENTO` FOREIGN KEY (`id_estacionamiento`) REFERENCES `estacionamientos` (`id_estacionamiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `control_de_sitios_de_estacionamientos`.`servicios`
--

/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;


--
-- Table structure for table `control_de_sitios_de_estacionamientos`.`solicitudes`
--

DROP TABLE IF EXISTS `solicitudes`;
CREATE TABLE `solicitudes` (
  `id_solicitud` int(6) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(100) NOT NULL,
  `nombre_estacionamiento` varchar(100) NOT NULL,
  `direccion` int(100) NOT NULL,
  `telefono` int(10) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `tipo_solicitud` int(1) NOT NULL,
  PRIMARY KEY (`id_solicitud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `control_de_sitios_de_estacionamientos`.`solicitudes`
--

/*!40000 ALTER TABLE `solicitudes` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitudes` ENABLE KEYS */;


--
-- Table structure for table `control_de_sitios_de_estacionamientos`.`tipo_usuarios`
--

DROP TABLE IF EXISTS `tipo_usuarios`;
CREATE TABLE `tipo_usuarios` (
  `id_tipo` int(1) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `control_de_sitios_de_estacionamientos`.`tipo_usuarios`
--

/*!40000 ALTER TABLE `tipo_usuarios` DISABLE KEYS */;
INSERT INTO `tipo_usuarios` (`id_tipo`,`tipo`) VALUES 
 (1,'Usuario');
/*!40000 ALTER TABLE `tipo_usuarios` ENABLE KEYS */;


--
-- Table structure for table `control_de_sitios_de_estacionamientos`.`usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id_usuarios` int(6) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(100) CHARACTER SET latin1 NOT NULL,
  `nombre` varchar(100) CHARACTER SET latin1 NOT NULL,
  `appaterno` varchar(100) CHARACTER SET latin1 NOT NULL,
  `appmaterno` varchar(100) CHARACTER SET latin1 NOT NULL,
  `contrasena` mediumtext CHARACTER SET latin1 NOT NULL,
  `correo` varchar(100) CHARACTER SET latin1 NOT NULL,
  `foto_perfil` blob,
  `usuario_tipo` int(6) NOT NULL,
  PRIMARY KEY (`id_usuarios`),
  KEY `FK_TIPO` (`usuario_tipo`),
  CONSTRAINT `FK_TIPO` FOREIGN KEY (`usuario_tipo`) REFERENCES `tipo_usuarios` (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `control_de_sitios_de_estacionamientos`.`usuarios`
--

/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id_usuarios`,`nickname`,`nombre`,`appaterno`,`appmaterno`,`contrasena`,`correo`,`foto_perfil`,`usuario_tipo`) VALUES 
 (9,'carls_fenix','carlos','hernandez','hernandez','9d21ef6da1fb7a3ac6f13dd6c25a8cabe70f7050e51cf2891e942ff303779b55de48f0c0f7ed5871571c3d1210cfda651085ff72b0012d888ea6aeddc8150347','nitsugahernandez@gmail.com',NULL,1),
 (10,'valee','valeria','maldonado','guerrero','3627909a29c31381a071ec27f7c9ca97726182aed29a7ddd2e54353322cfb30abb9e3a6df2ac2c20fe23436311d678564d0c8d305930575f60e2d3d048184d79','vale@gmail.com',NULL,1),
 (11,'fenix','carlos','hernandez','hernandez','sayyeah1993','fenix@gmail.com',NULL,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;


--
-- Table structure for table `control_de_sitios_de_estacionamientos`.`vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
CREATE TABLE `vehiculo` (
  `id_vehiculo` int(6) NOT NULL AUTO_INCREMENT,
  `matricula` varchar(100) NOT NULL,
  `color` text NOT NULL,
  `marca` text NOT NULL,
  `hora_entrada` varchar(20) NOT NULL,
  PRIMARY KEY (`id_vehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `control_de_sitios_de_estacionamientos`.`vehiculo`
--

/*!40000 ALTER TABLE `vehiculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculo` ENABLE KEYS */;


--
-- Table structure for table `control_de_sitios_de_estacionamientos`.`zonas`
--

DROP TABLE IF EXISTS `zonas`;
CREATE TABLE `zonas` (
  `id_zona` int(6) NOT NULL AUTO_INCREMENT,
  `area` double NOT NULL,
  PRIMARY KEY (`id_zona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `control_de_sitios_de_estacionamientos`.`zonas`
--

/*!40000 ALTER TABLE `zonas` DISABLE KEYS */;
/*!40000 ALTER TABLE `zonas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
