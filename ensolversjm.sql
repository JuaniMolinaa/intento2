-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: ensolversjm
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `body` varchar(800) NOT NULL,
  `datetime` datetime(6) DEFAULT NULL,
  `state` enum('ACTIVE','ARCHIVED') NOT NULL,
  `title` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES (11,'Don\'t forget the team meeting at 10 AM in Conference Room 3. Agenda: Q3 Review and new project kickoff.','2025-07-09 18:21:49.447000','ARCHIVED','Meeting Reminder'),(12,'Need milk, eggs, bread, and spinach. Check for discounts on fruits','2025-07-09 18:21:59.695000','ARCHIVED','Grocery List Update'),(13,'Brainstormed a new feature for user profiles: customizable themes. Needs further discussion','2025-07-09 18:22:07.309000','ARCHIVED','Idea: New Feature'),(14,'\"The Alchemist\" by Paulo Coelho. Heard great things about it, add to reading list','2025-07-09 18:22:16.174000','ARCHIVED','Book to Read'),(15,'Hike on Saturday, then dinner with friends. Sunday, finish reading and relax.\n\n','2025-07-09 18:23:52.176000','ACTIVE','Weekend Plans'),(16,'Follow up with Sarah regarding the marketing proposal. Send an email by end of day','2025-07-09 18:23:58.893000','ACTIVE','Follow Up with Sarah'),(17,'Project \'Apollo\' deadline is Friday. Ensure all tasks are marked as complete','2025-07-09 18:24:05.104000','ARCHIVED','Project Deadline'),(18,'Urgent: Login button not responding on mobile devices. Prioritize fix.','2025-07-09 18:24:12.117000','ACTIVE','Fix Bug in Login'),(19,'Focus on basic greetings and ordering food this week. Practice daily.\n\n','2025-07-09 18:24:18.941000','ACTIVE','Learn Spanish Phrases'),(20,'Today\'s workout: Chest and Triceps. Remember to stretch before and after','2025-07-09 18:24:24.997000','ACTIVE','Gym Workout');
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-09 19:42:51
