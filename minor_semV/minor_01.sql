-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2015 at 06:34 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `minor_01`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE IF NOT EXISTS `answers` (
  `ans_id` varchar(20) NOT NULL,
  `ans_date` date NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`ans_id`, `ans_date`, `user_id`, `content`, `likes`) VALUES
('a100', '2015-10-06', 'aim_synchronyzer', 'Both are best ........ but most of the gamers prefer cs over cod...\r\n', 2),
('a103', '2015-10-06', 'bittu', 'are yeh ni hora tujse... tu rehne \r\nde tuu game chod de ', 3),
('a104', '2015-10-17', 'lovingyugs', 'What type of qs. is this........have you lost', 0),
('a105', '2015-11-14', 'deadly', 'fifa 13.. :p', 3),
('a106', '2015-11-19', 'aim_synchronyzer', 'play with latest version.....\r\nnew teams,new transfers.....', 2),
('a91', '2015-10-01', 'bittu', 'No new maps available.Last was de_cache for cs:go', 2),
('a92', '2015-10-02', 'aim_synchronyzer', 'Hahaha...... it''s an art...Just keep practicing', 3),
('a93', '2015-10-03', 'lovingyugs', 'yo main ... practice ...', 1),
('a94', '2015-10-15', 'lovingyugs', 'Of course CS is better.....\r\nnow cs:go', 4),
('a95', '2015-10-20', 'aim_synchronyzer', 'Both are best ........ but most of the gamers prefer cs over cod...\r\n', 2),
('a98', '2015-10-17', 'deadly', 'yes check it out on http://www.ndkqnsdkqndm.com', 2),
('a99', '2015-10-05', 'lovingyugs', 'check it out on https://www.gameworld.com/deadly/po3', 1);

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE IF NOT EXISTS `articles` (
  `post_id` varchar(20) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `likes` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`post_id`, `user_id`, `title`, `content`, `likes`) VALUES
('p04', 'bittu', 'accelerate ur performance in cs', '3 Steps to get better in Counter Strike', 3),
('p07', 'aim_synchronyzer', 'How to start Multiplayer in Call of Duty', '1.\r\n2.\r\n3.', 3),
('p08', 'bittu', 'Article on Assasino', 'shi h', 1),
('p11', 'lovingyugs', 'Fifa 15 fixes...', 'New fixes available .checkit out on \r\nwww.fifa 15/official/fixes/downloads', 2);

-- --------------------------------------------------------

--
-- Table structure for table `articles_comments`
--

CREATE TABLE IF NOT EXISTS `articles_comments` (
  `post_id` varchar(20) NOT NULL,
  `comm_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `articles_comments`
--

INSERT INTO `articles_comments` (`post_id`, `comm_id`) VALUES
('p04', 'comm1'),
('p04', 'comm2'),
('p07', 'comm3'),
('p07', 'comm3'),
('p12', 'comm5');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `comm_id` varchar(20) NOT NULL,
  `comm_date` date NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comm_id`, `comm_date`, `user_id`, `content`, `likes`) VALUES
('comm1', '2015-10-05', 'deadly', 'You are forgetting about ...', 1),
('comm2', '2015-10-02', 'aim_synchronyzer', 'You are forgetting about ...', 1),
('comm3', '2015-10-13', 'deadly', 'one more step to follow...', 1),
('comm4', '2015-11-01', 'aim_synchronyzer', 'nyc article.... :(', 1),
('comm5', '2015-11-13', 'deadly', 'Gud Qs....', 1);

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `game_id` varchar(20) NOT NULL,
  `game_name` varchar(30) NOT NULL,
  `descp` varchar(50) NOT NULL,
  `comp_name` varchar(50) DEFAULT NULL,
  `genre_id` varchar(20) NOT NULL,
  `release_date` date NOT NULL,
  `rating` int(2) DEFAULT NULL,
  `rate_count` int(11) DEFAULT NULL,
  `gallery` varchar(255) DEFAULT NULL,
  `platform` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `game_name`, `descp`, `comp_name`, `genre_id`, `release_date`, `rating`, `rate_count`, `gallery`, `platform`) VALUES
('g101', 'Counter Strike', 'Worldwide played single/multiplayer game  ', 'developers', 'ge01', '2001-01-01', 5, 200, NULL, 0),
('g102', 'Call of Duty', 'Worldwide played single/multiplayer game  ', 'developers', 'ge01', '2006-11-10', 5, 198, NULL, NULL),
('g103', 'Blur', 'Worldwide played single/multiplayer game  ', 'Ubisoft', 'ge03', '2004-06-19', 4, 146, NULL, NULL),
('g104', 'Assasino', 'Single Player Game', 'Ubisoft', 'ge04', '2009-01-13', 4, 156, NULL, NULL),
('g105', 'Fifa 15', 'Worldwide played single/multiplayer game', 'EA Sports', 'ge05', '2014-07-02', 5, 200, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `games_played`
--

CREATE TABLE IF NOT EXISTS `games_played` (
  `user_id` varchar(20) NOT NULL,
  `game_id` varchar(20) DEFAULT NULL,
  `user_rate` int(11) DEFAULT NULL,
  `user_rev` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games_played`
--

INSERT INTO `games_played` (`user_id`, `game_id`, `user_rate`, `user_rev`) VALUES
('aim_synchronyzer', 'g101', 8, 'Bst Multiplayer Game'),
('bittu', 'g101', 8, 'Bst Multiplayer Game'),
('deadly', 'g101', 7, 'Bst Multiplayer Game'),
('lovingyugs', 'g101', 9, 'Bst Multiplayer Game'),
('crystal_402', 'g104', 6, 'Awesome Missions '),
('aim_synchronyzer', 'g104', 7, 'Awesome Missions '),
('bittu', 'g104', 6, 'Awesome Missions '),
('deadly', 'g105', 7, 'Shi h'),
('lovingyugs', 'g105', 8, 'Addictive'),
('deadly', 'g103', 6, 'shi h'),
('aim_synchronyzer', 'g105', 6, 'shi h'),
('crystal_402', 'g105', 8, 'My fav.'),
('bittu', 'g102', 8, 'Nyc Game'),
('deadly', 'g102', 9, 'My fav.');

-- --------------------------------------------------------

--
-- Table structure for table `games_tags`
--

CREATE TABLE IF NOT EXISTS `games_tags` (
  `game_id` varchar(20) NOT NULL,
  `tag_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games_tags`
--

INSERT INTO `games_tags` (`game_id`, `tag_id`) VALUES
('g101', 't01'),
('g101', 't06'),
('g101', 't15'),
('g101', 't16'),
('g101', 't17'),
('g101', 't23'),
('g101', 't31'),
('g101', 't32'),
('g102', 't02'),
('g102', 't06'),
('g102', 't09'),
('g102', 't15'),
('g102', 't16'),
('g102', 't23'),
('g102', 't31'),
('g103', 't03'),
('g103', 't07'),
('g103', 't15'),
('g103', 't16'),
('g103', 't17'),
('g103', 't26'),
('g103', 't30'),
('g104', 't30'),
('g104', 't31'),
('g104', 't16'),
('g104', 't18'),
('g104', 't24'),
('g104', 't25'),
('g104', 't04'),
('g104', 't08'),
('g104', 't09'),
('g105', 't05'),
('g105', 't12'),
('g105', 't16'),
('g105', 't15'),
('g105', 't17'),
('g105', 't25'),
('g105', 't32'),
('g105', 't31'),
('g105', 't28'),
('g105', 't24'),
('g105', 't21'),
('g101', 't29'),
('g102', 't29');

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE IF NOT EXISTS `genre` (
  `genre_id` varchar(20) NOT NULL,
  `genre_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`genre_id`, `genre_name`) VALUES
('ge01', 'military_fight'),
('ge02', 'military_fight'),
('ge03', 'car race'),
('ge04', 'adventure/mission'),
('ge05', 'football');

-- --------------------------------------------------------

--
-- Table structure for table `interest`
--

CREATE TABLE IF NOT EXISTS `interest` (
  `user_id` varchar(20) NOT NULL,
  `game_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `interest`
--

INSERT INTO `interest` (`user_id`, `game_id`) VALUES
('aim_synchronyzer', 'g101'),
('aim_synchronyzer', 'g102'),
('aim_synchronyzer', 'g103'),
('aim_synchronyzer', 'g104'),
('deadly', 'g101'),
('deadly', 'g102'),
('bittu', 'g102'),
('bittu', 'g101'),
('bittu', 'g104'),
('lovingyugs', 'g101'),
('lovingyugs', 'g105'),
('lovingyugs', 'g103'),
('crystal_402', 'g103'),
('crystal_402', 'g104'),
('deadly', 'g105'),
('aim_synchronyzer', 'g105');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` varchar(20) NOT NULL,
  `post_type` char(2) DEFAULT NULL,
  `post_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_type`, `post_date`) VALUES
('p01', 'QS', '2015-09-30'),
('p02', 'QS', '2015-10-01'),
('p03', 'QS', '2015-10-13'),
('p04', 'AR', '2015-10-02'),
('p05', 'QS', '2015-10-16'),
('p06', 'QS', '2015-10-02'),
('p07', 'AR', '2015-10-03'),
('p08', 'AR', '2015-08-16'),
('p09', 'QS', '2015-10-03'),
('p10', 'QS', '2015-10-16'),
('p11', 'AR', '2015-11-13'),
('p12', 'AR', '2015-11-13');

-- --------------------------------------------------------

--
-- Table structure for table `posts_tags`
--

CREATE TABLE IF NOT EXISTS `posts_tags` (
  `post_id` varchar(20) NOT NULL,
  `tag_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts_tags`
--

INSERT INTO `posts_tags` (`post_id`, `tag_id`) VALUES
('p01', 't23'),
('p01', 't01'),
('p02', 't01'),
('p02', 't29'),
('p03', 't28'),
('p03', 't01'),
('p03', 't02'),
('p04', 't01'),
('p04', 't32'),
('p05', 't02'),
('p05', 't23'),
('p06', 't01'),
('p06', 't02'),
('p06', 't28'),
('p07', 't32'),
('p07', 't15'),
('p07', 't02'),
('p08', 't04'),
('p08', 't32'),
('p09', 't04'),
('p09', 't09'),
('p10', 't31'),
('p10', 't03'),
('p11', 't28'),
('p11', 't05'),
('p12', 't30'),
('p12', 't32');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `post_id` varchar(20) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` varchar(3000) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`post_id`, `user_id`, `title`, `content`, `likes`) VALUES
('p01', 'aim_synchronyzer', 'Maps for CS', 'Any new maps for counter strike??', 5),
('p02', 'bittu', NULL, 'How to take headshots in Counter strike', 6),
('p03', 'deadly', 'Cs V/s Cod', 'Which is better Counter Strike or Call of duty??', 2),
('p05', 'deadly', 'New realeses', 'Any New release in Call Of Duty??', 0),
('p06', 'bittu', NULL, 'Which is better Counter Strike or Call of duty??', 1),
('p09', 'crystal_402', 'problem in Mission', 'image uploaded.... Can anyone help me with this??', 0),
('p10', 'crystal_402', NULL, 'Any New Bugs in Blur?', 2),
('p12', 'lovingyugs', 'New fixes', 'New fixes available in fifa 15??', 0);

-- --------------------------------------------------------

--
-- Table structure for table `questions_answers`
--

CREATE TABLE IF NOT EXISTS `questions_answers` (
  `post_id` varchar(20) NOT NULL,
  `ans_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions_answers`
--

INSERT INTO `questions_answers` (`post_id`, `ans_id`) VALUES
('p01', 'a91'),
('p02', 'a92'),
('p02', 'a93'),
('p03', 'a94'),
('p03', 'a95'),
('p05', 'a98'),
('p06', 'a99'),
('p06', 'a100'),
('p09', 'a103'),
('p10', 'a104'),
('p11', 'a105'),
('p11', 'a106');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `tag_id` varchar(20) NOT NULL,
  `tag_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tag_id`, `tag_name`) VALUES
('t01', 'Counter Strike'),
('t02', 'Call Of Duty'),
('t03', 'Blur'),
('t04', 'Assasino'),
('t05', 'Fifa 15'),
('t06', 'military_fight'),
('t07', 'Car race'),
('t08', 'Adventure '),
('t09', 'Mission'),
('t10', 'fifa 13'),
('t11', 'fifa 14'),
('t12', 'football'),
('t13', 'horror'),
('t14', 'skyland'),
('t15', 'muliplayer'),
('t16', 'single player'),
('t17', 'most rated'),
('t18', 'lowest rated'),
('t19', 'anime '),
('t20', 'zombie'),
('t21', 'sports'),
('t22', 'cricket'),
('t23', 'maps'),
('t24', 'big size games'),
('t25', 'new games'),
('t26', 'old'),
('t28', 'comparison'),
('t29', 'headshot'),
('t30', 'fixes'),
('t31', 'bugs'),
('t32', 'article');

-- --------------------------------------------------------

--
-- Table structure for table `user_descp`
--

CREATE TABLE IF NOT EXISTS `user_descp` (
  `user_id` varchar(20) NOT NULL DEFAULT '',
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `age` int(3) NOT NULL,
  `descp` varchar(200) DEFAULT NULL,
  `sex` char(1) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `pro_pic` varchar(255) DEFAULT NULL,
  `acc_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_descp`
--

INSERT INTO `user_descp` (`user_id`, `fname`, `lname`, `age`, `descp`, `sex`, `address`, `DOB`, `pro_pic`, `acc_date`) VALUES
('aim_synchronyzer', 'Tom', 'Hanks', 18, 'Born to play \r\n', 'M', NULL, '1995-05-16', NULL, '2015-09-21'),
('bittu', 'Dishank', 'Jain', 20, 'The First Player\r\n', 'M', NULL, '1995-03-10', NULL, '2015-08-15'),
('crystal_402', 'Crystina', 'Deep', 19, 'The one who plays more\r\n', 'F', NULL, '1996-05-12', NULL, '2015-09-14'),
('deadly', 'Prakhar', 'Gupta', 19, 'Death:-Not Today\r\n', 'M', NULL, '1995-07-20', NULL, '2015-08-30'),
('lovingyugs', 'Yugal', 'Jain', 20, 'Newbie', 'M', NULL, '1995-12-01', NULL, '2015-09-16');

-- --------------------------------------------------------

--
-- Table structure for table `user_followers`
--

CREATE TABLE IF NOT EXISTS `user_followers` (
  `user_id` varchar(20) NOT NULL,
  `followers` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_followers`
--

INSERT INTO `user_followers` (`user_id`, `followers`) VALUES
('deadly', 'aim_synchronyzer'),
('bittu', 'aim_synchronyzer'),
('lovingyugs', 'aim_synchronyzer'),
('aim_synchronyzer', 'lovingyugs'),
('deadly', 'lovingyugs'),
('crystal_402', 'lovingyugs'),
('aim_synchronyzer', 'crystal_402'),
('bittu', 'crystal_402'),
('deadly', 'crystal_402'),
('deadly', 'bittu'),
('lovingyugs', 'bittu'),
('crystal_402', 'deadly'),
('lovingyugs', 'deadly'),
('bittu', 'deadly'),
('bittu', 'aim_synchronyzer');

-- --------------------------------------------------------

--
-- Table structure for table `user_following`
--

CREATE TABLE IF NOT EXISTS `user_following` (
  `user_id` varchar(20) NOT NULL,
  `following` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_following`
--

INSERT INTO `user_following` (`user_id`, `following`) VALUES
('aim_synchronyzer', 'deadly'),
('aim_synchronyzer', 'bittu'),
('aim_synchronyzer', 'lovingyugs'),
('lovingyugs', 'aim_synchronyzer'),
('lovingyugs', 'deadly'),
('lovingyugs', 'crystal_402'),
('crystal_402', 'aim_synchronyzer'),
('crystal_402', 'bittu'),
('crystal_402', 'crystal_402'),
('crystal_402', 'deadly'),
('bittu', 'lovingyugs'),
('bittu', 'deadly'),
('deadly', 'crystal_402'),
('deadly', 'lovingyugs'),
('deadly', 'bittu');

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE IF NOT EXISTS `user_login` (
  `user_id` varchar(20) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`user_id`, `password`) VALUES
('aim_synchronyzer', '123456'),
('bittu', '123456'),
('crystal_402', '123456'),
('deadly', '123456'),
('lovingyugs', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `user_posts`
--

CREATE TABLE IF NOT EXISTS `user_posts` (
  `user_id` varchar(20) NOT NULL,
  `post_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_posts`
--

INSERT INTO `user_posts` (`user_id`, `post_id`) VALUES
('aim_synchronyzer', 'p01'),
('bittu', 'p02'),
('deadly', 'p03'),
('bittu', 'p04'),
('deadly', 'p05'),
('bittu', 'p06'),
('aim_synchronyzer', 'p07'),
('bittu', 'p08'),
('crystal_402', 'p09'),
('crystal_402', 'p10'),
('lovingyugs', 'p11'),
('lovingyugs', 'p12');

-- --------------------------------------------------------

--
-- Table structure for table `user_status`
--

CREATE TABLE IF NOT EXISTS `user_status` (
  `user_id` varchar(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_status`
--

INSERT INTO `user_status` (`user_id`, `status`) VALUES
('aim_synchronyzer', 1),
('bittu', 0),
('lovingyugs', 1),
('crystal_402', 1),
('deadly', 0);

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
  ADD KEY `post_id` (`post_id`), ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`post_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `questions_answers`
--
ALTER TABLE `questions_answers`
  ADD KEY `post_id` (`post_id`), ADD KEY `ans_id` (`ans_id`);

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
  ADD PRIMARY KEY (`user_id`);

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
ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
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
ADD CONSTRAINT `games_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`);

--
-- Constraints for table `games_played`
--
ALTER TABLE `games_played`
ADD CONSTRAINT `games_played_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`),
ADD CONSTRAINT `games_played_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`);

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
ADD CONSTRAINT `interest_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`),
ADD CONSTRAINT `interest_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`);

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
ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

--
-- Constraints for table `questions_answers`
--
ALTER TABLE `questions_answers`
ADD CONSTRAINT `questions_answers_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
ADD CONSTRAINT `questions_answers_ibfk_2` FOREIGN KEY (`ans_id`) REFERENCES `answers` (`ans_id`);

--
-- Constraints for table `user_descp`
--
ALTER TABLE `user_descp`
ADD CONSTRAINT `user_descp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

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
ADD CONSTRAINT `user_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`),
ADD CONSTRAINT `user_posts_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Constraints for table `user_status`
--
ALTER TABLE `user_status`
ADD CONSTRAINT `user_status_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
