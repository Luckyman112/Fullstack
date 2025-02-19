-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: scandiweb
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `attribute_items`
--

DROP TABLE IF EXISTS `attribute_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attribute_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `attribute_id` int NOT NULL,
  `display_value` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attribute_id` (`attribute_id`),
  CONSTRAINT `attribute_items_ibfk_1` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attribute_items`
--

LOCK TABLES `attribute_items` WRITE;
/*!40000 ALTER TABLE `attribute_items` DISABLE KEYS */;
INSERT INTO `attribute_items` VALUES (1,1,'40','40'),(2,1,'41','41'),(3,1,'42','42'),(4,1,'43','43'),(5,2,'Small','S'),(6,2,'Medium','M'),(7,2,'Large','L'),(8,3,'Green','#44FF03'),(9,3,'Blue','#030BFF'),(10,4,'512G','512G'),(11,5,'Green','#44FF03'),(12,5,'White','#FFFFFF'),(13,6,'512G','512G'),(14,6,'1T','1T'),(15,7,'Yes','Yes');
/*!40000 ALTER TABLE `attribute_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attributes`
--

DROP TABLE IF EXISTS `attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attributes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `attributes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attributes`
--

LOCK TABLES `attributes` WRITE;
/*!40000 ALTER TABLE `attributes` DISABLE KEYS */;
INSERT INTO `attributes` VALUES (1,'huarache-x-stussy-le','Size','text'),(2,'jacket-canada-goosee','Size','text'),(3,'ps-5','Color','swatch'),(4,'ps-5','Capacity','text'),(5,'xbox-series-s','Color','swatch'),(6,'xbox-series-s','Capacity','text'),(7,'apple-imac-2021','Capacity','text'),(8,'apple-imac-2021','With USB 3 ports','text'),(9,'apple-iphone-12-pro','Color','swatch');
/*!40000 ALTER TABLE `attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'all'),(2,'clothes'),(3,'tech');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galleries`
--

DROP TABLE IF EXISTS `galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galleries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(255) NOT NULL,
  `url` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `galleries_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galleries`
--

LOCK TABLES `galleries` WRITE;
/*!40000 ALTER TABLE `galleries` DISABLE KEYS */;
INSERT INTO `galleries` VALUES (1,'huarache-x-stussy-le','https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'),(2,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg'),(3,'ps-5','https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg'),(4,'xbox-series-s','https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg'),(5,'apple-imac-2021','https://store.storeimages.cdn-apple.com/is/imac-24-blue-selection-hero-202104.jpg'),(6,'apple-iphone-12-pro','https://store.storeimages.cdn-apple.com/is/iphone-12-pro-family-hero.jpg'),(7,'apple-airpods-pro','https://store.storeimages.cdn-apple.com/is/MWP22.jpg'),(8,'apple-airtag','https://store.storeimages.cdn-apple.com/is/airtag-double-select-202104.jpg');
/*!40000 ALTER TABLE `galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,'jacket-canada-goosee',2),(2,1,'ps-5',1),(3,2,'apple-airtag',1),(4,2,'apple-imac-2021',2),(5,3,'apple-imac-2021',1),(6,4,'ps-5',1),(7,4,'ps-5',1),(8,4,'jacket-canada-goosee',1),(9,4,'huarache-x-stussy-le',1);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2025-02-17 20:41:26'),(2,'2025-02-17 21:01:04'),(3,'2025-02-17 21:20:52'),(4,'2025-02-17 21:32:07');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(255) NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `currency_label` varchar(10) DEFAULT NULL,
  `currency_symbol` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `prices_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (1,'huarache-x-stussy-le',144.69,'USD','$'),(2,'jacket-canada-goosee',518.47,'USD','$'),(3,'ps-5',844.02,'USD','$'),(4,'xbox-series-s',333.99,'USD','$'),(5,'apple-imac-2021',1688.03,'USD','$'),(6,'apple-iphone-12-pro',1000.76,'USD','$'),(7,'apple-airpods-pro',300.23,'USD','$'),(8,'apple-airtag',120.57,'USD','$');
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `in_stock` tinyint(1) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `description` text,
  `gallery` json DEFAULT NULL,
  `attributes` json DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `currency_label` varchar(10) DEFAULT NULL,
  `currency_symbol` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('apple-airpods-pro','AirPods Pro',0,'tech','Apple','<h3>Magic like you?ve never heard</h3><p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they?re ready to use right out of the case.</p><h3>Active Noise Cancellation</h3><p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you?re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation.</p><h3>Transparency mode</h3><p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings.</p><h3>All-new design</h3><p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place.</p><h3>Amazing audio quality</h3><p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound.</p><h3>Even more magical</h3><p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods.</p>','[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000\"]','[]',300.23,'USD','$'),('apple-airtag','AirTag',1,'tech','Apple','<h1>Lose your knack for losing things.</h1><p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they?re on your radar in the Find My app. AirTag has your back.</p>','[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000\"]','[]',120.57,'USD','$'),('apple-imac-2021','iMac 2021',1,'tech','Apple','The new iMac!','[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000\"]','[{\"id\": \"Capacity\", \"name\": \"Capacity\", \"type\": \"text\", \"items\": [{\"id\": \"256GB\", \"value\": \"256GB\", \"displayValue\": \"256GB\"}, {\"id\": \"512GB\", \"value\": \"512GB\", \"displayValue\": \"512GB\"}]}, {\"id\": \"With USB 3 ports\", \"name\": \"With USB 3 ports\", \"type\": \"text\", \"items\": [{\"id\": \"Yes\", \"value\": \"Yes\", \"displayValue\": \"Yes\"}, {\"id\": \"No\", \"value\": \"No\", \"displayValue\": \"No\"}]}, {\"id\": \"Touch ID in keyboard\", \"name\": \"Touch ID in keyboard\", \"type\": \"text\", \"items\": [{\"id\": \"Yes\", \"value\": \"Yes\", \"displayValue\": \"Yes\"}, {\"id\": \"No\", \"value\": \"No\", \"displayValue\": \"No\"}]}]',1688.03,'USD','$'),('apple-iphone-12-pro','iPhone 12 Pro',1,'tech','Apple','This is iPhone 12. Nothing else to say.','[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1604021663000\"]','[{\"id\": \"Capacity\", \"name\": \"Capacity\", \"type\": \"text\", \"items\": [{\"id\": \"512G\", \"value\": \"512G\", \"displayValue\": \"512G\"}, {\"id\": \"1T\", \"value\": \"1T\", \"displayValue\": \"1T\"}]}, {\"id\": \"Color\", \"name\": \"Color\", \"type\": \"swatch\", \"items\": [{\"id\": \"Green\", \"value\": \"#44FF03\", \"displayValue\": \"Green\"}, {\"id\": \"Cyan\", \"value\": \"#03FFF7\", \"displayValue\": \"Cyan\"}, {\"id\": \"Blue\", \"value\": \"#030BFF\", \"displayValue\": \"Blue\"}, {\"id\": \"Black\", \"value\": \"#000000\", \"displayValue\": \"Black\"}, {\"id\": \"White\", \"value\": \"#FFFFFF\", \"displayValue\": \"White\"}]}]',1000.76,'USD','$'),('huarache-x-stussy-le','Nike Air Huarache Le',1,'clothes','Nike x Stussy','<p>Great sneakers for everyday use!</p>','[\"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087\", \"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087\", \"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087\", \"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087\", \"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087\"]','[{\"id\": \"Size\", \"name\": \"Size\", \"type\": \"text\", \"items\": [{\"id\": \"40\", \"value\": \"40\", \"displayValue\": \"40\"}, {\"id\": \"41\", \"value\": \"41\", \"displayValue\": \"41\"}, {\"id\": \"42\", \"value\": \"42\", \"displayValue\": \"42\"}, {\"id\": \"43\", \"value\": \"43\", \"displayValue\": \"43\"}]}]',144.69,'USD','$'),('jacket-canada-goosee','Jacket',1,'clothes','Canada Goose','<p>Awesome winter jacket</p>','[\"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg\", \"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg\", \"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg\", \"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg\", \"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg\", \"https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png\", \"https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png\"]','[{\"id\": \"Size\", \"name\": \"Size\", \"type\": \"text\", \"items\": [{\"id\": \"Small\", \"value\": \"S\", \"displayValue\": \"Small\"}, {\"id\": \"Medium\", \"value\": \"M\", \"displayValue\": \"Medium\"}, {\"id\": \"Large\", \"value\": \"L\", \"displayValue\": \"Large\"}, {\"id\": \"Extra Large\", \"value\": \"XL\", \"displayValue\": \"Extra Large\"}]}]',518.47,'USD','$'),('ps-5','PlayStation 5',1,'tech','Sony','<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>','[\"https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg\"]','[{\"id\": \"Color\", \"name\": \"Color\", \"type\": \"swatch\", \"items\": [{\"id\": \"Green\", \"value\": \"#44FF03\", \"displayValue\": \"Green\"}, {\"id\": \"Cyan\", \"value\": \"#03FFF7\", \"displayValue\": \"Cyan\"}, {\"id\": \"Blue\", \"value\": \"#030BFF\", \"displayValue\": \"Blue\"}, {\"id\": \"Black\", \"value\": \"#000000\", \"displayValue\": \"Black\"}, {\"id\": \"White\", \"value\": \"#FFFFFF\", \"displayValue\": \"White\"}]}, {\"id\": \"Capacity\", \"name\": \"Capacity\", \"type\": \"text\", \"items\": [{\"id\": \"512G\", \"value\": \"512G\", \"displayValue\": \"512G\"}, {\"id\": \"1T\", \"value\": \"1T\", \"displayValue\": \"1T\"}]}]',844.02,'USD','$'),('xbox-series-s','Xbox Series S 512GB',0,'tech','Microsoft','<div><ul><li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li><li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li><li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li><li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li><li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System ?bertragen.</span></li><li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li><li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch h?chste Pr?zision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li><li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li><li><span>Verwende dein Xbox One-Gaming-Zubeh?r - einschlie?lich Controller, Headsets und mehr</span></li><li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte f?r Xbox Series X (separat erh?ltlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies & TV und mehr</span></li></ul></div>','[\"https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg\"]','[{\"id\": \"Color\", \"name\": \"Color\", \"type\": \"swatch\", \"items\": [{\"id\": \"Green\", \"value\": \"#44FF03\", \"displayValue\": \"Green\"}, {\"id\": \"Cyan\", \"value\": \"#03FFF7\", \"displayValue\": \"Cyan\"}, {\"id\": \"Blue\", \"value\": \"#030BFF\", \"displayValue\": \"Blue\"}, {\"id\": \"Black\", \"value\": \"#000000\", \"displayValue\": \"Black\"}, {\"id\": \"White\", \"value\": \"#FFFFFF\", \"displayValue\": \"White\"}]}, {\"id\": \"Capacity\", \"name\": \"Capacity\", \"type\": \"text\", \"items\": [{\"id\": \"512G\", \"value\": \"512G\", \"displayValue\": \"512G\"}, {\"id\": \"1T\", \"value\": \"1T\", \"displayValue\": \"1T\"}]}]',333.99,'USD','$');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-18  1:26:22
