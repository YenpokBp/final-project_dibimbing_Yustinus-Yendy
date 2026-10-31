-- MySQL dump 10.13  Distrib 8.4.11, for Linux (x86_64)
--
-- Host: localhost    Database: gamevault_db
-- ------------------------------------------------------
-- Server version	8.4.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`cart_item_id`),
  UNIQUE KEY `uc_cart_product` (`cart_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (4,2,1,6),(5,3,1,6),(27,6,46,2),(28,6,44,1),(29,6,40,1),(34,7,45,1),(35,7,44,1);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,19,'2026-10-14 22:12:26'),(2,20,'2026-10-15 05:43:01'),(3,21,'2026-10-15 05:44:45'),(4,22,'2026-10-15 05:46:21'),(5,23,'2026-10-17 02:47:16'),(6,25,'2026-10-17 10:26:03'),(7,28,'2026-10-31 04:50:43');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Action & Adventure'),(5,'Fighting'),(7,'Horror'),(9,'Platformer'),(4,'Racing'),(2,'RPG'),(6,'Shooter'),(8,'Simulation'),(3,'Sports');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `unit_price` decimal(12,2) NOT NULL,
  `quantity` int NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,'God of War Ragnarok',850000.00,2,1700000.00),(2,2,1,'God of War Ragnarok',850000.00,2,1700000.00),(3,3,1,'God of War Ragnarok',850000.00,2,1700000.00),(4,4,1,'God of War Ragnarok',850000.00,2,1700000.00),(5,5,1,'God of War Ragnarok',850000.00,2,1700000.00),(6,6,1,'God of War Ragnarok',850000.00,2,1700000.00),(7,7,3,'The Legend of Zelda: Tears of the Kingdom',799000.00,4,3196000.00),(8,8,1,'God of War Ragnarok',850000.00,2,1700000.00),(9,9,1,'God of War Ragnarok',850000.00,2,1700000.00),(10,10,1,'God of War Ragnarok',850000.00,2,1700000.00),(11,11,1,'God of War Ragnarok',850000.00,2,1700000.00),(12,12,1,'God of War Ragnarok',850000.00,1,850000.00),(13,13,1,'God of War Ragnarok',850000.00,1,850000.00),(14,14,1,'God of War Ragnarok',850000.00,1,850000.00),(15,15,43,'The Sims 4',399000.00,1,399000.00),(16,15,44,'Super Mario Odyssey',699000.00,2,1398000.00),(17,15,46,'Astro Bot',749000.00,1,749000.00),(18,16,45,'Super Mario Bros. Wonder',649000.00,1,649000.00),(19,16,46,'Astro Bot',749000.00,1,749000.00),(20,17,45,'Super Mario Bros. Wonder',649000.00,1,649000.00),(21,17,46,'Astro Bot',749000.00,1,749000.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_status` enum('pending','paid','cancelled') NOT NULL DEFAULT 'pending',
  `total_amount` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `paid_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,19,'pending',1700000.00,'2026-10-15 05:39:08',NULL),(2,19,'pending',1700000.00,'2026-10-15 05:40:26',NULL),(3,22,'pending',1700000.00,'2026-10-17 02:21:41',NULL),(4,22,'pending',1700000.00,'2026-10-17 02:25:08',NULL),(5,22,'paid',1700000.00,'2026-10-17 02:27:07','2026-10-24 02:13:34'),(6,22,'cancelled',1700000.00,'2026-10-17 02:35:18',NULL),(7,22,'paid',3196000.00,'2026-10-17 02:44:59','2026-10-18 01:12:43'),(8,22,'cancelled',1700000.00,'2026-10-17 02:44:59',NULL),(9,22,'paid',1700000.00,'2026-10-17 02:46:32','2026-10-18 01:12:39'),(10,22,'paid',1700000.00,'2026-10-17 02:46:46','2026-10-18 01:12:37'),(11,23,'paid',1700000.00,'2026-10-17 02:47:17','2026-10-18 01:12:35'),(12,23,'paid',850000.00,'2026-10-17 03:33:17','2026-10-17 03:33:19'),(13,23,'cancelled',850000.00,'2026-10-17 03:33:17',NULL),(14,23,'cancelled',850000.00,'2026-10-17 03:33:17',NULL),(15,25,'paid',2546000.00,'2026-10-18 02:32:57','2026-10-18 02:34:42'),(16,28,'cancelled',1398000.00,'2026-10-31 04:50:51',NULL),(17,28,'pending',1398000.00,'2026-10-31 04:56:03',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platforms` (
  `platform_id` int NOT NULL AUTO_INCREMENT,
  `platform_name` varchar(100) NOT NULL,
  PRIMARY KEY (`platform_id`),
  UNIQUE KEY `platform_name` (`platform_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platforms`
--

LOCK TABLES `platforms` WRITE;
/*!40000 ALTER TABLE `platforms` DISABLE KEYS */;
INSERT INTO `platforms` VALUES (2,'Nintendo Switch'),(1,'PlayStation 5'),(3,'Xbox Series X');
/*!40000 ALTER TABLE `platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(150) NOT NULL,
  `category_id` int NOT NULL,
  `platform_id` int NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `uq_product_name_platform` (`product_name`,`platform_id`),
  KEY `category_id` (`category_id`),
  KEY `platform_id` (`platform_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`platform_id`) REFERENCES `platforms` (`platform_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'God of War Ragnarok',1,1,850000.00,95,'https://static.wikia.nocookie.net/godofwar/images/2/29/GODRagnarokCover1.jpg/revision/latest?cb=20210909222903','2026-10-10 04:23:27'),(2,'EA Sports FC 26',3,1,749000.00,20,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEjItruG1iYPdrDJ_QCjTuAWWqAvMRxiOcTeI3zN5uyQdyA13qhTBTKmd9&s=10','2026-10-10 04:23:27'),(3,'The Legend of Zelda: Tears of the Kingdom',1,2,799000.00,6,'https://m.media-amazon.com/images/I/61m+z+XRvZL._AC_UF894,1000_QL80_.jpg','2026-10-10 04:23:27'),(4,'Cyberpunk 2077: Ultimate Edition',2,3,699000.00,8,'https://www.dolby.com/siteassets/xf-site/content-detail-pages/cyberpunk-2077.jpg','2026-10-10 04:23:27'),(5,'EA Sports FC 26',3,2,729000.00,12,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEjItruG1iYPdrDJ_QCjTuAWWqAvMRxiOcTeI3zN5uyQdyA13qhTBTKmd9&s=10','2026-10-10 04:23:27'),(15,'Marvel\'s Spider-Man 2',1,1,849000.00,18,'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/60eca3ac155247e21850c7d075d01ebf0f3f5dbf19ccd2a1.jpg','2026-10-11 01:41:14'),(16,'Horizon Forbidden West',1,1,699000.00,12,'https://upload.wikimedia.org/wikipedia/en/6/69/Horizon_Forbidden_West_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original','2026-10-11 01:41:14'),(17,'Hogwarts Legacy',1,3,649000.00,10,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubvU6bEjX4TUp9mDVzcXx9p7awHdzNvC5AuJ4p4Rs20gTuXxUUv6fhdKs&s=10','2026-10-11 01:41:14'),(18,'Hogwarts Legacy',1,2,629000.00,7,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubvU6bEjX4TUp9mDVzcXx9p7awHdzNvC5AuJ4p4Rs20gTuXxUUv6fhdKs&s=10','2026-10-11 01:41:14'),(19,'Assassin\'s Creed Mirage',1,1,599000.00,16,'https://image.api.playstation.com/vulcan/ap/rnd/202208/1718/NFf86jgU4AeVYgJBEoEKBpxW.jpg','2026-10-11 01:41:14'),(20,'Elden Ring',2,1,699000.00,20,'https://s.pacn.ws/1/p/153/elden-ring-739597.11.webp?v=s2allv','2026-10-11 01:41:14'),(21,'Elden Ring',2,3,699000.00,9,'https://s.pacn.ws/1/p/153/elden-ring-739597.11.webp?v=s2allv','2026-10-11 01:41:14'),(22,'Baldur\'s Gate 3',2,1,799000.00,11,'https://preview.redd.it/which-cover-is-better-v0-kukkaczhsccb1.jpg?width=600&format=pjpg&auto=webp&s=8408aced932510b238c4d6d006eb09503b56e86d','2026-10-11 01:41:14'),(23,'Final Fantasy XVI',2,1,749000.00,8,'https://i.pinimg.com/736x/94/21/89/9421897b6d32c9c95769a25866ae0d9a.jpg','2026-10-11 01:41:14'),(24,'Pokemon Scarlet',2,2,649000.00,25,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR31cMEzVwdsE1wNjD0NH6P--wZyiu3bzo45GmO9nMw-uADUxGM8McZpxs&s=10','2026-10-11 01:41:14'),(25,'Starfield',2,3,799000.00,6,'https://i.redd.it/4r2l5k1zrnpb1.jpg','2026-10-11 01:41:14'),(26,'NBA 2K26',3,1,799000.00,22,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrFUIbaNKFmpRwaoE9zkWfyGkQKIuxVBQ8EjP5zC6_pVeeFIeSFa_sZU8E&s=10','2026-10-11 01:41:14'),(27,'NBA 2K26',3,3,799000.00,13,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrFUIbaNKFmpRwaoE9zkWfyGkQKIuxVBQ8EjP5zC6_pVeeFIeSFa_sZU8E&s=10','2026-10-11 01:41:14'),(28,'Nintendo Switch Sports',3,2,599000.00,15,'https://s.pacn.ws/1/p/1cu/nintendo-switch-sports-879159.1.jpg?v=szl9tv','2026-10-11 01:41:14'),(29,'Gran Turismo 7',4,1,749000.00,14,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsfJ1BR9ehF5oMkFyEXDTHA_Tvx3rnlipJ_VzS3jn0OHTeU6dfm412Ilc8&s=10','2026-10-11 01:41:14'),(30,'Forza Horizon 5',4,3,699000.00,17,'https://cdn.theouterhaven.net/wp-content/uploads/2021/08/E4HHJZkXMAswau7.jpg','2026-10-11 01:41:14'),(31,'Mario Kart 8 Deluxe',4,2,749000.00,30,'https://external-preview.redd.it/mario-kart-8-deluxe-hd-artwork-album-75-images-v0-FGFvHLwlWFi8U6h3jcU76CCaGonlhm7jRJMvmkYsIIY.jpeg?auto=webp&s=58dfe54bbc5f8d4d65b93751a378539ffe339468','2026-10-11 01:41:14'),(32,'Tekken 8',5,1,799000.00,12,'https://i.scdn.co/image/ab67616d0000b2736374a87e18745ed3426c57d7','2026-10-11 01:41:14'),(33,'Street Fighter 6',5,3,699000.00,10,'https://i.redd.it/33j6wl0xpr4a1.png','2026-10-11 01:41:14'),(34,'Super Smash Bros. Ultimate',5,2,799000.00,19,'https://i.redd.it/9so2dq2swl311.jpg','2026-10-11 01:41:14'),(35,'Call of Duty: Modern Warfare III',6,1,849000.00,21,'https://upload.wikimedia.org/wikipedia/id/b/bf/Call_of_Duty_Modern_Warfare_3_box_art.png?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=original','2026-10-11 01:41:14'),(36,'Halo Infinite',6,3,599000.00,9,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDMfKelOmnCBzR8o1aRpgo9EaSVDCFngy8JDEv2fR5EF8a_r_WXj2QZ4&s=10','2026-10-11 01:41:14'),(37,'Splatoon 3',6,2,699000.00,16,'https://upload.wikimedia.org/wikipedia/en/4/4f/Splatoon.3.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original','2026-10-11 01:41:14'),(38,'Resident Evil 4 Remake',7,1,649000.00,13,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVgXE0QZy60QdR08UKynEvqeF-okkWVaDfSeiIws2RdO0pL1romKZybls&s=10','2026-10-11 01:41:14'),(39,'Alan Wake 2',7,3,749000.00,10,'https://cdn1.epicgames.com/offer/c4763f236d08423eb47b4c3008779c84/EGS_AlanWake2_RemedyEntertainment_S2_1200x1600-c7c8091ddac0f9669c8e5905bca88aaa','2026-10-11 01:41:14'),(40,'Silent Hill 2',7,1,799000.00,7,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt0ig55CEaSQmJ9zjFG2RY0zQoz2dQ6LKPZ8__FBslrxOJ00aoUxZRYxo&s=10','2026-10-11 01:41:14'),(41,'Animal Crossing: New Horizons',8,2,649000.00,24,'https://i.pinimg.com/736x/c2/9a/f7/c29af78d0a359c0ba24a18a579d09a78.jpg','2026-10-11 01:41:14'),(42,'Farming Simulator 22',8,1,499000.00,11,'https://image.api.playstation.com/vulcan/img/rnd/202107/0508/dj0kCuLqtWdjGAKS9hoxdVKy.jpg','2026-10-11 01:41:14'),(43,'The Sims 4',8,3,399000.00,17,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPCTg6OqeWsDq_Yd8XnbHRzyOKMwVSE9xLhg1Rpj-cChZHg4MlmVQk2BM&s=10','2026-10-11 01:41:14'),(44,'Super Mario Odyssey',9,2,699000.00,18,'https://img.redbull.com/images/c_crop,x_1560,y_0,h_3574,w_2859/c_fill,w_450,h_600/q_auto,f_auto/redbullcom/2017/10/26/c12d0d43-4943-4cd3-ab1b-3cf654452046/super-mario-odyssey-5-secrets','2026-10-11 01:41:14'),(45,'Super Mario Bros. Wonder',9,2,649000.00,16,'https://m.media-amazon.com/images/M/MV5BMDBkYmVjZGItOTY3ZS00OThhLThkMTktYTA0ZjMzMWEwY2RlXkEyXkFqcGc@._V1_.jpg','2026-10-11 01:41:14'),(46,'Astro Bot',9,1,749000.00,12,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk6gLDR9zwtSqIlnLW4K5znmNvm0h7p0LikeRxdlyz6j6h8cYDNyMMZ864&s=10','2026-10-11 01:41:14'),(85,'GTA 6',8,1,600000.00,14,'https://assets.games.gg/1748480401988_grand_theft_auto_vi_cover_93c3eab32b.png','2026-10-18 02:35:49');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','customer') NOT NULL DEFAULT 'customer',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'yendy','yendy292432@gmail.com','$2b$10$Hw63ChT/pvrKb2dsGMJMmOcjVhQl/9Mv5U45qwxwmfP7.VCootfG2','customer','2026-10-10 08:16:50'),(2,'bambang','bambang202842@gmail.com','$2b$10$EobgLAhD2Vv/vzggFCnqseV3X6LIRdztW7ZDVL0aS1LszuvR84Go2','customer','2026-10-10 08:19:51'),(3,'bambang','bambang964517@gmail.com','$2b$10$eQndhAJOUM1frOaMAzzbt.aSeOsDe77E8E8oWp7N1X5Preawv87ia','customer','2026-10-10 08:22:19'),(4,'bambang','bambang584212@gmail.com','$2b$10$UoyJdMmRXzDO5Kj41Yc8IOtbS0K7SF14ZLNQC4rxUPfRluQ5yrNJ6','customer','2026-10-10 08:23:18'),(5,'bambang','bambang527327@gmail.com','$2b$10$3PotW.A88fsQlwtRTUMhyuT5kmUQcOiO3v0VYV4bHhBhjh.qlKcPu','customer','2026-10-10 08:23:51'),(6,'bambang','bambang705639@gmail.com','$2b$10$lX7DeC9sCxqAVKrSQbMqy.Z5zNrbPMajrQbvaSN4vF8xHgeeYXDY2','customer','2026-10-10 08:26:34'),(7,'bambang','bambang549885@gmail.com','$2b$10$3JsKe7.rRH5C5OtXyriSvurVgGD01RUR3JdZJoUKvaFHpNQRLSxJ6','customer','2026-10-10 08:29:13'),(8,'bambang','bambang142824@gmail.com','$2b$10$46DfjwVm7mg7Nfsb5JDjeurFx0tBJUunXgn0aC.Kk4u/tdZoQxQ1m','customer','2026-10-10 08:31:42'),(9,'bambang','bambang887421@gmail.com','$2b$10$oDuNP.iuR95kjl9vpQPrw.qiU.cc4k7JKkmCvoxd7ESf9sSpUMMhe','customer','2026-10-10 08:32:06'),(10,'bambang','bambang527895@gmail.com','$2b$10$rUviON3DeFJ5HEHn90AMz.3CdjOzRMniK/AArugOts6dljMZQFaKe','customer','2026-10-10 08:32:16'),(11,'Admin GameVault','admin@gamevault.com','$2b$10$4azIAItq.C5ENA9DTQg./eMNBKGH3znfScW6epgBMAXp5ti7YHpu2','admin','2026-10-10 08:40:06'),(12,'bambang','bambang974798@gmail.com','$2b$10$A4RC5g00NampZGAHisW/yeORo2hQ.WUUfcMjsUeRQgEW4iYDQvkyi','customer','2026-10-10 08:40:38'),(13,'bambang','bambang714703@gmail.com','$2b$10$lVPVSqkNA2hx5x38IBrVm.1l/ybNIrCfKYFAnbRTQz0C.1ldU5Vlq','customer','2026-10-10 08:42:02'),(14,'bambang','bambang677979@gmail.com','$2b$10$LKdevdNR/zIdzBs/y3hwv.FJBKCdOJkm.QojBIwFOwHfy2ZaEtEd.','customer','2026-10-10 11:41:19'),(15,'bambang','bambang851581@gmail.com','$2b$10$gkyuj088b0xSQulpULbJYuWQ9jeI94lX/QI3FLY2eN8UUuie.R2lK','customer','2026-10-10 11:45:27'),(16,'bambang','bambang557436@gmail.com','$2b$10$ECIDSjQojqgWU0CfWQMgfeXCMxtzGBmfz.r26gfsyzabHGBjumrvG','customer','2026-10-10 11:48:16'),(17,'bambang','bambang635673@gmail.com','$2b$10$ZfXOSQmEN.iMo7Ht35XVxOjxufgGnQx/90NqLDE.fTniSX8PwhVQK','customer','2026-10-10 12:11:52'),(18,'bambang','bambang702540@gmail.com','$2b$10$nLn8SXvoGoEEFgZjkOL8yOA3Dmp0dHCOhjS0aJle2VbEw4bPgBipG','customer','2026-10-11 02:46:21'),(19,'bambang','bambang336297@gmail.com','$2b$10$kdhyB/RO2CPb4O7Uxpg73OHWWsNCTDeRO978HJV/7Gz66txtDhkw6','customer','2026-10-11 02:57:47'),(20,'bambang','bambang832951@gmail.com','$2b$10$JXx0C.GRVU/K0Xucwj6j0uIyGZ4.dNAWm5Pld/poZhf8rP9GwTVka','customer','2026-10-15 05:42:59'),(21,'bambang','bambang812019@gmail.com','$2b$10$fHD23Enu3RKaRM5PfM2fn.ApeP.W4jRzThv3Lgm6O/2rm5h6aKNCm','customer','2026-10-15 05:44:43'),(22,'bambang','bambang121267@gmail.com','$2b$10$1UcZaASLsU3noV8KylAJGeMMETDBicSq9QF5Ro.21.mWi15ZVUa0m','customer','2026-10-15 05:46:20'),(23,'bambang','bambang567034@gmail.com','$2b$10$MQ6bzQIdJ45T257ZiwTs1O1YJweWdVsee0/79Z0C3XledR4k603Ea','customer','2026-10-17 02:47:14'),(24,'customer dua','customer2_315232@gmail.com','$2b$10$WCW0rxR6ttD00PHrkIjr4.mWsv/03I.kHXH8fzAYlFt6nXnY.m/Lq','customer','2026-10-17 03:33:17'),(25,'yenpok','yenpok@mail.com','$2b$10$ce/USSrk8w2SxXx4f9OnIeZRjHBwwFpG46zUgalVxL5dJ9oRz80Sa','customer','2026-10-17 09:02:07'),(26,'Yustinus Yendy','yenpok@mail.comm','$2b$10$K1m0CmMvgmaSQMXctphwlOB9ivq7bld5Z6K60hB8RD23cl2ndzeGm','customer','2026-10-17 09:04:33'),(27,'admin','admin@mail.com','$2b$10$CdTdJdpGMCbCYCoN12tYx.pOlx2.V1/PnEltmD4PEDvg948pS2uY6','admin','2026-10-18 01:05:21'),(28,'yendy12','yendy@mail.com','$2b$10$jegOFaJ6yAAyt1PCizQv1Ogirnt394fJyerZ8RAjiN6fUmahst/4m','customer','2026-10-31 04:50:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-31  7:52:52
