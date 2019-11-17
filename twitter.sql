-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 17, 2019 at 09:07 PM
-- Server version: 5.7.21
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `twitter`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
CREATE TABLE IF NOT EXISTS `followers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserID` bigint(20) NOT NULL,
  `FollowerID` bigint(20) NOT NULL,
  `CreatedAt` timestamp NOT NULL,
  `UpdatedAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Follower_fk0` (`UserID`),
  KEY `Follower_fk1` (`FollowerID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `d_o_b` date NOT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip` varchar(50) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_no` varchar(20) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `d_o_b`, `city`, `state`, `zip`, `profile_image`, `description`, `username`, `password`, `email`, `phone_no`, `created_on`, `updated_on`) VALUES
(1, 'Narisht Dhyani', '2000-05-04', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$so6Jf8euklzwwR0AL/wjx.LwpedLG/jIily4TqpNqVJXPR8pOiHui', 'narishtdhyani@gmail.com', NULL, '2019-11-15 08:16:34', NULL),
(2, 'Narisht Dhyani', '2001-05-04', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$H36ie47HlDZdwliAN3CGcOUUuQLIpb629XJDwcTVa6NF.sThkuQDa', NULL, '487851125', '2019-11-15 16:08:36', NULL),
(3, 'Narisht Dhyani', '2001-05-04', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$SBt1SNw8R/aLF68LVT/o0epIiotGgGrtvvm3AuFRkGhhZQNDDveb.', NULL, '487851124', '2019-11-15 16:17:41', NULL),
(4, 'Narisht Dhyani', '2001-05-04', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$UtjABzxHefQoTB28uV/42uQKh2.aKrFMDWiouHFQLmV/yv70qK2R6', 'narishtdhyani1@gmail.com', NULL, '2019-11-15 16:17:55', NULL),
(5, 'TestUser', '2014-08-09', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$4C3IDzfmxFaPar21CUoesuwfQn/59TVBFzVRGVHdMupc3mfrOWs36', 'test@gmail.com', '', '2019-11-17 02:44:40', NULL),
(6, 'jaj', '2015-05-05', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$0UFAl82UFWQJXcPaiTIULO9SkkybYRm4iQSQBM5KiYrwadI6LfUyW', '', '4575454454', '2019-11-17 03:36:40', NULL),
(7, 'mamam', '2014-05-01', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$g3GY3UJC093O4yrtmtivO.Z2BoukU2lVSyJ1K3kFmfFqH/SuQWAkO', '', '54847887', '2019-11-17 04:56:59', NULL),
(8, 'ajakjk', '1970-12-01', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$8hXyvLXkqaFxf7gUiCV6p.bpHd5K.QTc4mfUuMGWw5ocxNju1ulUW', '', '7887878', '2019-11-17 04:58:04', NULL),
(9, 'hghsg', '2008-11-12', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$bdLFxgfL4F16sombo1nXvuIOxj2X38WBp23miClNuiE.6EjtmCwHq', '', '8778788', '2019-11-17 06:32:39', NULL),
(10, 'mmaak', '2009-09-12', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$n0YRYuDmvtV3fvKeBb0FZ.QFXcLGu/XlG7q1Eh2Y0jFJ56BushbPq', '', '878787878', '2019-11-17 06:40:16', NULL),
(11, 'jksnkjs', '2010-11-12', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$wyUm7Yh36CeJQriL/URwS.3N9vrA6hmT/5R5BlXIkwwGKVUVhibkO', 'test2@gmail.com', '', '2019-11-17 06:43:36', NULL),
(12, 'jsnsnq', '2009-08-01', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$8PjVsZAz2LZ/5VrNIbqEhub.fNVApeo1YQBNCpF0mYdEfZGtkeD5O', '', '877878', '2019-11-17 06:46:20', NULL),
(13, 'snsnn', '2014-06-01', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$pWS/WN41t6nRnmVXMaV3NuiRgCDbVEHtig3HUGXZBLXzHcbAaBNmu', '', '58787', '2019-11-17 08:48:11', NULL),
(14, 'malaam', '2008-11-01', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$TNy6TbFN5Q.BMpX9Ptfyo.VuFmmXbGA.XAnI2a/ZC..iTbzF9LvbW', '', '958788787', '2019-11-17 19:26:42', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
