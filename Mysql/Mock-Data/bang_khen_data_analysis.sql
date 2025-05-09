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
-- Table structure for table `data_analysis`
--

DROP TABLE IF EXISTS `data_analysis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data_analysis` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DATE` varchar(255) DEFAULT NULL,
  `STATION` varchar(255) DEFAULT NULL,
  `CHARGER_ID` varchar(255) DEFAULT NULL,
  `CONNECTOR_ID` varchar(255) DEFAULT NULL,
  `DURATION` varchar(255) DEFAULT NULL,
  `ENERGY` varchar(255) DEFAULT NULL,
  `AVG_CHARGING_TIME` varchar(255) DEFAULT NULL,
  `CHARGING_REVENUE` varchar(255) DEFAULT NULL,
  `ELECTRICITY_COST` varchar(255) DEFAULT NULL,
  `OPERATIONAL_PROFIT` varchar(255) DEFAULT NULL,
  `AVG_REVENUE_PER_SESSION` varchar(255) DEFAULT NULL,
  `CARBON_SAVINGS` varchar(255) DEFAULT NULL,
  `EQUIVALENT_EV_MILEAGE` varchar(255) DEFAULT NULL,
  `RENEWABLE_ENERGY_RATIO` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_analysis`
--

LOCK TABLES `data_analysis` WRITE;
/*!40000 ALTER TABLE `data_analysis` DISABLE KEYS */;
INSERT INTO `data_analysis` VALUES (18,'16/12/2024','BANG KHEN','01','2','1.5 hr','28.66 kWh','5.5 hr','฿258.76','฿132.48','฿116.57','฿316.56','29.97 kg','127.88 km','77.03 %'),(19,'01/03/2024','BANG KHEN','07','1','2.4 hr','24.59 kWh','5.8 hr','฿394.18','฿271.73','฿126.06','฿145.75','30.53 kg','190.68 km','47.41 %'),(20,'19/03/2024','BANG KHEN','04','2','3.5 hr','34.62 kWh','2.5 hr','฿282.82','฿260.4','฿26.81','฿184.93','26.3 kg','193.96 km','65.57 %'),(21,'15/01/2024','BANG KHEN','05','2','3.9 hr','43.78 kWh','1.8 hr','฿264.96','฿173.84','฿103.5','฿423.49','16.93 kg','142.86 km','25.78 %'),(22,'08/11/2024','BANG KHEN','02','1','3.0 hr','34.09 kWh','4.3 hr','฿382.58','฿90.96','฿127.27','฿387.96','45.74 kg','268.58 km','35.97 %'),(23,'05/08/2024','BANG KHEN','07','1','2.4 hr','46.15 kWh','2.0 hr','฿489.57','฿292.97','฿86.75','฿297.96','15.57 kg','152.59 km','70.57 %'),(24,'01/10/2024','BANG KHEN','04','2','5.5 hr','46.79 kWh','3.2 hr','฿414.42','฿77.69','฿107.54','฿272.2','47.86 kg','207.19 km','25.31 %'),(25,'03/03/2024','BANG KHEN','10','2','1.2 hr','41.75 kWh','2.9 hr','฿325.78','฿173.69','฿141.24','฿262.48','49.55 kg','206.13 km','23.3 %'),(26,'24/04/2024','BANG KHEN','06','2','5.9 hr','34.78 kWh','5.4 hr','฿283.07','฿185.74','฿92.38','฿288.0','26.46 kg','203.34 km','30.92 %'),(27,'23/02/2024','BANG KHEN','02','1','3.7 hr','39.47 kWh','4.1 hr','฿282.93','฿285.27','฿185.15','฿304.74','11.67 kg','178.29 km','75.14 %'),(28,'06/07/2024','BANG KHEN','07','2','1.1 hr','36.03 kWh','2.3 hr','฿200.35','฿276.5','฿0.04','฿357.54','23.35 kg','103.58 km','28.13 %'),(29,'30/07/2024','BANG KHEN','03','1','2.0 hr','35.32 kWh','3.4 hr','฿226.51','฿143.77','฿9.11','฿148.89','33.78 kg','188.66 km','70.75 %'),(30,'01/01/2024','BANG KHEN','09','2','2.8 hr','42.35 kWh','3.7 hr','฿248.26','฿53.09','฿149.2','฿362.5','24.92 kg','268.39 km','58.99 %'),(31,'27/11/2024','BANG KHEN','03','2','2.3 hr','39.19 kWh','3.5 hr','฿258.33','฿137.22','฿90.78','฿305.19','24.59 kg','134.39 km','72.76 %'),(32,'22/05/2024','BANG KHEN','03','1','5.2 hr','44.79 kWh','5.8 hr','฿379.88','฿165.91','฿171.0','฿279.67','42.21 kg','106.78 km','50.98 %'),(33,'01/06/2024','BANG KHEN','06','2','4.2 hr','38.95 kWh','4.6 hr','฿220.11','฿294.86','฿137.57','฿438.97','48.17 kg','120.78 km','75.37 %'),(34,'04/08/2024','BANG KHEN','09','2','4.0 hr','25.8 kWh','5.4 hr','฿477.38','฿71.57','฿53.58','฿410.69','49.2 kg','213.12 km','79.69 %'),(35,'30/01/2024','BANG KHEN','08','2','3.9 hr','23.09 kWh','4.8 hr','฿197.01','฿124.52','฿69.71','฿276.4','47.52 kg','263.09 km','51.89 %'),(36,'15/06/2024','BANG KHEN','01','2','4.8 hr','29.77 kWh','2.8 hr','฿366.14','฿173.22','฿166.85','฿393.0','12.77 kg','191.88 km','29.66 %'),(37,'20/02/2024','BANG KHEN','06','1','2.0 hr','35.3 kWh','4.6 hr','฿121.69','฿228.87','฿193.48','฿449.7','12.5 kg','252.55 km','72.49 %'),(38,'09/10/2024','BANG KHEN','05','2','5.5 hr','34.46 kWh','2.8 hr','฿255.73','฿235.75','฿128.15','฿224.23','43.35 kg','229.32 km','29.3 %'),(39,'21/01/2024','BANG KHEN','10','1','5.3 hr','45.11 kWh','5.9 hr','฿483.53','฿289.67','฿53.81','฿235.7','16.34 kg','232.21 km','49.34 %'),(40,'06/03/2024','BANG KHEN','04','1','3.0 hr','43.12 kWh','2.9 hr','฿363.9','฿184.97','฿106.12','฿256.09','25.23 kg','167.07 km','63.48 %'),(41,'19/11/2024','BANG KHEN','04','2','5.5 hr','41.54 kWh','1.4 hr','฿119.45','฿154.64','฿59.43','฿293.25','15.95 kg','175.41 km','53.15 %'),(42,'03/06/2024','BANG KHEN','04','1','1.5 hr','42.23 kWh','2.5 hr','฿402.32','฿141.81','฿93.38','฿440.83','39.49 kg','150.0 km','28.12 %'),(43,'24/01/2024','BANG KHEN','07','1','4.7 hr','36.34 kWh','5.1 hr','฿353.75','฿63.14','฿18.8','฿117.13','40.05 kg','236.39 km','36.53 %'),(44,'15/09/2024','BANG KHEN','08','1','5.4 hr','34.37 kWh','5.3 hr','฿155.6','฿172.86','฿90.25','฿251.21','49.68 kg','178.55 km','59.17 %'),(45,'09/06/2024','BANG KHEN','10','2','1.2 hr','24.38 kWh','4.1 hr','฿369.15','฿193.3','฿139.63','฿498.99','24.98 kg','158.18 km','67.76 %'),(46,'23/02/2024','BANG KHEN','10','2','3.5 hr','21.42 kWh','5.7 hr','฿165.07','฿267.37','฿198.69','฿420.94','37.24 kg','245.22 km','46.95 %'),(47,'25/04/2024','BANG KHEN','09','1','1.3 hr','40.79 kWh','4.4 hr','฿368.52','฿295.74','฿116.77','฿446.35','20.52 kg','184.91 km','50.33 %'),(48,'27/06/2024','BANG KHEN','08','1','5.8 hr','46.56 kWh','1.2 hr','฿331.92','฿134.3','฿42.68','฿170.15','12.39 kg','116.16 km','60.39 %'),(49,'20/09/2024','BANG KHEN','10','1','5.0 hr','42.28 kWh','4.3 hr','฿137.81','฿241.65','฿92.78','฿460.93','28.23 kg','185.86 km','71.52 %'),(50,'21/10/2024','BANG KHEN','10','1','4.8 hr','38.24 kWh','2.2 hr','฿173.89','฿131.25','฿88.11','฿355.75','39.63 kg','221.35 km','58.58 %'),(51,'26/03/2024','BANG KHEN','02','2','5.9 hr','38.85 kWh','5.0 hr','฿377.02','฿152.89','฿4.89','฿235.82','30.83 kg','220.11 km','61.97 %'),(52,'10/03/2024','BANG KHEN','01','2','4.0 hr','41.15 kWh','5.1 hr','฿211.27','฿144.63','฿195.96','฿234.15','35.67 kg','209.57 km','44.84 %'),(53,'20/10/2024','BANG KHEN','02','2','2.4 hr','49.99 kWh','1.5 hr','฿166.75','฿82.74','฿38.95','฿260.07','32.66 kg','139.93 km','25.1 %'),(54,'31/08/2024','BANG KHEN','04','1','4.2 hr','36.99 kWh','5.4 hr','฿465.07','฿185.19','฿51.99','฿475.64','11.38 kg','205.92 km','57.07 %'),(55,'13/07/2024','BANG KHEN','07','1','2.6 hr','32.34 kWh','4.3 hr','฿158.08','฿236.65','฿7.95','฿309.46','14.11 kg','135.3 km','20.18 %'),(56,'12/07/2024','BANG KHEN','08','2','5.3 hr','39.04 kWh','3.4 hr','฿425.12','฿148.88','฿61.84','฿469.69','48.33 kg','240.25 km','59.66 %'),(57,'12/09/2024','BANG KHEN','02','2','4.5 hr','30.45 kWh','4.7 hr','฿381.39','฿296.77','฿32.03','฿281.96','37.14 kg','281.54 km','61.99 %'),(58,'15/03/2024','BANG KHEN','08','2','5.3 hr','49.28 kWh','3.9 hr','฿433.87','฿153.39','฿16.69','฿247.99','26.79 kg','195.43 km','58.86 %'),(59,'14/09/2024','BANG KHEN','08','1','3.4 hr','36.62 kWh','5.2 hr','฿166.97','฿123.16','฿70.1','฿148.44','18.53 kg','295.54 km','58.89 %'),(60,'14/10/2024','BANG KHEN','04','2','1.7 hr','40.13 kWh','3.5 hr','฿313.19','฿264.53','฿97.42','฿299.68','18.19 kg','218.77 km','38.29 %');
/*!40000 ALTER TABLE `data_analysis` ENABLE KEYS */;
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
