-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 18 juin 2024 à 20:34
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `skinco12_benice_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `sinfo` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `deliveryDestination` varchar(100) NOT NULL,
  `deliveryCost` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) NOT NULL,
  `productId` bigint(20) NOT NULL,
  `quantity` double NOT NULL,
  `salePrice` decimal(10,0) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `orderId` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `expires_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '4ba726bc15a72bad7474d3efdee3db34ba55a31881b294653da79646430a0592', '[\"*\"]', '2024-06-10 00:34:47', '2024-06-10 00:34:47', '2024-06-09 23:34:47', '2024-06-09 23:34:47'),
(2, 'App\\Models\\User', 2, 'auth_token', 'deca80fd90d8462cc2d6cbe58a922a34b4c8be8d104d159cfef9572c85d342ff', '[\"*\"]', '2024-06-10 00:41:01', '2024-06-10 00:41:01', '2024-06-09 23:41:01', '2024-06-09 23:41:01'),
(3, 'App\\Models\\User', 3, 'auth_token', 'fc78bc9703f10078af3e1c4c40f56f3c2106c61829d4719550b9ce0ff458d76e', '[\"*\"]', '2024-06-10 00:46:47', '2024-06-10 00:46:47', '2024-06-09 23:46:47', '2024-06-09 23:46:47'),
(4, 'App\\Models\\User', 4, 'auth_token', 'c757115ad9a7276a7bf5d3c33cc2084cb2686c4cb43bddb3a292cce210605d1b', '[\"*\"]', '2024-06-10 00:48:19', '2024-06-10 00:48:19', '2024-06-09 23:48:19', '2024-06-09 23:48:19'),
(5, 'App\\Models\\User', 4, 'auth_token', '68a21fa678f6a84d16924bad638b8e350eacb991264bad2a1b3d264f86784d0f', '[\"*\"]', '2024-06-10 00:51:28', '2024-06-10 00:51:28', '2024-06-09 23:51:28', '2024-06-09 23:51:28'),
(6, 'App\\Models\\User', 4, 'auth_token', 'a1628c26110c0d2802525c37df9ca19ffa1c8153f6fcfe92bfce777fba419307', '[\"*\"]', '2024-06-10 00:05:03', '2024-06-10 01:03:43', '2024-06-10 00:03:43', '2024-06-10 00:05:03'),
(7, 'App\\Models\\User', 4, 'auth_token', '9f9bd5447d0d982b460d9c7b1d530835c043efa13f2d84be52d074e76f45e33d', '[\"*\"]', '2024-06-10 00:19:35', '2024-06-10 01:19:21', '2024-06-10 00:19:21', '2024-06-10 00:19:35'),
(8, 'App\\Models\\User', 4, 'auth_token', '9ba0f3823c7b71a6d1bd59ebc21b2cb1def4c26591f091dfda5d1e1fbd437289', '[\"*\"]', '2024-06-10 00:24:48', '2024-06-10 01:24:38', '2024-06-10 00:24:38', '2024-06-10 00:24:48'),
(9, 'App\\Models\\User', 4, 'auth_token', '0842fcd0f801a2d767ef8ebe41ed30abadc9cb3e446fea9a5241dda6fe69e75e', '[\"*\"]', '2024-06-10 00:25:27', '2024-06-10 01:25:02', '2024-06-10 00:25:02', '2024-06-10 00:25:27'),
(10, 'App\\Models\\User', 4, 'auth_token', '419570bbf1b4a809ebfe2911596f90109345f2900a5c6d9ee7f5a24517c8bb20', '[\"*\"]', '2024-06-10 16:12:33', '2024-06-10 16:12:33', '2024-06-10 15:12:33', '2024-06-10 15:12:33'),
(11, 'App\\Models\\User', 4, 'auth_token', 'f04215cf9b13096ed2981f54f3cc58df56bf10e134519994fbbba3f0a7c4717a', '[\"*\"]', '2024-06-10 16:12:39', '2024-06-10 16:12:39', '2024-06-10 15:12:39', '2024-06-10 15:12:39'),
(12, 'App\\Models\\User', 4, 'auth_token', '91e119a74365083abd0310a613282f3c25946d1521a26bba07a133c2f95e83a2', '[\"*\"]', '2024-06-10 16:12:41', '2024-06-10 16:12:41', '2024-06-10 15:12:41', '2024-06-10 15:12:41'),
(13, 'App\\Models\\User', 4, 'auth_token', '575e5e342aabdbb4aea5c46c47a8c756fe8dfbc48944cdfc3d29f3d527ab37f2', '[\"*\"]', '2024-06-10 16:12:42', '2024-06-10 16:12:42', '2024-06-10 15:12:42', '2024-06-10 15:12:42'),
(14, 'App\\Models\\User', 4, 'auth_token', 'cc53b0dcd9bbcd22a932c724373ef0e6804d78c022f7adcdb357b734ac35576c', '[\"*\"]', '2024-06-10 15:21:15', '2024-06-10 16:21:15', '2024-06-10 15:21:15', '2024-06-10 15:21:15'),
(15, 'App\\Models\\User', 5, 'auth_token', 'ed124747473d9f7c60a0b2b7e4eea167beeee9a207941da0db550f48ae962aa8', '[\"*\"]', '2024-06-12 11:44:34', '2024-06-12 11:44:34', '2024-06-12 10:44:34', '2024-06-12 10:44:34'),
(16, 'App\\Models\\User', 5, 'auth_token', '481402046ce0080f8aa09405ff882dddeeb6d2d2da220f6eb7abc1b0245d6b05', '[\"*\"]', '2024-06-14 11:56:20', '2024-06-14 11:57:14', '2024-06-14 10:57:14', '2024-06-14 11:56:20'),
(17, 'App\\Models\\User', 5, 'auth_token', '3820d6525de6779d12d1c29664e135ae757bd4dc959b5dcac8380ba92442c097', '[\"*\"]', '2024-06-14 12:35:21', '2024-06-14 13:28:45', '2024-06-14 12:28:45', '2024-06-14 12:35:21'),
(18, 'App\\Models\\User', 5, 'auth_token', '20a955aed76262e8178a0d506dc1598915eacf0b15439293392e1b91b7e66142', '[\"*\"]', '2024-06-14 17:39:16', '2024-06-14 18:35:31', '2024-06-14 17:35:31', '2024-06-14 17:39:16'),
(19, 'App\\Models\\User', 5, 'auth_token', 'd6438c06fd87f99383882f85c82d43ee67bc3d221e793a5bdee57758e586d1f0', '[\"*\"]', '2024-06-14 19:12:41', '2024-06-14 19:28:05', '2024-06-14 18:28:05', '2024-06-14 19:12:41'),
(20, 'App\\Models\\User', 5, 'auth_token', '756321e175571a9933564f68e3c79b79e7ed120bce058041f0581d8081094555', '[\"*\"]', '2024-06-14 20:51:40', '2024-06-14 21:39:58', '2024-06-14 20:39:58', '2024-06-14 20:51:40'),
(21, 'App\\Models\\User', 5, 'auth_token', 'e6558512f6ff454578079d8b913c21e722eb9d9e9d2a409a76acc77b147910d3', '[\"*\"]', '2024-06-14 22:57:20', '2024-06-14 22:58:10', '2024-06-14 21:58:10', '2024-06-14 22:57:20'),
(22, 'App\\Models\\User', 5, 'auth_token', '59adb5505551a56084ccfd3a56c499272e45a3009e0005caacbd1651e06d8134', '[\"*\"]', '2024-06-14 23:37:17', '2024-06-14 23:59:49', '2024-06-14 22:59:49', '2024-06-14 23:37:17'),
(23, 'App\\Models\\User', 5, 'auth_token', '7a04908540ef2873814285ba1770c81704b29e38d62893014e6c064da7abd917', '[\"*\"]', '2024-06-15 10:29:55', '2024-06-15 11:29:53', '2024-06-15 10:29:53', '2024-06-15 10:29:55'),
(24, 'App\\Models\\User', 5, 'auth_token', 'd88b3d2e6d9f53b567b848b32f57261cdbae058400349e6bf97915c0f67f8ee7', '[\"*\"]', '2024-06-15 10:42:15', '2024-06-15 11:29:54', '2024-06-15 10:29:54', '2024-06-15 10:42:15'),
(25, 'App\\Models\\User', 5, 'auth_token', '42cf31ce5a0eb39a7eeee0254cf2175f03322d6441abfae24049451dc0b40f5c', '[\"*\"]', '2024-06-18 13:27:27', '2024-06-18 13:27:27', '2024-06-18 12:27:27', '2024-06-18 12:27:27'),
(26, 'App\\Models\\User', 5, 'auth_token', 'b5122c8d3430baa9e5e0996b83fb35d6a1a1e170c88a74090e3d25e3c5218ae7', '[\"*\"]', '2024-06-18 16:55:21', '2024-06-18 17:54:31', '2024-06-18 16:54:31', '2024-06-18 16:55:21');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `oldPrice` decimal(8,2) NOT NULL,
  `newPrice` decimal(8,2) NOT NULL,
  `showAsDiscount` tinyint(1) NOT NULL,
  `showQuantityInStock` tinyint(1) NOT NULL,
  `quantityInStock` double NOT NULL,
  `image` longblob NOT NULL,
  `description` text NOT NULL,
  `categoryId` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) NOT NULL,
  `content` longblob NOT NULL,
  `productId` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `provinces_prices`
--

CREATE TABLE `provinces_prices` (
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `officeDeliveryPrice` decimal(10,0) NOT NULL,
  `homeDeliveryPrice` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `provinces_prices`
--

INSERT INTO `provinces_prices` (`code`, `name`, `officeDeliveryPrice`, `homeDeliveryPrice`) VALUES
('1', 'Adrar', 800, 1000),
('10', 'Bouira', 0, 0),
('11', 'Tamanrasset', 0, 0),
('12', 'Tébessa', 0, 0),
('13', 'Tlemcen', 0, 0),
('14', 'Tiaret', 0, 0),
('15', 'Tizi Ouzou', 0, 0),
('16', 'Alger', 0, 0),
('17', 'Djelfa', 0, 0),
('18', 'Jijel', 0, 0),
('19', 'Sétif', 0, 0),
('2', 'Chlef', 900, 1500),
('20', 'Saïda', 0, 0),
('21', 'Skikda', 0, 0),
('22', 'Sidi Bel Abbès', 0, 0),
('23', 'Annaba', 0, 0),
('24', 'Guelma', 0, 0),
('25', 'Constantine', 0, 0),
('26', 'Médéa', 0, 0),
('27', 'Mostaganem', 0, 0),
('28', 'M\'Sila', 0, 0),
('29', 'Mascara', 0, 0),
('3', 'Laghouat', 1200, 600),
('30', 'Ouargla', 0, 0),
('31', 'Oran', 0, 0),
('32', 'El Bayadh', 0, 0),
('33', 'Illizi', 0, 0),
('34', 'Bordj Bou Arréridj', 0, 0),
('35', 'Boumerdès', 0, 0),
('36', 'El Tarf', 0, 0),
('37', 'Tindouf', 0, 0),
('38', 'Tissemsilt', 0, 0),
('39', 'El Oued', 0, 0),
('4', 'Oum El Bouaghi', 0, 0),
('40', 'Khenchela', 0, 0),
('41', 'Souk Ahras', 0, 0),
('42', 'Tipaza', 0, 0),
('43', 'Mila', 0, 0),
('44', 'Aïn Defla', 0, 0),
('45', 'Naâma', 0, 0),
('46', 'Aïn Témouchent', 0, 0),
('47', 'Ghardaïa', 0, 0),
('48', 'Relizane', 0, 0),
('49', 'El M\'ghair', 0, 0),
('5', 'Batna', 0, 0),
('50', 'El Menia', 0, 0),
('51', 'Ouled Djellal', 0, 0),
('52', 'Bordj Baji Mokhtar', 0, 0),
('53', 'Béni Abbès', 0, 0),
('54', 'Timimoun', 0, 0),
('55', 'Touggourt', 0, 0),
('56', 'Djanet', 0, 0),
('57', 'In Salah', 0, 0),
('58', 'In Guezzam', 900, 0),
('6', 'Béjaïa', 0, 0),
('7', 'Biskra', 0, 0),
('8', 'Béchar', 0, 0),
('9', 'Blida', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(5, 'fouad', 'fouadchelfipgm@gmail.com', '$2y$10$q5VxwrPYoEdV1czFNJnCwO86x4nCoDSQPO2ACNTW0ec4vTpn71IUu');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_unique` (`name`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_orderid_foreign` (`orderId`),
  ADD KEY `order_items_productid_foreign` (`productId`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_categoryid_foreign` (`categoryId`);

--
-- Index pour la table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_productid_foreign` (`productId`);

--
-- Index pour la table `provinces_prices`
--
ALTER TABLE `provinces_prices`
  ADD PRIMARY KEY (`code`);

--
-- Index pour la table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_orderid_foreign` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `order_items_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_categoryid_foreign` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_productid_foreign` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
