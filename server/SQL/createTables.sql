CREATE TABLE user(
    userId INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    email VARCHAR(60), passHash TEXT, 
    firstName VARCHAR(40), 
    lastName VARCHAR(60), 
    totalPoints INTEGER
);

CREATE TABLE challenge(
    challengeId INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    category VARCHAR(60),
    points INTEGER,
    chalNum INTEGER
);

CREATE TABLE scores(
    scoreId INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    challengeID INTEGER,
    userId INTEGER,
    pointsReceived INTEGER,
    FOREIGN KEY (challengeID) REFERENCES challenge(challengeID),
    FOREIGN KEY (userID) REFERENCES user(userId)
);