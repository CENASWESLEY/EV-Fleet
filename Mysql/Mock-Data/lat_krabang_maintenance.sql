-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lat_krabang
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenance` (
  `DATE` varchar(255) DEFAULT NULL,
  `CHARGER_ID` varchar(255) DEFAULT NULL,
  `CONNECTOR` varchar(255) DEFAULT NULL,
  `ISSUE` varchar(255) DEFAULT NULL,
  `START_TIME` varchar(255) DEFAULT NULL,
  `END_TIME` varchar(255) DEFAULT NULL,
  `DURATION` varchar(255) DEFAULT NULL,
  `TECHNICAL` varchar(255) DEFAULT NULL,
  `STATUS` varchar(255) DEFAULT NULL,
  `END_DATE` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance`
--

LOCK TABLES `maintenance` WRITE;
/*!40000 ALTER TABLE `maintenance` DISABLE KEYS */;
INSERT INTO `maintenance` VALUES ('17/11/2024','01','1','-','-','-','-','-','Available','-'),('17/11/2024','01','2','Incorrect Plugging','02:48:23','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','02','1','Power Surge','05:13:35','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','02','2','Damaged or Worn-out Charging Cable','14:20:08','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','03','1','Overload','16:58:13','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','03','2','-','-','-','-','-','Available','-'),('17/11/2024','04','1','Incorrect Plugging','08:14:58','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','04','2','-','-','-','-','-','Available','-'),('17/11/2024','05','1','Incorrect Configuration','04:17:20','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','05','2','Display Screen Malfunction','17:27:44','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','06','1','Failed Software Update','10:45:07','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','06','2','-','-','-','-','-','Available','-'),('17/11/2024','07','1','-','-','-','-','-','Available','-'),('17/11/2024','07','2','Incorrect Configuration','09:51:29','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','08','1','-','-','-','-','-','Available','-'),('17/11/2024','08','2','-','-','-','-','-','Available','-'),('17/11/2024','09','1','Damaged Moving Parts','21:17:58','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','09','2','Incorrect Plugging','16:10:57','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','10','1','-','-','-','-','-','Available','-'),('17/11/2024','10','2','Damaged or Worn-out Charging Cable','19:42:21','Pending','Pending','Pending','Suspended','Pending'),('17/11/2024','11','1','-','-','-','-','-','Available','-'),('17/11/2024','11','2','-','-','-','-','-','Available','-');
/*!40000 ALTER TABLE `maintenance` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-07 11:05:27
