CREATE Table plants(
    plantId VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    dob VARCHAR(15),
    details VARCHAR(4000),
    profileimage VARCHAR(260)
);

CREATE Table fertilizers(
    fertilizerId VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    composition VARCHAR(500),
    details VARCHAR(400),
    applyInterval int,
    imagename VARCHAR(260)
);

CREATE Table plantImages(
    imageId INT PRIMARY KEY AUTO_INCREMENT,
    plantId VARCHAR(50),
    name VARCHAR(260),
    FOREIGN KEY (plantId) REFERENCES plants(plantId) ON DELETE CASCADE
);