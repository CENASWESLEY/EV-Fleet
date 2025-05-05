-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bang_khen
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
-- Table structure for table `transaction_history`
--

DROP TABLE IF EXISTS `transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_history` (
  `DATE` varchar(45) DEFAULT NULL,
  `CHARGER_ID` varchar(45) DEFAULT NULL,
  `CONNECTOR` varchar(45) DEFAULT NULL,
  `VEHICLE_ID` varchar(45) DEFAULT NULL,
  `START_TIME` varchar(45) DEFAULT NULL,
  `END_TIME` varchar(45) DEFAULT NULL,
  `DURATION` varchar(45) DEFAULT NULL,
  `STATUS` varchar(45) DEFAULT NULL,
  `ENERGY` varchar(45) DEFAULT NULL,
  `START_SOC` varchar(45) DEFAULT NULL,
  `SOC` varchar(45) DEFAULT NULL,
  `END_SOC` varchar(45) DEFAULT NULL,
  `COST` varchar(45) DEFAULT NULL,
  `COMPLETE_STATUS` varchar(45) DEFAULT 'Incomplete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_history`
--

LOCK TABLES `transaction_history` WRITE;
/*!40000 ALTER TABLE `transaction_history` DISABLE KEYS */;
INSERT INTO `transaction_history` VALUES ('08/10/2024','01','1','ซข-7239','07:41:44','10:36:27','02:54:43','Complete','12.39 kW','46.8%','69.9%','62.5%','฿187.30','Complete'),('08/10/2024','01','2','กฟ-9457','07:41:44','10:36:27','02:54:43','Complete','11.78 kW','47.8%','64.3%','61.2%','฿154.78','Complete'),('08/10/2024','03','1','ณค-5953','07:41:44','10:36:27','02:54:43','Complete','11.98 kW','41.2%','64.4%','69.5%','฿101.33','Complete'),('08/10/2024','03','2','กฟ-7945','07:41:44','10:36:27','02:54:43','Complete','14.92 kW','49.9%','66.5%','67.8%','฿134.12','Complete'),('08/10/2024','05','1','คต-4116','07:41:44','10:36:27','02:54:43','Complete','14.87 kW','48.3%','61.8%','62.8%','฿178.90','Complete');
/*!40000 ALTER TABLE `transaction_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-07 11:05:26
