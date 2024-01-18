-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_test
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Table structure for table `filedb`
--

DROP TABLE IF EXISTS `filedb`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filedb`
(
    `id`   varchar(255) NOT NULL,
    `data` mediumblob,
    `name` varchar(255) DEFAULT NULL,
    `type` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filedb`
--

LOCK TABLES `filedb` WRITE;
/*!40000 ALTER TABLE `filedb`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `filedb`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internship`
--

DROP TABLE IF EXISTS `internship`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internship`
(
    `id`             int NOT NULL,
    `promotion_year` enum ('L1','L2','L3','M1','M2') DEFAULT NULL,
    `title`          varchar(255)                    DEFAULT NULL,
    `year`           int                             DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internship`
--

LOCK TABLES `internship` WRITE;
/*!40000 ALTER TABLE `internship`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `internship`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internship_seq`
--

DROP TABLE IF EXISTS `internship_seq`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internship_seq`
(
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internship_seq`
--

LOCK TABLES `internship_seq` WRITE;
/*!40000 ALTER TABLE `internship_seq`
    DISABLE KEYS */;
INSERT INTO `internship_seq`
VALUES (1);
/*!40000 ALTER TABLE `internship_seq`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report`
(
    `id`            int NOT NULL,
    `deadline`      date         DEFAULT NULL,
    `description`   varchar(255) DEFAULT NULL,
    `title`         varchar(255) DEFAULT NULL,
    `internship_id` int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FKe3lssqug72r3uq9pehmvlincc` (`internship_id`),
    CONSTRAINT `FKe3lssqug72r3uq9pehmvlincc` FOREIGN KEY (`internship_id`) REFERENCES `internship` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `report`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_seq`
--

DROP TABLE IF EXISTS `report_seq`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_seq`
(
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_seq`
--

LOCK TABLES `report_seq` WRITE;
/*!40000 ALTER TABLE `report_seq`
    DISABLE KEYS */;
INSERT INTO `report_seq`
VALUES (1);
/*!40000 ALTER TABLE `report_seq`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_internship`
--

DROP TABLE IF EXISTS `student_internship`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_internship`
(
    `id`                      int NOT NULL,
    `company_address`         varchar(255) DEFAULT NULL,
    `company_city`            varchar(255) DEFAULT NULL,
    `company_country`         varchar(255) DEFAULT NULL,
    `company_name`            varchar(255) DEFAULT NULL,
    `company_postal_code`     varchar(255) DEFAULT NULL,
    `end_date`                date         DEFAULT NULL,
    `is_approved`             bit(1)       DEFAULT NULL,
    `mission`                 varchar(255) DEFAULT NULL,
    `start_date`              date         DEFAULT NULL,
    `tutor_school_email`      varchar(255) DEFAULT NULL,
    `tutor_school_first_name` varchar(255) DEFAULT NULL,
    `tutor_school_last_name`  varchar(255) DEFAULT NULL,
    `wage`                    int          DEFAULT NULL,
    `internship_id`           int          DEFAULT NULL,
    `tutor_company_user_id`   int          DEFAULT NULL,
    `tutor_school_user_id`    int          DEFAULT NULL,
    `user_id`                 int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FKctfglfj8aergqfbbm4g4j4aqk` (`internship_id`),
    KEY `FK4aekvwfqk0dttrpb2jut4repw` (`tutor_company_user_id`),
    KEY `FKky9sqembrktxmwslv4n9da1tp` (`tutor_school_user_id`),
    KEY `FK3s9vbk8ja15y7yej5hx2vtaqp` (`user_id`),
    CONSTRAINT `FK3s9vbk8ja15y7yej5hx2vtaqp` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `FK4aekvwfqk0dttrpb2jut4repw` FOREIGN KEY (`tutor_company_user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `FKctfglfj8aergqfbbm4g4j4aqk` FOREIGN KEY (`internship_id`) REFERENCES `internship` (`id`),
    CONSTRAINT `FKky9sqembrktxmwslv4n9da1tp` FOREIGN KEY (`tutor_school_user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_internship`
--

LOCK TABLES `student_internship` WRITE;
/*!40000 ALTER TABLE `student_internship`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `student_internship`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_internship_seq`
--

DROP TABLE IF EXISTS `student_internship_seq`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_internship_seq`
(
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_internship_seq`
--

LOCK TABLES `student_internship_seq` WRITE;
/*!40000 ALTER TABLE `student_internship_seq`
    DISABLE KEYS */;
INSERT INTO `student_internship_seq`
VALUES (1);
/*!40000 ALTER TABLE `student_internship_seq`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submit`
--

DROP TABLE IF EXISTS `submit`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submit`
(
    `id`                     int NOT NULL,
    `is_approved_by_company` bit(1)       DEFAULT NULL,
    `is_approved_by_school`  bit(1)       DEFAULT NULL,
    `submit_date`            date         DEFAULT NULL,
    `filedb_id`              varchar(255) DEFAULT NULL,
    `report_id`              int          DEFAULT NULL,
    `student_internship_id`  int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FKb18holmus9d1kinkm86unyyvg` (`filedb_id`),
    KEY `FKke5k85n4jw0o52lxyglcd2t3a` (`report_id`),
    KEY `FK9aro1phd9377wrb3gn6coy60w` (`student_internship_id`),
    CONSTRAINT `FK9aro1phd9377wrb3gn6coy60w` FOREIGN KEY (`student_internship_id`) REFERENCES `student_internship` (`id`),
    CONSTRAINT `FKb18holmus9d1kinkm86unyyvg` FOREIGN KEY (`filedb_id`) REFERENCES `filedb` (`id`),
    CONSTRAINT `FKke5k85n4jw0o52lxyglcd2t3a` FOREIGN KEY (`report_id`) REFERENCES `report` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submit`
--

LOCK TABLES `submit` WRITE;
/*!40000 ALTER TABLE `submit`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `submit`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submit_seq`
--

DROP TABLE IF EXISTS `submit_seq`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submit_seq`
(
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submit_seq`
--

LOCK TABLES `submit_seq` WRITE;
/*!40000 ALTER TABLE `submit_seq`
    DISABLE KEYS */;
INSERT INTO `submit_seq`
VALUES (1);
/*!40000 ALTER TABLE `submit_seq`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token`
(
    `id`         int    NOT NULL,
    `expired`    bit(1) NOT NULL,
    `revoked`    bit(1) NOT NULL,
    `token`      varchar(2000) DEFAULT NULL,
    `token_type` tinyint       DEFAULT NULL,
    `user_id`    int           DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FKe32ek7ixanakfqsdaokm4q9y2` (`user_id`),
    CONSTRAINT `FKe32ek7ixanakfqsdaokm4q9y2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `token_chk_1` CHECK ((`token_type` between 0 and 0))
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `token`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_seq`
--

DROP TABLE IF EXISTS `token_seq`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_seq`
(
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_seq`
--

LOCK TABLES `token_seq` WRITE;
/*!40000 ALTER TABLE `token_seq`
    DISABLE KEYS */;
INSERT INTO `token_seq`
VALUES (1);
/*!40000 ALTER TABLE `token_seq`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user`
(
    `id`                        int NOT NULL,
    `birth_date`                date                             DEFAULT NULL,
    `email`                     varchar(255)                     DEFAULT NULL,
    `first_name`                varchar(255)                     DEFAULT NULL,
    `last_name`                 varchar(255)                     DEFAULT NULL,
    `password`                  varchar(255)                     DEFAULT NULL,
    `promotion_year`            int                              DEFAULT NULL,
    `role`                      enum ('STUDENT','TUTOR','ADMIN') DEFAULT NULL,
    `profile_picture_filedb_id` varchar(255)                     DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK7prt04k0e0knjnknqa79782pr` (`profile_picture_filedb_id`),
    CONSTRAINT `FK7prt04k0e0knjnknqa79782pr` FOREIGN KEY (`profile_picture_filedb_id`) REFERENCES `filedb` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `user`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_seq`
(
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq`
    DISABLE KEYS */;
INSERT INTO `user_seq`
VALUES (1);
/*!40000 ALTER TABLE `user_seq`
    ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18 16:22:37
