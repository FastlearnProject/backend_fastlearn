-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-07-2024 a las 17:57:51
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.1.2-1ubuntu2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `basedatos_fl`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_buscaradmin` (IN `p_correo` VARCHAR(100))   BEGIN
    SELECT id_admin, nombre, correo, contrasena, rol
    FROM administrador
    WHERE correo = p_correo;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_buscarusuario` (IN `p_correo` VARCHAR(100))   BEGIN
	SELECT id_usuario, correo, contrasena, rol
	FROM usuario
	WHERE correo = p_correo;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_eliminararticulo` (IN `p_id` INT(10))   BEGIN
DELETE FROM articulos WHERE p_id = id_articulo;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_eliminarcurso` (IN `p_id` INT(10))   BEGIN
DELETE FROM cursos WHERE p_id = id_cursos;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_eliminarusuario` (IN `p_id` INT(10))   BEGIN
DELETE FROM usuario WHERE p_id = id_usuario;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_insertaradmin` (IN `p_nombre` VARCHAR(100), IN `p_correo` VARCHAR(100), IN `p_contrasena` VARCHAR(100), IN `p_rol` VARCHAR(10))   BEGIN
INSERT INTO administrador (nombre, correo, contrasena, rol)
VALUES (p_nombre, p_correo, p_contrasena, p_rol);
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_insertararticulo` (IN `p_id_usuario` INT(10), IN `p_titulo` VARCHAR(100), IN `p_texto1` TEXT, IN `p_texto2` TEXT, IN `p_texto3` TEXT, IN `p_texto4` TEXT)   BEGIN
INSERT INTO articulos (id_usuario, titulo, texto1, texto2, texto3, texto4)
VALUES (p_id_usuario, p_titulo, p_texto1, p_texto2, p_texto3, p_texto4);
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_insertarcurso` (IN `p_img` VARCHAR(200), IN `p_video` VARCHAR(200), IN `p_titulo` VARCHAR(100), IN `p_descripcion` TEXT, IN `p_link` TEXT, IN `p_tags` TEXT, IN `p_categoria` VARCHAR(10))   BEGIN
	INSERT INTO cursos( imagen, video, titulo , descripcion , links, tags, categoria) 
    VALUES ( p_img , p_video , p_titulo , p_descripcion , p_link, p_tags, p_categoria);
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_insertarusuario` (IN `p_nombre` VARCHAR(100), IN `p_correo` VARCHAR(100), IN `p_contrasena` VARCHAR(100), IN `p_fechaNacimiento` DATE, IN `p_rol` VARCHAR(100), IN `p_genero` VARCHAR(100), IN `p_telefono` VARCHAR(100))   BEGIN
    INSERT INTO usuario (nombre, correo, contrasena, fechaNacimiento, rol, genero, telefono)
    VALUES (p_nombre, p_correo, p_contrasena, p_fechaNacimiento, p_rol, p_genero, p_telefono);
    
    SELECT LAST_INSERT_ID() AS id_usuario;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_modificarrol` (IN `p_correo` VARCHAR(255), IN `p_rol` VARCHAR(255))   BEGIN
    UPDATE usuario 
    SET rol = p_rol
    WHERE correo = p_correo;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_modificarusuario` (IN `p_id` INT(10), IN `p_nombre` VARCHAR(100), IN `p_correo` VARCHAR(100), IN `p_contrasena` VARCHAR(100), IN `p_fecha` DATE, IN `p_genero` VARCHAR(100), IN `p_telefono` VARCHAR(100))   BEGIN
UPDATE usuario 
SET nombre = p_nombre, correo = p_correo, contrasena = p_contrasena , fechaNacimiento = p_fecha , genero = p_genero, telefono = p_telefono
WHERE id_usuario = p_id;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_mostraradmin` (IN `p_id_admin` INT(10))   BEGIN
SELECT * FROM administrador
WHERE id_admin = p_id_admin;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_mostraradmins` ()   BEGIN
SELECT * FROM administrador;

END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_mostrararticulo` (IN `p_id_articulo` INT(10))   BEGIN
SELECT * FROM articulos
WHERE id_articulo = p_id_articulo;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_mostrararticulos` ()   BEGIN
SELECT * FROM articulos;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_mostrararticulouser` (IN `p_id_usuario` INT(10))   BEGIN
SELECT * FROM articulos
WHERE id_usuario = p_id_usuario;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_mostrarcurso` (IN `p_id_curso` INT(10))   BEGIN
SELECT * FROM cursos
WHERE p_id_curso = id_cursos;

END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_mostrarcursos` ()   BEGIN
SELECT * FROM cursos;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_mostrarusuario` (IN `p_id` INT(10))   BEGIN
SELECT * FROM usuario
WHERE id_usuario = p_id;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_mostrarusuarioporcorreo` (IN `p_correo` VARCHAR(255))   BEGIN
    SELECT * FROM usuario WHERE p_correo = correo;
END$$

CREATE DEFINER=`basedatos_fl`@`%` PROCEDURE `sp_mostrarusuarios` ()   BEGIN
SELECT * FROM usuario;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id_admin` int NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `correo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contrasena` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rol` varchar(10) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id_admin`, `nombre`, `correo`, `contrasena`, `rol`) VALUES
(1, 'Agustin Penagos López', 'agustin.lopez2606@admin.com', '$2b$10$vAx6FKIyIJviW1yycN3GmuRZDbzfR9XtSTqbQEACqg42dTdEOgcJe', 'admin'),
(2, 'Ayelen Celis Cardona', 'ayelen.celis92@admin.com', '$2b$10$bxbdF7IMs0OKzoA1005sS.kqZ7oH6cj96q4EBE49fsYuyji8k1L0a', 'admin'),
(3, 'Juan Sebastian Castañeda', 'juansecuadros344@admin.com', '$2b$10$pFk3oJCZ.eO0GH0C14J7Guk.BPUkfjfOrByZvZiDKujo0VM5MT3b6', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id_articulo` int NOT NULL,
  `id_usuario` int NOT NULL,
  `titulo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `texto1` text COLLATE utf8mb4_general_ci NOT NULL,
  `texto2` text COLLATE utf8mb4_general_ci NOT NULL,
  `texto3` text COLLATE utf8mb4_general_ci NOT NULL,
  `texto4` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id_articulo`, `id_usuario`, `titulo`, `texto1`, `texto2`, `texto3`, `texto4`) VALUES
(5, 14, 'aaa', 'aaa', 'aaa', 'aa', 'aa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id_cursos` int NOT NULL,
  `imagen` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `video` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `links` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `tags` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `categoria` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_cursos`, `imagen`, `video`, `titulo`, `descripcion`, `links`, `tags`, `categoria`) VALUES
(50, 'https://fastlearn.blob.core.windows.net/fastlearn/pexels-dtanpt-9551192.jpg', 'https://fastlearn.blob.core.windows.net/fastlearn/pexels-dtanpt-9551192.jpg', 'Como montar una carpa', 'En este tutorial te enseñare a montar una carpa tipo magnus', 'https://www.amazon.com/-/es/Los-m%C3%A1s-vendidos-Toldos,-Carpas-y-P%C3%A9rgolas/zgbs/lawn-garden/14135021011', '#campamento', 'Nivel 1'),
(63, 'https://fastlearn.blob.core.windows.net/fastlearn/stunt.webp', 'https://fastlearn.blob.core.windows.net/fastlearn/C%C3%83%C2%93MO%20HACER%20STUNT_%20CAP%201%20-%20GIROS.mp4', 'Curso para aprender hacer un stunt', 'Este es un video para aprender a hacer stunt en moto', 'https://www.youtube.com/watch?v=ISWkSb3Y2rs&ab_channel=NKDPEREIRA', '#stuntlife #bikelife', 'undefined'),
(68, 'https://fastlearn.blob.core.windows.net/fastlearn/2.png', 'https://fastlearn.blob.core.windows.net/fastlearn/imagen1.jfif', 'Matematicas', 'sadsa', 'https://github.com/', 'th', 'Nivel 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_contrasenas`
--

CREATE TABLE `historial_contrasenas` (
  `id_historial` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `nombre_usuario` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restablecimientocontrasena`
--

CREATE TABLE `restablecimientocontrasena` (
  `id_restablecimiento` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `nombre_usuario` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `estado` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subircontenido`
--

CREATE TABLE `subircontenido` (
  `id_subir_contenido` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `informacion` text COLLATE utf8mb4_general_ci,
  `multimedia` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `rol` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `genero` varchar(100) DEFAULT NULL,
  `telefono` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `correo`, `contrasena`, `fechaNacimiento`, `rol`, `genero`, `telefono`) VALUES
(13, 'Agustin Penagos López', 'agustin.lopez2606@gmail.com', '$2b$10$IRv1tdyST7WVkGo1y6glaekf7RxrIG9fJCzeWGYNQ9ZZhfO0OqN66', '2004-06-26', 'teacher', 'null', '301-621-7959'),
(14, 'Liyoji', 'lio@gmail.com', '$2b$10$0Rg67zr7Pl2RxGobsQDeVeVJqjeV601Xfx/IX7jLe8EUtF2Hww6y2', '2024-07-17', 'student', 'null', '301-220-2707'),
(15, 'Emilio', 'E@gmail.com', '$2b$10$.dR9BbxYhUT6uPXNzLY1gu0/UWO28C7Eem7K0Irem1oVdYB6Detm.', '2024-07-14', 'teacher', 'null', '581-323-5423'),
(16, 'Emilio', 'E@gmail.com', '$2b$10$7QvxHSt/yAf8YRc/IzdRHuwez99L6rLm3LbKqXmBiEBmpFxZ2ckUW', '2024-07-14', 'teacher', 'null', '581-323-5423'),
(17, 'Ramiro', 't@gmail.com', '$2b$10$1VQGWq.Vfpb/yVlrhJHviOwwopmyWKCz1WTuM4/L8CWM/7uiBp9CG', '2005-05-26', 'teacher', 'masculino', '323-535-0154'),
(19, 'cvbnm,.-', 'dfghjkl@gmail.com', '$2b$10$k9BGYAww3e9bwLLWBX3YEepdrrim1SiQge1XgeqZab2LNZtqlJFui', '2024-07-26', 'student', 'null', '301-220-2707'),
(20, 'Yeison', 'Yeison@gmail.com', '$2b$10$9ZgOCLh2KVAnKMOzFY0ekuVGZZreuTS.t5/OAqO55O6PRkZXhVtO6', '2005-05-10', 'teacher', 'masculino', '314-253-4755'),
(21, 'Samuel', 're@gmail.com', '$2b$10$Za9qa23oIEbj..JZ8pboK.Cbf7CrQbN5gYXRYIHutgZHId7aZtrLu', '2006-07-04', 'teacher', 'null', '314-655-1518'),
(22, 'Yeison', 'Yeison@gmail.com', '$2b$10$hQqG9yWBg4MrICkkPsj2kOPDzi0lA5GljsgUZqCwzk5whnKBfOnWu', '2010-05-11', 'teacher', 'null', '323-535-0154'),
(23, 'Yeison', 'Yeison@gmail.com', '$2b$10$hRk7G796i1Lf.6yz1eHH2OKiX2Q.2k8JWVyjE2SuARfvQCUbpIW.C', '2000-05-16', 'teacher', 'null', '323-535-0154'),
(24, 'Becerra', 'luisbecerra@gmail.com', '$2b$10$Qwq6n8DZdZSREDkGhG8PQusVEvn4n6oxDYmNwXJJBdQjyR8g.4Oe2', '2005-06-23', 'teacher', 'null', '323-535-0154');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vercontenido`
--

CREATE TABLE `vercontenido` (
  `IdVerContenido` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `ContenidoSubido` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `verinformacion`
--

CREATE TABLE `verinformacion` (
  `IdVerinformacion` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_docente` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id_articulo`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_cursos`);

--
-- Indices de la tabla `historial_contrasenas`
--
ALTER TABLE `historial_contrasenas`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `restablecimientocontrasena`
--
ALTER TABLE `restablecimientocontrasena`
  ADD PRIMARY KEY (`id_restablecimiento`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `subircontenido`
--
ALTER TABLE `subircontenido`
  ADD PRIMARY KEY (`id_subir_contenido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `vercontenido`
--
ALTER TABLE `vercontenido`
  ADD PRIMARY KEY (`IdVerContenido`),
  ADD KEY `ContenidoSubido` (`ContenidoSubido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `verinformacion`
--
ALTER TABLE `verinformacion`
  ADD PRIMARY KEY (`IdVerinformacion`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_docente` (`id_docente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_admin` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id_articulo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id_cursos` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `historial_contrasenas`
--
ALTER TABLE `historial_contrasenas`
  MODIFY `id_historial` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `restablecimientocontrasena`
--
ALTER TABLE `restablecimientocontrasena`
  MODIFY `id_restablecimiento` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `subircontenido`
--
ALTER TABLE `subircontenido`
  MODIFY `id_subir_contenido` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `vercontenido`
--
ALTER TABLE `vercontenido`
  MODIFY `IdVerContenido` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `verinformacion`
--
ALTER TABLE `verinformacion`
  MODIFY `IdVerinformacion` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_contrasenas`
--
ALTER TABLE `historial_contrasenas`
  ADD CONSTRAINT `historial_contrasenas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `restablecimientocontrasena`
--
ALTER TABLE `restablecimientocontrasena`
  ADD CONSTRAINT `restablecimientocontrasena_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `subircontenido`
--
ALTER TABLE `subircontenido`
  ADD CONSTRAINT `subircontenido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `vercontenido`
--
ALTER TABLE `vercontenido`
  ADD CONSTRAINT `vercontenido_ibfk_1` FOREIGN KEY (`ContenidoSubido`) REFERENCES `subircontenido` (`id_subir_contenido`) ON DELETE CASCADE,
  ADD CONSTRAINT `vercontenido_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `verinformacion`
--
ALTER TABLE `verinformacion`
  ADD CONSTRAINT `verinformacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `verinformacion_ibfk_2` FOREIGN KEY (`id_docente`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
