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
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
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
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES ('08/10/2024','01','1','ซข-7239','07:41:44','Pending','01:00:00','Charging','9.79 kW','46.8%','42.1%','Pending','Pending','Incomplete'),('08/10/2024','01','2','กฟ-9457','07:41:44','Pending','00:00:00','Charging','9.69 kW','47.8%','47.7%','Pending','Pending','Incomplete'),('08/10/2024','02','1','-','-','-','-','Available','-','-','-','-','-','Incomplete'),('08/10/2024','02','2','-','-','-','-','Available','-','-','-','-','-','Incomplete'),('08/10/2024','03','1','ณค-5953','07:41:44','Pending','00:00:00','Charging','6.45 kW','41.2%','48.5%','Pending','Pending','Incomplete'),('08/10/2024','03','2','กฟ-7945','07:41:44','Pending','00:00:00','Charging','6.30 kW','49.9%','45.0%','Pending','Pending','Incomplete'),('08/10/2024','04','1','-','-','-','-','Suspended','-','-','-','-','-','Incomplete'),('08/10/2024','04','2','-','-','-','-','Available','-','-','-','-','-','Incomplete'),('08/10/2024','05','1','คต-4116','07:41:44','Pending','00:00:00','Charging','6.41 kW','48.3%','48.6%','Pending','Pending','Incomplete'),('08/10/2024','05','2','-','-','-','-','Available','-','-','-','-','-','Incomplete'),('08/10/2024','06','1','-','-','-','-','Available','-','-','-','-','-','Incomplete'),('08/10/2024','06','2','ณค-4764','07:41:44','Pending','00:00:00','Charging','5.01 kW','42.6%','47.1%','Pending','Pending','Incomplete'),('08/10/2024','07','1','-','-','-','-','Available','-','-','-','-','-','Incomplete'),('08/10/2024','07','2','-','-','-','-','Available','-','-','-','-','-','Incomplete'),('08/10/2024','08','1','จข-8943','07:41:44','Pending','00:00:00','Charging','6.73 kW','42.9%','47.8%','Pending','Pending','Incomplete'),('08/10/2024','08','2','คต-2003','07:41:44','Pending','00:00:00','Charging','5.65 kW','46.1%','42.4%','Pending','Pending','Incomplete'),('08/10/2024','09','1','ณค-5847','07:41:44','Pending','00:00:00','Charging','7.12 kW','49.0%','46.2%','Pending','Pending','Incomplete'),('08/10/2024','09','2','-','-','-','-','Available','-','-','-','-','-','Incomplete'),('08/10/2024','10','1','-','-','-','-','Available','-','-','-','-','-','Incomplete'),('08/10/2024','10','2','คต-5023','07:41:44','Pending','00:00:00','Charging','8.15 kW','40.5%','44.3%','Pending','Pending','Incomplete'),('08/10/2024','11','1','-','-','-','-','Available','-','-','-','-','-','Incomplete'),('08/10/2024','11','2','ซข-3814','07:41:44','Pending','00:00:00','Charging','9.52 kW','45.4%','41.7%','Pending','Pending','Incomplete');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
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
