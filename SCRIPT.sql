-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 09-01-2025 a las 15:12:39
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `KISS`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas_unidas`
--

CREATE TABLE `empresas_unidas` (
  `id_emp_uni` int NOT NULL COMMENT 'ID EMPRESAS UNIDAS',
  `rut_emp_pri` varchar(25) NOT NULL COMMENT 'RUT EMPRESA PRINCIPAL',
  `rut_emp_con` varchar(255) NOT NULL COMMENT 'RUT EMPRESA CONTRATISTA',
  `rut_emp_subcon` varchar(25) DEFAULT NULL COMMENT 'RUT EMPRESA SUBCONTRATISTA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empresas_unidas`
--

INSERT INTO `empresas_unidas` (`id_emp_uni`, `rut_emp_pri`, `rut_emp_con`, `rut_emp_subcon`) VALUES
(1, '11111111-1', '22222222-2', NULL),
(2, '11111111-1', '22222233-2', '33333333-3'),
(3, '11111112-1', '22222223-2', NULL),
(4, '11111112-1', '22222333-2', '33333334-3'),
(5, '11111223-1', '22222333-2', NULL),
(6, '11111223-1', '22222223-2', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa_contratista`
--

CREATE TABLE `empresa_contratista` (
  `id_emp_con` int NOT NULL COMMENT '\r\nID EMPRESA CONTRATISTA',
  `rut_emp_con` varchar(25) NOT NULL COMMENT 'RUT EMPRESA CONTRATISTA',
  `nombre_emp_con` varchar(255) NOT NULL COMMENT 'NOMBRE EMEPRESA CONTRATISTA',
  `correo_emp_con` varchar(255) NOT NULL COMMENT 'CORREO EMPRESA CONTRATISTA',
  `status_emp_con` int NOT NULL COMMENT '0 DESACTIVADO\r\n1 ACTIVADO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empresa_contratista`
--

INSERT INTO `empresa_contratista` (`id_emp_con`, `rut_emp_con`, `nombre_emp_con`, `correo_emp_con`, `status_emp_con`) VALUES
(1, '22222222-2', 'Empresa Contratista Sofía', 'sofia@sof.cl', 1),
(2, '22222223-2', 'Empresa Contratista Gerencia', 'gerencia@gen.cl', 1),
(3, '22222233-2', 'Empresa Contratista Delco', 'del@del.cl', 1),
(4, '22222333-2', 'Empresa Contratista azúcar', 'azucar@azucar.cl', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa_principal`
--

CREATE TABLE `empresa_principal` (
  `id_emp_pri` int NOT NULL COMMENT 'ID Empresa Principal',
  `rut_emp_pri` varchar(25) NOT NULL COMMENT 'RUT EMPRESA Principal',
  `nombre_emp_pri` varchar(255) NOT NULL COMMENT 'NOMBRE EMPRESA PRINCIPAL',
  `correo_emp_pri` varchar(255) NOT NULL COMMENT 'CORREO EMPRESA PRINCIPAL',
  `status_emp_pri` int NOT NULL COMMENT '0 DESACTIVADA\r\n1 ACTIVADA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empresa_principal`
--

INSERT INTO `empresa_principal` (`id_emp_pri`, `rut_emp_pri`, `nombre_emp_pri`, `correo_emp_pri`, `status_emp_pri`) VALUES
(1, '11111111-1', 'Empresa Prueba ', 'prueba@prueba.cl', 1),
(2, '11111112-1', 'Empresa Prueba Ecommerce', 'eco@prueba.cl', 1),
(3, '11111122-1', 'Empresa Prueba Comunicaciones', 'com@prueba.cl', 1),
(4, '11111222-1', 'Empresa PRUEBA gaming', 'gaming@prueba.cl', 1),
(5, '11111223-1', 'Empresa Prueba Delta', 'delta@prueba.cl', 1),
(6, '11111233-1', 'Empresa Prueba Force', 'force@prueba.cl', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa_subcontratista`
--

CREATE TABLE `empresa_subcontratista` (
  `id_emp_subcon` int NOT NULL COMMENT 'ID EMPRESA SUBCONTRATISTA',
  `rut_emp_subcon` varchar(25) NOT NULL COMMENT 'RUT EMPRESA SUBCONTRATISTA',
  `nombre_emp_subcon` varchar(255) NOT NULL COMMENT 'NOMBRE EMPRESA SUBCONTRATISTA',
  `correo_emp_subcon` varchar(255) NOT NULL COMMENT 'CORREO EMPRESA SUBCONTRATISTA',
  `status_emp_subcon` int NOT NULL COMMENT '0 DESACTIVADO\r\n1 ACTIVADO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empresa_subcontratista`
--

INSERT INTO `empresa_subcontratista` (`id_emp_subcon`, `rut_emp_subcon`, `nombre_emp_subcon`, `correo_emp_subcon`, `status_emp_subcon`) VALUES
(1, '33333333-3', 'PRUEBA SUB CONTRATISTA SODIMAC', 'sodimac@sodimac.cl', 1),
(2, '33333334-3', 'PRUEBA SUB CONTRATISTA CERAVE', 'cerave@cerave.cl', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodo`
--

CREATE TABLE `periodo` (
  `id_periodo` int NOT NULL COMMENT 'ID PERIODO',
  `mesanio_periodo` int NOT NULL COMMENT 'ANIO Y MES EJEM 202404',
  `minimo_imponible_periodo` int NOT NULL COMMENT 'MINIMO IMPONIBLE POR PERIODOS',
  `maximo_imponible_periodo` int NOT NULL COMMENT 'MAXIMO IMPONIBLE POR PERIODOS',
  `status_periodo` int NOT NULL COMMENT '0 DESACTIVADO\r\n1 ACTIVADO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `periodo`
--

INSERT INTO `periodo` (`id_periodo`, `mesanio_periodo`, `minimo_imponible_periodo`, `maximo_imponible_periodo`, `status_periodo`) VALUES
(1, 202410, 500000, 3195847, 1),
(2, 202411, 500000, 3224300, 1),
(3, 202412, 500000, 3238527, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `id_sol` int NOT NULL COMMENT 'ID SOLICITUD',
  `id_emp_uni` int NOT NULL COMMENT 'ID EMPRESAS UNIDAS',
  `nombre_contrato_sol` varchar(255) NOT NULL COMMENT 'NOMBRE CONTRATO PROYECTO SOLICITUD',
  `cant_trab_acreditar_sol` int NOT NULL COMMENT 'CANTIDAD TRABAJADORES CERTIFICAR SOLICITUD',
  `total_trab_sol` int NOT NULL COMMENT 'CANTIDAD TOTALES DE LA EMPRESA ',
  `estado_certificacion_sol` enum('Ingresado','Solicitado','Aprobado','No Aprobado','Certificado','Documentado','Histórico','Completo','En Proceso','No Conforme','Inactivo','No certificado') NOT NULL COMMENT 'ESTADO CERTIFICACION',
  `id_periodo` int NOT NULL COMMENT 'ID PERIODO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`id_sol`, `id_emp_uni`, `nombre_contrato_sol`, `cant_trab_acreditar_sol`, `total_trab_sol`, `estado_certificacion_sol`, `id_periodo`) VALUES
(1, 1, 'NOMBRE PROYECTO 1', 5, 5, 'Certificado', 1),
(2, 2, 'NOMBRE PROYECTO 2', 10, 10, 'Ingresado', 3),
(3, 3, 'NOMBRE PROYECTO 3', 15, 15, 'Ingresado', 3),
(4, 1, 'NOMBRE PROYECTO 4', 15, 15, 'Solicitado', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajadores`
--

CREATE TABLE `trabajadores` (
  `id_trabajador` int NOT NULL COMMENT 'ID TRABAJADOR',
  `rut_trabajador` varchar(25) NOT NULL COMMENT 'RUT TRABAJADOR',
  `nombre_trabajador` varchar(25) NOT NULL COMMENT 'NOMBRE TRABAJADOR',
  `apaterno_trabajador` varchar(25) NOT NULL COMMENT 'APELLIDO PATERNO TRABAJADOR',
  `amaterno_trabajador` varchar(25) NOT NULL COMMENT 'APELLIDO MATERNO TRABAJADOR',
  `id_sol` int NOT NULL COMMENT 'ID SOLICITUD'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `trabajadores`
--

INSERT INTO `trabajadores` (`id_trabajador`, `rut_trabajador`, `nombre_trabajador`, `apaterno_trabajador`, `amaterno_trabajador`, `id_sol`) VALUES
(1, '12345678-9', 'Juan', 'Pérez', 'Gómez', 1),
(2, '23456789-0', 'Pedro', 'López', 'Rodríguez', 1),
(3, '34567890-1', 'María', 'Hernández', 'Sánchez', 1),
(4, '45678901-2', 'Carlos', 'García', 'Martínez', 1),
(5, '56789012-3', 'Ana', 'López', 'González', 1),
(6, '67890123-4', 'Luis', 'Pérez', 'Hernández', 2),
(7, '78901234-5', 'Sofía', 'García', 'Rodríguez', 2),
(8, '89012345-6', 'Jorge', 'Martínez', 'Sánchez', 2),
(9, '90123456-7', 'Elena', 'López', 'González', 2),
(10, '01234567-8', 'Diego', 'Pérez', 'Hernández', 2),
(11, '21234567-8', 'Marcela', 'García', 'Rodríguez', 2),
(12, '22345678-9', 'Jaime', 'López', 'González', 2),
(13, '23456789-0', 'Carolina', 'Hernández', 'Sánchez', 2),
(14, '24567890-1', 'Andrés', 'García', 'Martínez', 2),
(15, '25678901-2', 'Valeria', 'López', 'González', 2),
(16, '31234567-8', 'Tomás', 'García', 'Martínez', 3),
(17, '32345678-9', 'Lucía', 'López', 'González', 3),
(18, '33456789-0', 'Sebastian', 'Pérez', 'Hernández', 3),
(19, '34567890-1', 'Sofia', 'López', 'González', 3),
(20, '35678901-2', 'Jorge', 'Pérez', 'Hernández', 3),
(21, '36789012-3', 'Rodrigo', 'López', 'González', 3),
(22, '37890123-4', 'Marcela', 'Pérez', 'Hernández', 3),
(23, '38901234-5', 'Javier', 'García', 'Rodríguez', 3),
(24, '39012345-6', 'Jorge', 'Martínez', 'Sánchez', 3),
(25, '30123456-7', 'Martín', 'López', 'González', 3),
(26, '33145678-9', 'Juan', 'Pérez', 'Gómez', 3),
(27, '33256789-0', 'Carolina', 'Hernández', 'Sánchez', 3),
(28, '33367890-1', 'Andrés', 'García', 'Martínez', 3),
(29, '33478901-2', 'Valeria', 'López', 'González', 3),
(30, '33589012-3', 'Tomás', 'García', 'Martínez', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empresas_unidas`
--
ALTER TABLE `empresas_unidas`
  ADD PRIMARY KEY (`id_emp_uni`),
  ADD KEY `fk_emp_pri_rut` (`rut_emp_pri`),
  ADD KEY `fk_emp_con_rut` (`rut_emp_con`),
  ADD KEY `fk_emp_subcon_rut` (`rut_emp_subcon`);

--
-- Indices de la tabla `empresa_contratista`
--
ALTER TABLE `empresa_contratista`
  ADD PRIMARY KEY (`id_emp_con`),
  ADD UNIQUE KEY `RUT_EMP_CON` (`rut_emp_con`);

--
-- Indices de la tabla `empresa_principal`
--
ALTER TABLE `empresa_principal`
  ADD PRIMARY KEY (`id_emp_pri`),
  ADD UNIQUE KEY `RUT_EMP_PRINCIPAL` (`rut_emp_pri`);

--
-- Indices de la tabla `empresa_subcontratista`
--
ALTER TABLE `empresa_subcontratista`
  ADD PRIMARY KEY (`id_emp_subcon`),
  ADD UNIQUE KEY `RUT_EMP_SUBCON` (`rut_emp_subcon`);

--
-- Indices de la tabla `periodo`
--
ALTER TABLE `periodo`
  ADD PRIMARY KEY (`id_periodo`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`id_sol`),
  ADD KEY `fk_periodo` (`id_periodo`),
  ADD KEY `fk_emp_unidas` (`id_emp_uni`);

--
-- Indices de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD PRIMARY KEY (`id_trabajador`),
  ADD KEY `fk_solicitud_trabajador` (`id_sol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empresas_unidas`
--
ALTER TABLE `empresas_unidas`
  MODIFY `id_emp_uni` int NOT NULL AUTO_INCREMENT COMMENT 'ID EMPRESAS UNIDAS', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `empresa_contratista`
--
ALTER TABLE `empresa_contratista`
  MODIFY `id_emp_con` int NOT NULL AUTO_INCREMENT COMMENT '\r\nID EMPRESA CONTRATISTA', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `empresa_principal`
--
ALTER TABLE `empresa_principal`
  MODIFY `id_emp_pri` int NOT NULL AUTO_INCREMENT COMMENT 'ID Empresa Principal', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `empresa_subcontratista`
--
ALTER TABLE `empresa_subcontratista`
  MODIFY `id_emp_subcon` int NOT NULL AUTO_INCREMENT COMMENT 'ID EMPRESA SUBCONTRATISTA', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `periodo`
--
ALTER TABLE `periodo`
  MODIFY `id_periodo` int NOT NULL AUTO_INCREMENT COMMENT 'ID PERIODO', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `id_sol` int NOT NULL AUTO_INCREMENT COMMENT 'ID SOLICITUD', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  MODIFY `id_trabajador` int NOT NULL AUTO_INCREMENT COMMENT 'ID TRABAJADOR', AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empresas_unidas`
--
ALTER TABLE `empresas_unidas`
  ADD CONSTRAINT `fk_emp_con_rut` FOREIGN KEY (`rut_emp_con`) REFERENCES `empresa_contratista` (`rut_emp_con`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_emp_pri_rut` FOREIGN KEY (`rut_emp_pri`) REFERENCES `empresa_principal` (`rut_emp_pri`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_emp_subcon_rut` FOREIGN KEY (`rut_emp_subcon`) REFERENCES `empresa_subcontratista` (`rut_emp_subcon`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `fk_emp_unidas` FOREIGN KEY (`id_emp_uni`) REFERENCES `empresas_unidas` (`id_emp_uni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `periodo` (`id_periodo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD CONSTRAINT `fk_solicitud_trabajador` FOREIGN KEY (`id_sol`) REFERENCES `solicitud` (`id_sol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
