
CREATE DATABASE IF NOT EXISTS `db-pimtx` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `db-pimtx`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

DROP TABLE IF EXISTS `estados`;
CREATE TABLE IF NOT EXISTS `estados` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id`, `nombre`) VALUES
(1, 'Activo'),
(2, 'Bloqueado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `intereses`
--

DROP TABLE IF EXISTS `intereses`;
CREATE TABLE IF NOT EXISTS `intereses` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `intereses`
--

INSERT INTO `intereses` (`id`, `nombre`) VALUES
(1, 'Practicante de Tenis'),
(2, 'Aficionado a la lectura'),
(3, 'Intérprete de piano clásico'),
(4, 'Viajero frecuente'),
(5, 'Filatelia y otros coleccionismos'),
(6, 'Bailarín de Tango'),
(7, 'Escritor de literatura infantil'),
(8, 'Aficionado a la Ópera'),
(9, 'Protector del medio ambiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(21, '2021_02_13_013954_usuarios', 1),
(22, '2021_02_13_015320_perfiles', 1),
(23, '2021_02_13_015334_estados', 1),
(24, '2021_02_13_015354_intereses', 1),
(25, '2021_02_13_015417_rel_usuarios_intereses', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

DROP TABLE IF EXISTS `perfiles`;
CREATE TABLE IF NOT EXISTS `perfiles` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `perfiles`
--

INSERT INTO `perfiles` (`id`, `nombre`) VALUES
(1, 'Común'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_usuarios_intereses`
--

DROP TABLE IF EXISTS `rel_usuarios_intereses`;
CREATE TABLE IF NOT EXISTS `rel_usuarios_intereses` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint(20) UNSIGNED NOT NULL,
  `id_interes` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rel_usuarios_intereses_id_usuario_foreign` (`id_usuario`),
  KEY `rel_usuarios_intereses_id_interes_foreign` (`id_interes`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rel_usuarios_intereses`
--

INSERT INTO `rel_usuarios_intereses` (`id`, `id_usuario`, `id_interes`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2021-02-15 17:53:39', '2021-02-15 17:53:39'),
(2, 1, 2, '2021-02-15 17:53:39', '2021-02-15 17:53:39'),
(3, 1, 3, '2021-02-15 17:53:39', '2021-02-15 17:53:39'),
(4, 1, 4, '2021-02-15 17:53:39', '2021-02-15 17:53:39'),
(5, 1, 5, '2021-02-15 17:53:39', '2021-02-15 17:53:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_perfil` bigint(20) UNSIGNED NOT NULL,
  `id_estado` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_email_unique` (`email`) USING HASH,
  KEY `usuarios_id_perfil_foreign` (`id_perfil`),
  KEY `usuarios_id_estado_foreign` (`id_estado`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_perfil`, `id_estado`, `nombre`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Tomás Iñiguez', 'tomas.iniguez.gonzalez@gmail.com', '$2y$10$P96oLHU.amwIzYyfXl0gH.7QTXDryPwi3QibduAoD9BMftCEgAq2W', '2021-02-13 22:43:07', '2021-02-15 17:53:39');
COMMIT;

