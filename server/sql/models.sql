CREATE DATABASE plantcare;

CREATE TABLE `plants` (
  `plantId` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dob` varchar(15) DEFAULT NULL,
  `details` varchar(4000) DEFAULT NULL,
  `profileImage` varchar(260) DEFAULT NULL,
  `soilType` varchar(20) DEFAULT NULL,
  `numberId` int DEFAULT NULL,
  PRIMARY KEY (`plantId`)
);

CREATE TABLE `fertilizers` (
  `fertilizerId` varchar(50) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `composition` varchar(500) DEFAULT NULL,
  `details` varchar(400) DEFAULT NULL,
  `profileImage` varchar(260) DEFAULT NULL,
  `available` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`fertilizerId`)
);


CREATE Table plantimages(
    imageId INT PRIMARY KEY AUTO_INCREMENT,
    plantId VARCHAR(50),
    name VARCHAR(260),
    FOREIGN KEY (plantId) REFERENCES plants(plantId) ON DELETE CASCADE
);

CREATE Table neededfertilizers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    plantId VARCHAR(50),
    fertilizerId VARCHAR(50),
    benefit VARCHAR(500),
    applyInterval INT,
    FOREIGN KEY (plantId) REFERENCES plants(plantId) ON DELETE CASCADE,
    FOREIGN KEY (fertilizerId) REFERENCES fertilizers(fertilizerId)
);

CREATE Table appliedfertilizer(
    id INT AUTO_INCREMENT PRIMARY KEY,
    plantId VARCHAR(50),
    fertilizerId VARCHAR(50),
    appliedDate VARCHAR(20),
    FOREIGN KEY (plantId) REFERENCES plants(plantId) ON DELETE CASCADE,
    FOREIGN KEY (fertilizerId) REFERENCES fertilizers(fertilizerId)
);

CREATE Table repotting(
    plantId VARCHAR(50),
    repottingDate VARCHAR(20),
    FOREIGN KEY (plantId) REFERENCES plants(plantId) ON DELETE CASCADE
);

CREATE TABLE `pesticides` (
  `pesticideId` varchar(50) NOT NULL,
  `name` varchar(260) DEFAULT NULL,
  `composition` varchar(500) DEFAULT NULL,
  `details` varchar(400) DEFAULT NULL,
  `available` varchar(10) DEFAULT NULL,
  `profileImage` varchar(260) DEFAULT NULL,
  PRIMARY KEY (`pesticideId`)
);

CREATE Table appliedpesticide(
    id INT AUTO_INCREMENT PRIMARY KEY,
    plantId VARCHAR(50),
    pesticideId VARCHAR(50),
    appliedDate VARCHAR(20),
    FOREIGN KEY (plantId) REFERENCES plants(plantId) ON DELETE CASCADE,
    FOREIGN KEY (pesticideId) REFERENCES pesticides(pesticideId)
);

CREATE Table User(
    id VARCHAR(50) PRIMARY KEY,
    fname VARCHAR(50),
    mname VARCHAR(50),
    lname VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(20)
)

SELECT COUNT(*) from user where email='hallosabuj@gmail.com' and password='1234';
-- Delete all tables
DROP Table appliedfertilizer;
DROP Table appliedpesticide;
DROP Table plantimages;
DROP Table repotting;
DROP Table neededfertilizers;
DROP Table pesticides;
DROP Table plants;
DROP Table fertilizers;
DROP Table `user`;