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
-- Table structure for table `data_analysis`
--

DROP TABLE IF EXISTS `data_analysis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data_analysis` (
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
  `RENEWABLE_ENERGY_RATIO` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_analysis`
--

LOCK TABLES `data_analysis` WRITE;
/*!40000 ALTER TABLE `data_analysis` DISABLE KEYS */;
INSERT INTO `data_analysis` VALUES ('16/04/2024','LAT KRABANG','09','1','5.3 hr','36.97 kWh','4.1 hr','฿475.24','฿77.19','฿86.23','฿334.7','33.99 kg','269.37 km','56.11 %'),('02/03/2024','LAT KRABANG','09','2','4.0 hr','36.66 kWh','1.7 hr','฿236.77','฿249.75','฿25.23','฿125.13','30.21 kg','123.02 km','38.3 %'),('02/08/2024','LAT KRABANG','01','1','4.6 hr','37.89 kWh','5.7 hr','฿118.89','฿259.55','฿194.31','฿260.38','11.18 kg','250.47 km','76.85 %'),('05/03/2024','LAT KRABANG','08','1','1.1 hr','20.36 kWh','1.2 hr','฿419.09','฿266.06','฿164.57','฿438.54','26.21 kg','111.38 km','51.49 %'),('29/08/2024','LAT KRABANG','07','2','4.5 hr','30.32 kWh','1.0 hr','฿134.35','฿229.24','฿10.04','฿221.6','33.99 kg','255.32 km','34.48 %'),('19/08/2024','LAT KRABANG','10','2','4.7 hr','46.27 kWh','5.0 hr','฿331.83','฿150.98','฿163.62','฿307.71','47.04 kg','156.98 km','38.62 %'),('20/12/2024','LAT KRABANG','08','2','3.4 hr','21.97 kWh','3.5 hr','฿322.26','฿209.49','฿143.41','฿463.55','40.66 kg','287.86 km','53.52 %'),('06/10/2024','LAT KRABANG','07','1','4.0 hr','21.63 kWh','4.4 hr','฿209.73','฿101.86','฿62.47','฿194.88','25.1 kg','120.34 km','48.49 %'),('28/04/2024','LAT KRABANG','05','1','1.8 hr','44.07 kWh','4.4 hr','฿253.14','฿295.39','฿64.97','฿143.24','33.42 kg','150.08 km','67.06 %'),('03/08/2024','LAT KRABANG','05','2','5.5 hr','28.38 kWh','1.9 hr','฿356.42','฿209.27','฿78.5','฿161.96','31.16 kg','165.29 km','49.62 %'),('23/11/2024','LAT KRABANG','02','2','5.8 hr','42.16 kWh','4.2 hr','฿197.62','฿204.16','฿142.99','฿320.89','19.23 kg','166.6 km','50.5 %'),('24/09/2024','LAT KRABANG','01','2','1.2 hr','47.02 kWh','2.5 hr','฿119.29','฿175.33','฿123.47','฿182.8','48.38 kg','115.12 km','30.25 %'),('27/08/2024','LAT KRABANG','01','2','3.6 hr','38.11 kWh','5.1 hr','฿376.76','฿69.55','฿58.13','฿453.49','45.51 kg','152.7 km','42.46 %'),('01/01/2024','LAT KRABANG','05','2','5.8 hr','36.26 kWh','3.1 hr','฿306.86','฿245.6','฿81.36','฿395.4','21.84 kg','117.47 km','23.0 %'),('16/02/2024','LAT KRABANG','06','1','4.7 hr','33.01 kWh','2.0 hr','฿221.84','฿98.54','฿96.16','฿353.13','26.39 kg','204.37 km','67.07 %'),('11/03/2024','LAT KRABANG','01','2','5.2 hr','46.51 kWh','2.6 hr','฿343.34','฿242.15','฿192.43','฿262.35','17.12 kg','218.13 km','72.94 %'),('29/01/2024','LAT KRABANG','05','1','1.0 hr','22.84 kWh','3.3 hr','฿156.45','฿226.64','฿37.14','฿207.51','39.09 kg','270.0 km','53.12 %'),('08/06/2024','LAT KRABANG','04','1','3.1 hr','31.77 kWh','3.6 hr','฿415.88','฿104.73','฿20.43','฿314.05','13.79 kg','142.12 km','70.78 %'),('24/09/2024','LAT KRABANG','10','1','5.9 hr','23.92 kWh','5.4 hr','฿305.72','฿101.59','฿90.69','฿416.1','14.32 kg','231.49 km','64.53 %'),('27/04/2024','LAT KRABANG','01','2','4.1 hr','23.2 kWh','5.3 hr','฿354.45','฿135.46','฿17.78','฿394.61','35.82 kg','251.23 km','36.23 %'),('08/09/2024','LAT KRABANG','02','2','4.0 hr','27.83 kWh','5.3 hr','฿341.61','฿199.39','฿138.99','฿128.45','26.33 kg','293.17 km','43.51 %'),('31/07/2024','LAT KRABANG','09','2','3.6 hr','37.32 kWh','3.9 hr','฿358.8','฿187.49','฿150.55','฿102.17','16.12 kg','114.67 km','42.92 %'),('29/05/2024','LAT KRABANG','01','2','2.1 hr','22.78 kWh','1.8 hr','฿358.1','฿268.7','฿175.66','฿498.74','23.75 kg','286.94 km','31.97 %'),('07/03/2024','LAT KRABANG','01','1','4.2 hr','44.97 kWh','3.2 hr','฿126.54','฿58.26','฿109.87','฿354.87','31.47 kg','282.4 km','69.16 %'),('16/08/2024','LAT KRABANG','09','2','5.0 hr','32.42 kWh','4.5 hr','฿426.41','฿91.35','฿93.77','฿475.28','42.26 kg','112.97 km','37.98 %'),('01/07/2024','LAT KRABANG','05','2','5.7 hr','44.9 kWh','4.0 hr','฿144.86','฿100.47','฿94.33','฿152.57','46.22 kg','108.13 km','25.45 %'),('15/11/2024','LAT KRABANG','04','1','2.2 hr','25.69 kWh','2.4 hr','฿457.26','฿98.56','฿5.7','฿129.71','31.95 kg','164.03 km','67.27 %'),('06/02/2024','LAT KRABANG','02','1','5.5 hr','38.25 kWh','2.5 hr','฿461.97','฿182.46','฿49.54','฿359.54','33.19 kg','106.61 km','54.03 %'),('15/12/2024','LAT KRABANG','10','2','2.2 hr','30.53 kWh','2.5 hr','฿304.9','฿233.71','฿182.89','฿165.43','19.39 kg','179.27 km','44.64 %'),('15/07/2024','LAT KRABANG','10','1','1.9 hr','29.64 kWh','4.4 hr','฿149.77','฿200.36','฿59.65','฿454.89','38.59 kg','144.3 km','67.92 %'),('21/08/2024','LAT KRABANG','02','1','2.7 hr','21.28 kWh','4.5 hr','฿266.82','฿208.4','฿97.29','฿270.92','15.62 kg','150.48 km','52.22 %'),('03/03/2024','LAT KRABANG','03','1','3.8 hr','42.67 kWh','1.4 hr','฿487.79','฿202.77','฿1.67','฿275.36','46.8 kg','105.36 km','75.4 %'),('12/07/2024','LAT KRABANG','02','1','2.2 hr','38.17 kWh','2.1 hr','฿198.18','฿106.96','฿0.6','฿229.32','42.68 kg','200.08 km','76.51 %'),('17/05/2024','LAT KRABANG','06','1','3.1 hr','27.17 kWh','3.8 hr','฿105.31','฿93.62','฿86.51','฿210.41','45.0 kg','277.12 km','54.78 %'),('28/09/2024','LAT KRABANG','01','1','3.6 hr','33.02 kWh','5.4 hr','฿215.17','฿87.75','฿136.87','฿130.28','19.12 kg','155.27 km','78.07 %'),('06/07/2024','LAT KRABANG','01','2','1.1 hr','49.14 kWh','3.6 hr','฿260.02','฿181.01','฿22.86','฿261.6','13.54 kg','194.31 km','28.75 %'),('04/05/2024','LAT KRABANG','10','1','5.3 hr','42.61 kWh','4.1 hr','฿456.61','฿294.61','฿189.34','฿330.56','16.15 kg','170.03 km','29.55 %'),('08/05/2024','LAT KRABANG','02','2','3.3 hr','24.3 kWh','4.1 hr','฿168.69','฿186.47','฿188.9','฿464.06','16.72 kg','262.75 km','48.67 %'),('25/09/2024','LAT KRABANG','07','1','3.9 hr','21.75 kWh','2.1 hr','฿317.41','฿55.09','฿160.12','฿199.26','22.68 kg','216.54 km','24.24 %'),('13/03/2024','LAT KRABANG','02','1','3.5 hr','47.17 kWh','5.1 hr','฿150.27','฿112.22','฿150.91','฿261.59','29.54 kg','127.59 km','48.25 %'),('01/08/2024','LAT KRABANG','02','2','2.9 hr','33.14 kWh','2.8 hr','฿434.1','฿269.15','฿48.52','฿397.87','33.16 kg','160.9 km','44.42 %'),('24/04/2024','LAT KRABANG','10','1','3.7 hr','32.51 kWh','3.4 hr','฿154.01','฿125.6','฿181.27','฿236.35','39.31 kg','146.67 km','59.47 %'),('19/04/2024','LAT KRABANG','07','1','5.9 hr','39.32 kWh','5.7 hr','฿294.69','฿257.85','฿21.8','฿146.15','27.61 kg','155.07 km','23.17 %');
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

-- Dump completed on 2025-04-07 11:05:27
