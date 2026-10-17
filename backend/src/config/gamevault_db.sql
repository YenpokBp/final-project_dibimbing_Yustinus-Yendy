-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 17, 2026 at 12:15 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamevault_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cart_id`, `user_id`, `created_at`) VALUES
(1, 19, '2026-10-14 22:12:26'),
(2, 20, '2026-10-15 05:43:01'),
(3, 21, '2026-10-15 05:44:45'),
(4, 22, '2026-10-15 05:46:21'),
(5, 23, '2026-10-17 02:47:16'),
(6, 25, '2026-10-17 10:26:03');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` int NOT NULL,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`cart_item_id`, `cart_id`, `product_id`, `quantity`) VALUES
(4, 2, 1, 6),
(5, 3, 1, 6),
(24, 6, 44, 5);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Action & Adventure'),
(5, 'Fighting'),
(7, 'Horror'),
(9, 'Platformer'),
(4, 'Racing'),
(2, 'RPG'),
(6, 'Shooter'),
(8, 'Simulation'),
(3, 'Sports');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  `order_status` enum('pending','paid','cancelled') NOT NULL DEFAULT 'pending',
  `total_amount` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `paid_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_status`, `total_amount`, `created_at`, `paid_at`) VALUES
(1, 19, 'pending', '1700000.00', '2026-10-15 05:39:08', NULL),
(2, 19, 'pending', '1700000.00', '2026-10-15 05:40:26', NULL),
(3, 22, 'pending', '1700000.00', '2026-10-17 02:21:41', NULL),
(4, 22, 'pending', '1700000.00', '2026-10-17 02:25:08', NULL),
(5, 22, 'pending', '1700000.00', '2026-10-17 02:27:07', NULL),
(6, 22, 'pending', '1700000.00', '2026-10-17 02:35:18', NULL),
(7, 22, 'pending', '3196000.00', '2026-10-17 02:44:59', NULL),
(8, 22, 'pending', '1700000.00', '2026-10-17 02:44:59', NULL),
(9, 22, 'pending', '1700000.00', '2026-10-17 02:46:32', NULL),
(10, 22, 'pending', '1700000.00', '2026-10-17 02:46:46', NULL),
(11, 23, 'pending', '1700000.00', '2026-10-17 02:47:17', NULL),
(12, 23, 'paid', '850000.00', '2026-10-17 03:33:17', '2026-10-17 03:33:19'),
(13, 23, 'cancelled', '850000.00', '2026-10-17 03:33:17', NULL),
(14, 23, 'cancelled', '850000.00', '2026-10-17 03:33:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `unit_price` decimal(12,2) NOT NULL,
  `quantity` int NOT NULL,
  `subtotal` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `product_name`, `unit_price`, `quantity`, `subtotal`) VALUES
(1, 1, 1, 'God of War Ragnarok', '850000.00', 2, '1700000.00'),
(2, 2, 1, 'God of War Ragnarok', '850000.00', 2, '1700000.00'),
(3, 3, 1, 'God of War Ragnarok', '850000.00', 2, '1700000.00'),
(4, 4, 1, 'God of War Ragnarok', '850000.00', 2, '1700000.00'),
(5, 5, 1, 'God of War Ragnarok', '850000.00', 2, '1700000.00'),
(6, 6, 1, 'God of War Ragnarok', '850000.00', 2, '1700000.00'),
(7, 7, 3, 'The Legend of Zelda: Tears of the Kingdom', '799000.00', 4, '3196000.00'),
(8, 8, 1, 'God of War Ragnarok', '850000.00', 2, '1700000.00'),
(9, 9, 1, 'God of War Ragnarok', '850000.00', 2, '1700000.00'),
(10, 10, 1, 'God of War Ragnarok', '850000.00', 2, '1700000.00'),
(11, 11, 1, 'God of War Ragnarok', '850000.00', 2, '1700000.00'),
(12, 12, 1, 'God of War Ragnarok', '850000.00', 1, '850000.00'),
(13, 13, 1, 'God of War Ragnarok', '850000.00', 1, '850000.00'),
(14, 14, 1, 'God of War Ragnarok', '850000.00', 1, '850000.00');

-- --------------------------------------------------------

--
-- Table structure for table `platforms`
--

CREATE TABLE `platforms` (
  `platform_id` int NOT NULL,
  `platform_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `platforms`
--

INSERT INTO `platforms` (`platform_id`, `platform_name`) VALUES
(2, 'Nintendo Switch'),
(1, 'PlayStation 5'),
(3, 'Xbox Series X');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `category_id` int NOT NULL,
  `platform_id` int NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `category_id`, `platform_id`, `price`, `stock`, `image_url`, `created_at`) VALUES
(1, 'God of War Ragnarok', 1, 1, '850000.00', 91, 'god_of_war_ragnarok_ps5.jpg', '2026-10-10 04:23:27'),
(2, 'EA Sports FC 26', 3, 1, '749000.00', 20, 'fc_26_ps5.jpg', '2026-10-10 04:23:27'),
(3, 'The Legend of Zelda: Tears of the Kingdom', 1, 2, '799000.00', 6, 'zelda_totk_switch.jpg', '2026-10-10 04:23:27'),
(4, 'Cyberpunk 2077: Ultimate Edition', 2, 3, '699000.00', 8, 'cyberpunk_xbox.jpg', '2026-10-10 04:23:27'),
(5, 'EA Sports FC 26', 3, 2, '729000.00', 12, 'fc_26_switch.jpg', '2026-10-10 04:23:27'),
(15, 'Marvel\'s Spider-Man 2', 1, 1, '849000.00', 18, 'spiderman_2_ps5.jpg', '2026-10-11 01:41:14'),
(16, 'Horizon Forbidden West', 1, 1, '699000.00', 12, 'horizon_forbidden_west_ps5.jpg', '2026-10-11 01:41:14'),
(17, 'Hogwarts Legacy', 1, 3, '649000.00', 10, 'hogwarts_legacy_xbox.jpg', '2026-10-11 01:41:14'),
(18, 'Hogwarts Legacy', 1, 2, '629000.00', 7, 'hogwarts_legacy_switch.jpg', '2026-10-11 01:41:14'),
(19, 'Assassin\'s Creed Mirage', 1, 1, '599000.00', 16, 'ac_mirage_ps5.jpg', '2026-10-11 01:41:14'),
(20, 'Elden Ring', 2, 1, '699000.00', 20, 'elden_ring_ps5.jpg', '2026-10-11 01:41:14'),
(21, 'Elden Ring', 2, 3, '699000.00', 9, 'elden_ring_xbox.jpg', '2026-10-11 01:41:14'),
(22, 'Baldur\'s Gate 3', 2, 1, '799000.00', 11, 'baldurs_gate_3_ps5.jpg', '2026-10-11 01:41:14'),
(23, 'Final Fantasy XVI', 2, 1, '749000.00', 8, 'ffxvi_ps5.jpg', '2026-10-11 01:41:14'),
(24, 'Pokemon Scarlet', 2, 2, '649000.00', 25, 'pokemon_scarlet_switch.jpg', '2026-10-11 01:41:14'),
(25, 'Starfield', 2, 3, '799000.00', 6, 'starfield_xbox.jpg', '2026-10-11 01:41:14'),
(26, 'NBA 2K26', 3, 1, '799000.00', 22, 'nba_2k26_ps5.jpg', '2026-10-11 01:41:14'),
(27, 'NBA 2K26', 3, 3, '799000.00', 13, 'nba_2k26_xbox.jpg', '2026-10-11 01:41:14'),
(28, 'Nintendo Switch Sports', 3, 2, '599000.00', 15, 'switch_sports_switch.jpg', '2026-10-11 01:41:14'),
(29, 'Gran Turismo 7', 4, 1, '749000.00', 14, 'gran_turismo_7_ps5.jpg', '2026-10-11 01:41:14'),
(30, 'Forza Horizon 5', 4, 3, '699000.00', 17, 'forza_horizon_5_xbox.jpg', '2026-10-11 01:41:14'),
(31, 'Mario Kart 8 Deluxe', 4, 2, '749000.00', 30, 'mario_kart_8_switch.jpg', '2026-10-11 01:41:14'),
(32, 'Tekken 8', 5, 1, '799000.00', 12, 'tekken_8_ps5.jpg', '2026-10-11 01:41:14'),
(33, 'Street Fighter 6', 5, 3, '699000.00', 10, 'street_fighter_6_xbox.jpg', '2026-10-11 01:41:14'),
(34, 'Super Smash Bros. Ultimate', 5, 2, '799000.00', 19, 'smash_bros_ultimate_switch.jpg', '2026-10-11 01:41:14'),
(35, 'Call of Duty: Modern Warfare III', 6, 1, '849000.00', 21, 'cod_mw3_ps5.jpg', '2026-10-11 01:41:14'),
(36, 'Halo Infinite', 6, 3, '599000.00', 9, 'halo_infinite_xbox.jpg', '2026-10-11 01:41:14'),
(37, 'Splatoon 3', 6, 2, '699000.00', 16, 'splatoon_3_switch.jpg', '2026-10-11 01:41:14'),
(38, 'Resident Evil 4 Remake', 7, 1, '649000.00', 13, 're4_remake_ps5.jpg', '2026-10-11 01:41:14'),
(39, 'Alan Wake 2', 7, 3, '749000.00', 5, 'alan_wake_2_xbox.jpg', '2026-10-11 01:41:14'),
(40, 'Silent Hill 2', 7, 1, '799000.00', 7, 'silent_hill_2_ps5.jpg', '2026-10-11 01:41:14'),
(41, 'Animal Crossing: New Horizons', 8, 2, '649000.00', 24, 'animal_crossing_switch.jpg', '2026-10-11 01:41:14'),
(42, 'Farming Simulator 22', 8, 1, '499000.00', 11, 'farming_simulator_22_ps5.jpg', '2026-10-11 01:41:14'),
(43, 'The Sims 4', 8, 3, '399000.00', 18, 'the_sims_4_xbox.jpg', '2026-10-11 01:41:14'),
(44, 'Super Mario Odyssey', 9, 2, '699000.00', 20, 'mario_odyssey_switch.jpg', '2026-10-11 01:41:14'),
(45, 'Super Mario Bros. Wonder', 9, 2, '649000.00', 17, 'mario_wonder_switch.jpg', '2026-10-11 01:41:14'),
(46, 'Astro Bot', 9, 1, '749000.00', 14, 'astro_bot_ps5.jpg', '2026-10-11 01:41:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','customer') NOT NULL DEFAULT 'customer',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password_hash`, `role`, `created_at`) VALUES
(1, 'yendy', 'yendy292432@gmail.com', '$2b$10$Hw63ChT/pvrKb2dsGMJMmOcjVhQl/9Mv5U45qwxwmfP7.VCootfG2', 'customer', '2026-10-10 08:16:50'),
(2, 'bambang', 'bambang202842@gmail.com', '$2b$10$EobgLAhD2Vv/vzggFCnqseV3X6LIRdztW7ZDVL0aS1LszuvR84Go2', 'customer', '2026-10-10 08:19:51'),
(3, 'bambang', 'bambang964517@gmail.com', '$2b$10$eQndhAJOUM1frOaMAzzbt.aSeOsDe77E8E8oWp7N1X5Preawv87ia', 'customer', '2026-10-10 08:22:19'),
(4, 'bambang', 'bambang584212@gmail.com', '$2b$10$UoyJdMmRXzDO5Kj41Yc8IOtbS0K7SF14ZLNQC4rxUPfRluQ5yrNJ6', 'customer', '2026-10-10 08:23:18'),
(5, 'bambang', 'bambang527327@gmail.com', '$2b$10$3PotW.A88fsQlwtRTUMhyuT5kmUQcOiO3v0VYV4bHhBhjh.qlKcPu', 'customer', '2026-10-10 08:23:51'),
(6, 'bambang', 'bambang705639@gmail.com', '$2b$10$lX7DeC9sCxqAVKrSQbMqy.Z5zNrbPMajrQbvaSN4vF8xHgeeYXDY2', 'customer', '2026-10-10 08:26:34'),
(7, 'bambang', 'bambang549885@gmail.com', '$2b$10$3JsKe7.rRH5C5OtXyriSvurVgGD01RUR3JdZJoUKvaFHpNQRLSxJ6', 'customer', '2026-10-10 08:29:13'),
(8, 'bambang', 'bambang142824@gmail.com', '$2b$10$46DfjwVm7mg7Nfsb5JDjeurFx0tBJUunXgn0aC.Kk4u/tdZoQxQ1m', 'customer', '2026-10-10 08:31:42'),
(9, 'bambang', 'bambang887421@gmail.com', '$2b$10$oDuNP.iuR95kjl9vpQPrw.qiU.cc4k7JKkmCvoxd7ESf9sSpUMMhe', 'customer', '2026-10-10 08:32:06'),
(10, 'bambang', 'bambang527895@gmail.com', '$2b$10$rUviON3DeFJ5HEHn90AMz.3CdjOzRMniK/AArugOts6dljMZQFaKe', 'customer', '2026-10-10 08:32:16'),
(11, 'Admin GameVault', 'admin@gamevault.com', '$2b$10$4azIAItq.C5ENA9DTQg./eMNBKGH3znfScW6epgBMAXp5ti7YHpu2', 'admin', '2026-10-10 08:40:06'),
(12, 'bambang', 'bambang974798@gmail.com', '$2b$10$A4RC5g00NampZGAHisW/yeORo2hQ.WUUfcMjsUeRQgEW4iYDQvkyi', 'customer', '2026-10-10 08:40:38'),
(13, 'bambang', 'bambang714703@gmail.com', '$2b$10$lVPVSqkNA2hx5x38IBrVm.1l/ybNIrCfKYFAnbRTQz0C.1ldU5Vlq', 'customer', '2026-10-10 08:42:02'),
(14, 'bambang', 'bambang677979@gmail.com', '$2b$10$LKdevdNR/zIdzBs/y3hwv.FJBKCdOJkm.QojBIwFOwHfy2ZaEtEd.', 'customer', '2026-10-10 11:41:19'),
(15, 'bambang', 'bambang851581@gmail.com', '$2b$10$gkyuj088b0xSQulpULbJYuWQ9jeI94lX/QI3FLY2eN8UUuie.R2lK', 'customer', '2026-10-10 11:45:27'),
(16, 'bambang', 'bambang557436@gmail.com', '$2b$10$ECIDSjQojqgWU0CfWQMgfeXCMxtzGBmfz.r26gfsyzabHGBjumrvG', 'customer', '2026-10-10 11:48:16'),
(17, 'bambang', 'bambang635673@gmail.com', '$2b$10$ZfXOSQmEN.iMo7Ht35XVxOjxufgGnQx/90NqLDE.fTniSX8PwhVQK', 'customer', '2026-10-10 12:11:52'),
(18, 'bambang', 'bambang702540@gmail.com', '$2b$10$nLn8SXvoGoEEFgZjkOL8yOA3Dmp0dHCOhjS0aJle2VbEw4bPgBipG', 'customer', '2026-10-11 02:46:21'),
(19, 'bambang', 'bambang336297@gmail.com', '$2b$10$kdhyB/RO2CPb4O7Uxpg73OHWWsNCTDeRO978HJV/7Gz66txtDhkw6', 'customer', '2026-10-11 02:57:47'),
(20, 'bambang', 'bambang832951@gmail.com', '$2b$10$JXx0C.GRVU/K0Xucwj6j0uIyGZ4.dNAWm5Pld/poZhf8rP9GwTVka', 'customer', '2026-10-15 05:42:59'),
(21, 'bambang', 'bambang812019@gmail.com', '$2b$10$fHD23Enu3RKaRM5PfM2fn.ApeP.W4jRzThv3Lgm6O/2rm5h6aKNCm', 'customer', '2026-10-15 05:44:43'),
(22, 'bambang', 'bambang121267@gmail.com', '$2b$10$1UcZaASLsU3noV8KylAJGeMMETDBicSq9QF5Ro.21.mWi15ZVUa0m', 'customer', '2026-10-15 05:46:20'),
(23, 'bambang', 'bambang567034@gmail.com', '$2b$10$MQ6bzQIdJ45T257ZiwTs1O1YJweWdVsee0/79Z0C3XledR4k603Ea', 'customer', '2026-10-17 02:47:14'),
(24, 'customer dua', 'customer2_315232@gmail.com', '$2b$10$WCW0rxR6ttD00PHrkIjr4.mWsv/03I.kHXH8fzAYlFt6nXnY.m/Lq', 'customer', '2026-10-17 03:33:17'),
(25, 'yenpok', 'yenpok@mail.com', '$2b$10$ce/USSrk8w2SxXx4f9OnIeZRjHBwwFpG46zUgalVxL5dJ9oRz80Sa', 'customer', '2026-10-17 09:02:07'),
(26, 'Yustinus Yendy', 'yenpok@mail.comm', '$2b$10$K1m0CmMvgmaSQMXctphwlOB9ivq7bld5Z6K60hB8RD23cl2ndzeGm', 'customer', '2026-10-17 09:04:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD UNIQUE KEY `uc_cart_product` (`cart_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `platforms`
--
ALTER TABLE `platforms`
  ADD PRIMARY KEY (`platform_id`),
  ADD UNIQUE KEY `platform_name` (`platform_name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `uq_product_name_platform` (`product_name`,`platform_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `platform_id` (`platform_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `platforms`
--
ALTER TABLE `platforms`
  MODIFY `platform_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`platform_id`) REFERENCES `platforms` (`platform_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
