-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2015 at 08:43 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `project_01`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE IF NOT EXISTS `answers` (
  `ans_id` int(11) NOT NULL,
  `ans_date` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`ans_id`, `ans_date`, `user_id`, `content`, `likes`) VALUES
(91, '2015-10-01', 115, 'No new maps available.Last was de_cache for cs:go', 2),
(92, '2015-10-02', 111, 'Hahaha...... it''s an art...Just keep practicing', 3),
(93, '2015-10-03', 112, 'yo main ... practice ...', 1),
(94, '2015-10-15', 112, 'Of course CS is better.....\r\nnow cs:go', 4),
(95, '2015-10-20', 111, 'Both are best ........ but most of the gamers prefer cs over cod...\r\n', 2),
(98, '2015-10-17', 113, 'yes check it out on http://www.ndkqnsdkqndm.com', 2),
(99, '2015-10-05', 112, 'check it out on https://www.gameworld.com/deadly/po3', 1),
(100, '2015-10-06', 111, 'Both are best ........ but most of the gamers prefer cs over cod...\r\n', 2),
(103, '2015-10-06', 115, 'are yeh ni hora tujse... tu rehne \r\nde tuu game chod de ', 3),
(104, '2015-10-17', 112, 'What type of qs. is this........have you lost', 0),
(105, '2015-11-14', 113, 'fifa 13.. :p', 3),
(106, '2015-11-19', 111, 'play with latest version.....\r\nnew teams,new transfers.....', 2);

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE IF NOT EXISTS `articles` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `likes` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`post_id`, `user_id`, `title`, `content`, `likes`) VALUES
(4, 115, 'accelerate ur performance in cs', '3 Steps to get better in Counter Strike', 3),
(7, 111, 'How to start Multiplayer in Call of Duty', '1.\r\n2.\r\n3.', 3),
(8, 115, 'Article on Assasino', 'shi h', 1),
(11, 112, 'Fifa 15 fixes...', 'New fixes available .checkit out on \r\nwww.fifa 15/official/fixes/downloads', 2);

-- --------------------------------------------------------

--
-- Table structure for table `articles_comments`
--

CREATE TABLE IF NOT EXISTS `articles_comments` (
  `post_id` int(11) NOT NULL,
  `comm_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `articles_comments`
--

INSERT INTO `articles_comments` (`post_id`, `comm_id`) VALUES
(4, 121),
(4, 122),
(7, 123),
(7, 124),
(12, 125);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `comm_id` int(11) NOT NULL,
  `comm_date` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comm_id`, `comm_date`, `user_id`, `content`, `likes`) VALUES
(121, '2015-10-05', 113, 'You are forgetting about ...', 1),
(122, '2015-10-02', 111, 'You are forgetting about ...', 1),
(123, '2015-10-13', 113, 'one more step to follow...', 1),
(124, '2015-11-01', 111, 'nyc article.... :(', 1),
(125, '2015-11-13', 113, 'Gud Qs....', 1);

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `game_id` int(11) NOT NULL,
  `game_name` varchar(30) NOT NULL,
  `descp` varchar(50) NOT NULL,
  `comp_name` varchar(50) DEFAULT NULL,
  `genre_id` int(11) NOT NULL,
  `release_date` date NOT NULL,
  `rating` int(2) DEFAULT NULL,
  `rate_count` int(11) DEFAULT NULL,
  `gallery` varchar(255) DEFAULT NULL,
  `platform` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `game_name`, `descp`, `comp_name`, `genre_id`, `release_date`, `rating`, `rate_count`, `gallery`, `platform`) VALUES
(101, 'Counter Strike', 'Worldwide played single/multiplayer game  ', 'developers', 1, '2001-01-01', 5, 200, NULL, 0),
(102, 'Call of Duty', 'Worldwide played single/multiplayer game  ', 'developers', 1, '2006-11-10', 5, 198, NULL, NULL),
(103, 'Blur', 'Worldwide played single/multiplayer game  ', 'Ubisoft', 3, '2004-06-19', 4, 146, NULL, NULL),
(104, 'Assasino', 'Single Player Game', 'Ubisoft', 4, '2009-01-13', 4, 156, NULL, NULL),
(105, 'Fifa 15', 'Worldwide played single/multiplayer game', 'EA Sports', 5, '2014-07-02', 5, 200, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `games_played`
--

CREATE TABLE IF NOT EXISTS `games_played` (
  `user_id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `user_rate` int(11) DEFAULT NULL,
  `user_rev` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games_played`
--

INSERT INTO `games_played` (`user_id`, `game_id`, `user_rate`, `user_rev`) VALUES
(111, 101, 8, 'Bst Multiplayer Game'),
(115, 101, 8, 'Bst Multiplayer Game'),
(113, 101, 7, 'Bst Multiplayer Game'),
(112, 101, 9, 'Bst Multiplayer Game'),
(114, 104, 6, 'Awesome Missions '),
(111, 104, 7, 'Awesome Missions '),
(115, 104, 6, 'Awesome Missions '),
(113, 105, 7, 'Shi h'),
(112, 105, 8, 'Addictive'),
(113, 103, 6, 'shi h'),
(111, 105, 6, 'shi h'),
(114, 105, 8, 'My fav.'),
(115, 102, 8, 'Nyc Game'),
(113, 102, 9, 'My fav.');

-- --------------------------------------------------------

--
-- Table structure for table `games_tags`
--

CREATE TABLE IF NOT EXISTS `games_tags` (
  `game_id` int(11) NOT NULL,
  `tag_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games_tags`
--

INSERT INTO `games_tags` (`game_id`, `tag_id`) VALUES
(101, 1),
(101, 6),
(101, 15),
(101, 16),
(101, 17),
(101, 23),
(101, 31),
(101, 32),
(102, 2),
(102, 6),
(102, 9),
(102, 15),
(102, 16),
(102, 23),
(102, 31),
(103, 3),
(103, 7),
(103, 15),
(103, 16),
(103, 17),
(103, 26),
(103, 30),
(104, 30),
(104, 31),
(104, 16),
(104, 18),
(104, 24),
(104, 25),
(104, 4),
(104, 8),
(104, 9),
(105, 5),
(105, 12),
(105, 16),
(105, 15),
(105, 17),
(105, 25),
(105, 32),
(105, 31),
(105, 28),
(105, 24),
(105, 21),
(101, 29),
(102, 29);

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE IF NOT EXISTS `genre` (
  `genre_id` int(11) NOT NULL,
  `genre_name` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`genre_id`, `genre_name`) VALUES
(1, 'military_fight'),
(2, 'military_fight'),
(3, 'car race'),
(4, 'adventure/mission'),
(5, 'football');

-- --------------------------------------------------------

--
-- Table structure for table `interest`
--

CREATE TABLE IF NOT EXISTS `interest` (
  `user_id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `interest`
--

INSERT INTO `interest` (`user_id`, `game_id`) VALUES
(111, 101),
(111, 102),
(111, 103),
(111, 104),
(113, 101),
(113, 102),
(115, 102),
(115, 101),
(115, 104),
(112, 101),
(112, 105),
(112, 103),
(114, 103),
(115, 104),
(113, 105),
(111, 105);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` int(11) NOT NULL,
  `post_type` char(2) DEFAULT NULL,
  `post_date` date DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_type`, `post_date`) VALUES
(1, 'QS', '2015-09-30'),
(2, 'QS', '2015-10-01'),
(3, 'QS', '2015-10-13'),
(4, 'AR', '2015-10-02'),
(5, 'QS', '2015-10-16'),
(6, 'QS', '2015-10-02'),
(7, 'AR', '2015-10-03'),
(8, 'AR', '2015-08-16'),
(9, 'QS', '2015-10-03'),
(10, 'QS', '2015-10-16'),
(11, 'AR', '2015-11-13'),
(12, 'AR', '2015-11-13');

-- --------------------------------------------------------

--
-- Table structure for table `posts_tags`
--

CREATE TABLE IF NOT EXISTS `posts_tags` (
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts_tags`
--

INSERT INTO `posts_tags` (`post_id`, `tag_id`) VALUES
(1, 23),
(1, 1),
(2, 1),
(2, 29),
(3, 28),
(3, 1),
(3, 2),
(4, 1),
(4, 32),
(5, 2),
(5, 23),
(6, 1),
(6, 2),
(6, 28),
(7, 32),
(7, 15),
(7, 2),
(8, 4),
(8, 32),
(9, 4),
(9, 9),
(10, 31),
(10, 3),
(11, 28),
(11, 5),
(12, 30),
(12, 32);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` varchar(3000) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`post_id`, `user_id`, `title`, `content`, `likes`) VALUES
(1, 111, 'Maps for CS', 'Any new maps for counter strike??', 5),
(2, 115, NULL, 'How to take headshots in Counter strike', 6),
(3, 113, 'Cs V/s Cod', 'Which is better Counter Strike or Call of duty??', 2),
(5, 113, 'New realeses', 'Any New release in Call Of Duty??', 0),
(6, 115, NULL, 'Which is better Counter Strike or Call of duty??', 1),
(9, 114, 'problem in Mission', 'image uploaded.... Can anyone help me with this??', 0),
(10, 114, NULL, 'Any New Bugs in Blur?', 2),
(12, 112, 'New fixes', 'New fixes available in fifa 15??', 0);

-- --------------------------------------------------------

--
-- Table structure for table `questions_answers`
--

CREATE TABLE IF NOT EXISTS `questions_answers` (
  `post_id` int(11) DEFAULT NULL,
  `ans_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions_answers`
--

INSERT INTO `questions_answers` (`post_id`, `ans_id`) VALUES
(1, 91),
(2, 92),
(2, 93),
(3, 94),
(3, 95),
(5, 98),
(6, 99),
(6, 100),
(9, 103),
(10, 104),
(11, 105),
(11, 106);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `tag_id` int(11) NOT NULL,
  `tag_name` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tag_id`, `tag_name`) VALUES
(1, 'Counter Strike'),
(2, 'Call Of Duty'),
(3, 'Blur'),
(4, 'Assasino'),
(5, 'Fifa 15'),
(6, 'military_fight'),
(7, 'Car race'),
(8, 'Adventure '),
(9, 'Mission'),
(10, 'fifa 13'),
(11, 'fifa 14'),
(12, 'football'),
(13, 'horror'),
(14, 'skyland'),
(15, 'muliplayer'),
(16, 'single player'),
(17, 'most rated'),
(18, 'lowest rated'),
(19, 'anime '),
(20, 'zombie'),
(21, 'sports'),
(22, 'cricket'),
(23, 'maps'),
(24, 'big size games'),
(25, 'new games'),
(26, 'old'),
(28, 'comparison'),
(29, 'headshot'),
(30, 'fixes'),
(31, 'bugs'),
(32, 'article');

-- --------------------------------------------------------

--
-- Table structure for table `user_descp`
--

CREATE TABLE IF NOT EXISTS `user_descp` (
  `user_id` int(11) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `age` int(3) NOT NULL,
  `descp` varchar(200) DEFAULT NULL,
  `sex` char(1) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `pro_pic` varchar(255) DEFAULT NULL,
  `acc_date` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_descp`
--

INSERT INTO `user_descp` (`user_id`, `fname`, `lname`, `age`, `descp`, `sex`, `address`, `DOB`, `pro_pic`, `acc_date`) VALUES
(111, 'Tom', 'Hanks', 18, 'Born to play \r\n', 'M', NULL, '1995-05-16', NULL, '2015-09-21'),
(112, 'Yugal', 'Jain', 20, 'Newbie', 'M', NULL, '1995-12-01', NULL, '2015-09-16'),
(113, 'Prakhar', 'Gupta', 19, 'Death:-Not Today\r\n', 'M', NULL, '1995-07-20', NULL, '2015-08-30'),
(114, 'Crystina', 'Deep', 19, 'The one who plays more\r\n', 'F', NULL, '1996-05-12', NULL, '2015-09-14'),
(115, 'Dishank', 'Jain', 20, 'The First Player\r\n', 'M', NULL, '1995-03-10', NULL, '2015-08-15');

-- --------------------------------------------------------

--
-- Table structure for table `user_followers`
--

CREATE TABLE IF NOT EXISTS `user_followers` (
  `user_id` int(11) NOT NULL,
  `followers` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_followers`
--

INSERT INTO `user_followers` (`user_id`, `followers`) VALUES
(113, 111),
(115, 111),
(112, 111),
(111, 112),
(113, 112),
(114, 112),
(111, 114),
(115, 114),
(113, 114),
(113, 115),
(112, 115),
(114, 113),
(112, 113),
(115, 113),
(115, 111);

-- --------------------------------------------------------

--
-- Table structure for table `user_following`
--

CREATE TABLE IF NOT EXISTS `user_following` (
  `user_id` int(11) NOT NULL,
  `following` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_following`
--

INSERT INTO `user_following` (`user_id`, `following`) VALUES
(111, 113),
(111, 115),
(111, 112),
(112, 111),
(112, 113),
(112, 114),
(114, 111),
(114, 115),
(114, 114),
(114, 113),
(115, 111),
(115, 113),
(113, 114),
(113, 112),
(113, 115);

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE IF NOT EXISTS `user_login` (
  `user_id` int(11) NOT NULL,
  `username` varchar(220) NOT NULL,
  `password` varchar(120) NOT NULL,
  `email` varchar(220) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`user_id`, `username`, `password`, `email`) VALUES
(111, 'aim_synchronyzer', '1234', 'aim_synchronyzer@gmail.com'),
(112, 'lovingyugs', '1234', 'lovingyugs95@gmail.com'),
(113, 'deadly', '1234', 'deadly@rediffmail.comom'),
(114, 'crystal_402', '1234', 'crystal_402@yahoo.in'),
(115, 'bittu', '1234', 'bittu1234@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_posts`
--

CREATE TABLE IF NOT EXISTS `user_posts` (
  `user_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_posts`
--

INSERT INTO `user_posts` (`user_id`, `post_id`) VALUES
(111, 1),
(115, 2),
(113, 3),
(115, 4),
(113, 5),
(115, 6),
(111, 7),
(115, 8),
(114, 9),
(114, 10),
(112, 11),
(112, 12);

-- --------------------------------------------------------

--
-- Table structure for table `user_status`
--

CREATE TABLE IF NOT EXISTS `user_status` (
  `user_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_status`
--

INSERT INTO `user_status` (`user_id`, `status`) VALUES
(111, 1),
(115, 0),
(112, 1),
(114, 1),
(113, 0),
(111, 1),
(115, 0),
(112, 1),
(114, 1),
(113, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`ans_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD UNIQUE KEY `post_id` (`post_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `articles_comments`
--
ALTER TABLE `articles_comments`
  ADD KEY `post_id` (`post_id`), ADD KEY `comm_id` (`comm_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comm_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`), ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `games_played`
--
ALTER TABLE `games_played`
  ADD KEY `user_id` (`user_id`), ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `games_tags`
--
ALTER TABLE `games_tags`
  ADD KEY `tag_id` (`tag_id`), ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `interest`
--
ALTER TABLE `interest`
  ADD KEY `user_id` (`user_id`), ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `posts_tags`
--
ALTER TABLE `posts_tags`
  ADD KEY `posts_tags_ibfk_1` (`post_id`), ADD KEY `posts_tags_ibfk_2` (`tag_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`post_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `questions_answers`
--
ALTER TABLE `questions_answers`
  ADD KEY `questions_answers_ibfk_1` (`post_id`), ADD KEY `questions_answers` (`ans_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- Indexes for table `user_descp`
--
ALTER TABLE `user_descp`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_followers`
--
ALTER TABLE `user_followers`
  ADD KEY `user_id` (`user_id`), ADD KEY `followers` (`followers`);

--
-- Indexes for table `user_following`
--
ALTER TABLE `user_following`
  ADD KEY `user_id` (`user_id`), ADD KEY `following` (`following`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`user_id`), ADD UNIQUE KEY `email` (`email`), ADD UNIQUE KEY `email_2` (`email`);

--
-- Indexes for table `user_posts`
--
ALTER TABLE `user_posts`
  ADD KEY `user_id` (`user_id`), ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `user_status`
--
ALTER TABLE `user_status`
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `ans_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=107;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comm_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=126;
--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `game_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=106;
--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `user_descp`
--
ALTER TABLE `user_descp`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=116;
--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=116;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
ADD CONSTRAINT `articles` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
ADD CONSTRAINT `articles_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

--
-- Constraints for table `articles_comments`
--
ALTER TABLE `articles_comments`
ADD CONSTRAINT `articles_comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
ADD CONSTRAINT `articles_comments_ibfk_2` FOREIGN KEY (`comm_id`) REFERENCES `comments` (`comm_id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

--
-- Constraints for table `games`
--
ALTER TABLE `games`
ADD CONSTRAINT `games` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`);

--
-- Constraints for table `games_played`
--
ALTER TABLE `games_played`
ADD CONSTRAINT `games_played` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`),
ADD CONSTRAINT `games_played_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

--
-- Constraints for table `games_tags`
--
ALTER TABLE `games_tags`
ADD CONSTRAINT `games_tags_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`),
ADD CONSTRAINT `games_tags_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`);

--
-- Constraints for table `interest`
--
ALTER TABLE `interest`
ADD CONSTRAINT `interest` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`),
ADD CONSTRAINT `interest_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

--
-- Constraints for table `posts_tags`
--
ALTER TABLE `posts_tags`
ADD CONSTRAINT `posts_tags_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
ADD CONSTRAINT `posts_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
ADD CONSTRAINT `questions` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

--
-- Constraints for table `questions_answers`
--
ALTER TABLE `questions_answers`
ADD CONSTRAINT `questions_answers` FOREIGN KEY (`ans_id`) REFERENCES `answers` (`ans_id`),
ADD CONSTRAINT `questions_answers_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Constraints for table `user_descp`
--
ALTER TABLE `user_descp`
ADD CONSTRAINT `user_descp` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

--
-- Constraints for table `user_followers`
--
ALTER TABLE `user_followers`
ADD CONSTRAINT `user_followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`),
ADD CONSTRAINT `user_followers_ibfk_2` FOREIGN KEY (`followers`) REFERENCES `user_login` (`user_id`);

--
-- Constraints for table `user_following`
--
ALTER TABLE `user_following`
ADD CONSTRAINT `user_following_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`),
ADD CONSTRAINT `user_following_ibfk_2` FOREIGN KEY (`following`) REFERENCES `user_login` (`user_id`);

--
-- Constraints for table `user_posts`
--
ALTER TABLE `user_posts`
ADD CONSTRAINT `user_posts` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
ADD CONSTRAINT `user_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

--
-- Constraints for table `user_status`
--
ALTER TABLE `user_status`
ADD CONSTRAINT `user_status_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
