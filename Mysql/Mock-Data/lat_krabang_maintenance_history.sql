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
-- Table structure for table `maintenance_history`
--

DROP TABLE IF EXISTS `maintenance_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenance_history` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DATE` varchar(255) DEFAULT NULL,
  `CHARGER_ID` varchar(255) DEFAULT NULL,
  `CONNECTOR_ID` varchar(255) DEFAULT NULL,
  `ISSUE` varchar(255) DEFAULT NULL,
  `START_TIME` varchar(255) DEFAULT NULL,
  `END_TIME` varchar(255) DEFAULT NULL,
  `DURATION` varchar(255) DEFAULT NULL,
  `TECHNICAL` varchar(255) DEFAULT NULL,
  `STATUS` varchar(255) DEFAULT NULL,
  `END_DATE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance_history`
--

LOCK TABLES `maintenance_history` WRITE;
/*!40000 ALTER TABLE `maintenance_history` DISABLE KEYS */;
INSERT INTO `maintenance_history` VALUES (1,'15/11/2025','01','1','Loose Electrical Connections','23:31:00','09:59:29','10:28:29','Mark Taylor','Resolved','22/11/2024'),(2,'13/11/2025','07','2','Incorrect Plugging','06:41:27','00:28:32','17:47:05','Michael Brown','Resolved','26/11/2024'),(3,'12/11/2024','09','2','Display Screen Malfunction','11:24:18','10:23:56','22:59:38','Michael Brown','Resolved','25/11/2024'),(4,'14/11/2024','06','2','Loose Electrical Connections','19:29:42','20:25:49','00:56:07','Jane Doe','Resolved','19/11/2024'),(5,'10/11/2024','11','2','Damaged Moving Parts','20:05:32','00:36:35','04:31:03','Mark Taylor','Resolved','25/11/2024'),(6,'11/11/2024','10','2','Damaged Moving Parts','17:24:34','02:33:23','09:08:49','Mark Taylor','Resolved','27/11/2024'),(7,'09/11/2024','11','1','Failed Software Update','04:46:50','01:25:49','20:38:59','Chris Johnson','Resolved','21/11/2024'),(8,'16/11/2024','03','2','Incompatible Equipment','19:51:49','07:04:49','11:13:00','Linda White','Resolved','22/11/2024'),(9,'13/11/2024','01','2','Cooling System Failure','17:58:51','02:39:33','08:40:42','Emily Davis','Resolved','26/11/2024'),(10,'18/11/2024','01','1','Firmware Bugs','10:03:38','19:34:48','09:31:10','Michael Brown','Resolved','18/11/2024'),(11,'14/11/2024','10','2','Incorrect Plugging','02:04:36','00:56:38','22:52:02','Jane Doe','Resolved','21/11/2024'),(12,'11/11/2024','02','2','Failed Software Update','16:38:43','17:00:47','00:22:04','Michael Brown','Resolved','25/11/2024'),(13,'13/11/2024','09','2','Display Screen Malfunction','14:17:25','07:56:20','17:38:55','Jane Doe','Resolved','21/11/2024'),(14,'10/11/2024','02','1','Faulty Connector','11:46:39','20:25:35','08:38:56','David Wilson','Resolved','20/11/2024'),(15,'17/11/2024','03','1','Display Screen Malfunction','23:28:01','07:56:01','08:28:00','Michael Brown','Resolved','18/11/2024'),(16,'14/11/2024','11','1','Overload','01:06:50','10:00:51','08:54:01','John Smith','Resolved','27/11/2024'),(17,'13/11/2024','11','1','Firmware Bugs','16:38:09','15:24:50','22:46:41','Robert Garcia','Resolved','20/11/2024'),(18,'11/11/2024','06','2','Internet Connectivity Failure','14:41:23','07:46:41','17:05:18','Michael Brown','Resolved','19/11/2024'),(19,'16/11/2024','11','2','Loose Electrical Connections','08:06:28','14:13:12','06:06:44','Emily Davis','Resolved','19/11/2024'),(20,'12/11/2024','04','2','Incorrect Plugging','10:12:53','21:48:21','11:35:28','John Smith','Resolved','17/11/2024'),(21,'09/11/2024','01','2','Overload','05:34:45','08:46:09','03:11:24','David Wilson','Resolved','25/11/2024'),(22,'17/11/2024','08','1','Firmware Bugs','08:07:44','14:18:43','06:10:59','John Smith','Resolved','20/11/2024'),(23,'15/11/2024','08','2','Non-resettable Components','23:34:06','05:58:26','06:24:20','Chris Johnson','Resolved','27/11/2024'),(24,'12/11/2024','01','2','Display Screen Malfunction','20:36:49','11:45:41','15:08:52','Robert Garcia','Resolved','26/11/2024'),(25,'14/11/2024','07','2','Firmware Bugs','02:59:24','10:40:54','07:41:30','Robert Garcia','Resolved','25/11/2024'),(26,'16/11/2024','11','1','Firmware Bugs','04:40:43','14:12:53','09:32:10','Linda White','Resolved','18/11/2024'),(27,'11/11/2024','09','2','Display Screen Malfunction','14:33:34','12:57:00','22:23:26','Jane Doe','Resolved','23/11/2024'),(28,'10/11/2024','11','2','Display Screen Malfunction','07:18:23','18:12:07','10:53:44','John Smith','Resolved','23/11/2024'),(29,'13/11/2024','04','1','Incorrect Plugging','02:43:27','03:21:58','00:38:31','Robert Garcia','Resolved','17/11/2024'),(30,'15/11/2024','01','2','Damaged Moving Parts','16:55:37','03:51:13','10:55:36','John Smith','Resolved','22/11/2024'),(31,'12/11/2024','10','1','Environmental Damage','17:54:15','16:05:13','22:10:58','Chris Johnson','Resolved','18/11/2024'),(32,'14/11/2024','07','1','Failed Software Update','07:04:59','19:24:58','12:19:59','Emily Davis','Resolved','24/11/2024'),(33,'17/11/2024','03','2','Damaged or Worn-out Charging Cable','06:00:16','18:19:13','12:18:57','Emily Davis','Resolved','22/11/2024'),(34,'09/11/2024','10','1','Faulty Connector','06:27:30','23:34:51','17:07:21','Chris Johnson','Resolved','23/11/2024'),(35,'16/11/2024','04','1','Power Surge','10:59:19','05:12:28','18:13:09','John Smith','Resolved','17/11/2024'),(36,'13/11/2024','02','2','Display Screen Malfunction','03:50:50','05:08:07','01:17:17','Michael Brown','Resolved','26/11/2024'),(37,'12/11/2024','09','2','Display Screen Malfunction','09:17:41','22:30:41','13:13:00','Linda White','Resolved','26/11/2024'),(38,'10/11/2024','03','2','Firmware Bugs','02:05:22','19:22:48','17:17:26','Emily Davis','Resolved','18/11/2024'),(39,'11/11/2024','05','1','Internet Connectivity Failure','15:01:37','09:37:21','18:35:44','Emily Davis','Resolved','20/11/2024'),(40,'17/11/2024','02','1','Firmware Bugs','11:33:18','10:54:58','23:21:40','Jane Doe','Resolved','25/11/2024'),(41,'14/11/2024','03','1','Incorrect Plugging','23:17:39','01:37:17','02:19:38','Michael Brown','Resolved','27/11/2024'),(42,'16/11/2024','01','1','Overload','13:26:49','11:55:41','22:28:52','Michael Brown','Resolved','23/11/2024'),(43,'13/11/2024','09','1','Environmental Damage','02:49:07','17:07:56','14:18:49','Chris Johnson','Resolved','19/11/2024'),(44,'15/11/2024','01','1','Internet Connectivity Failure','05:48:56','20:18:40','14:29:44','John Smith','Resolved','26/11/2024'),(45,'10/11/2024','03','2','Incompatible Equipment','20:44:08','05:11:55','08:27:47','Emily Davis','Resolved','18/11/2024'),(46,'11/11/2024','09','2','Internet Connectivity Failure','13:35:06','12:14:45','22:39:39','Jane Doe','Resolved','18/11/2024'),(47,'17/11/2024','01','1','Incorrect Plugging','10:57:46','21:13:28','10:15:42','Linda White','Resolved','20/11/2024'),(48,'12/11/2024','06','1','Display Screen Malfunction','20:33:39','12:12:28','15:38:49','Jane Doe','Resolved','26/11/2024'),(49,'11/11/2024','06','2','Power Surge','08:50:20','03:50:39','19:00:19','Emily Davis','Resolved','21/11/2024'),(50,'13/11/2024','01','1','Incompatible Equipment','13:12:03','17:52:08','04:40:05','Jane Doe','Resolved','25/11/2024'),(53,'2024-11-30','5','1','Hardware','20:24','22:26','02:02:00','Michael Johnson','Escalated','2024-12-01'),(56,'2024-11-18','5','2','Hardware','22:56','03:54','244:58:00','Technical','In Progress','2024-11-29'),(57,'28/01/2025','01','1','Hardware','17:17','18:18','01:01:00','Laura Scott','Escalated','29/01/2025'),(58,'05/02/2025','01','1','Software','23:31:00','09:59:29','00:00:00','Mark Taylor','Escalated','28/02/2025'),(63,'07/02/2025','11','2','Hardware','20:20','22:17','01:57:00','Technical','Suspended','12/02/2025'),(64,'31/01/2025','01','2','Firmware Bugs','20:27','11:23','00:00:00','Robert Miller','Suspended','01/03/2025'),(65,'28/01/2025','11','1','Firmware Bugs','23:27','10:27','00:00:00','Robert Miller','Suspended','06/03/2025'),(66,'20/02/2025','01','1','Hardware','23:29','01:29','00:00:00','Robert Miller','Suspended','28/02/2025'),(67,'26/02/2025','11','1','Mechanical','20:35','23:32','02:57:00','Robert Miller','Resolved','12/02/2025'),(70,'06/02/2025','01','2','Firmware Bugs','20:49','18:52','00:00:00','Robert Miller','Resolved','13/02/2025');
/*!40000 ALTER TABLE `maintenance_history` ENABLE KEYS */;
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
