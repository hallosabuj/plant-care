CREATE Table plants(
    plantId VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    dob VARCHAR(15),
    details VARCHAR(4000),
    profileimage VARCHAR(260),
    soilType VARCHAR(20)
);

CREATE Table fertilizers(
    fertilizerId VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    composition VARCHAR(500),
    details VARCHAR(400),
    available VARCHAR(10),
    profileImage VARCHAR(260)
);

CREATE Table plantImages(
    imageId INT PRIMARY KEY AUTO_INCREMENT,
    plantId VARCHAR(50),
    name VARCHAR(260),
    FOREIGN KEY (plantId) REFERENCES plants(plantId) ON DELETE CASCADE
);

CREATE Table NeededFertilizers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    plantId VARCHAR(50),
    fertilizerId VARCHAR(50),
    applyInterval INT,
    benefit VARCHAR(500),
    FOREIGN KEY (plantId) REFERENCES plants(plantId) ON DELETE CASCADE,
    FOREIGN KEY (fertilizerId) REFERENCES fertilizers(fertilizerId)
);

CREATE Table AppliedFertilizer(
    id INT AUTO_INCREMENT PRIMARY KEY,
    plantId VARCHAR(50),
    fertilizerId VARCHAR(50),
    appliedDate VARCHAR(20),
    FOREIGN KEY (plantId) REFERENCES plants(plantId) ON DELETE CASCADE,
    FOREIGN KEY (fertilizerId) REFERENCES fertilizers(fertilizerId)
);