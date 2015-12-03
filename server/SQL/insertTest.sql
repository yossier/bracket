-- User
INSERT INTO user(email, firstName, lastName, totalPoints) VALUES ('raless@umich.edu', 'Becca', 'Lesser', 0);
INSERT INTO user(email, firstName, lastName, totalPoints) VALUES ('aaron@umich.edu', 'Aaron', 'Nussbaum', 0);

-- Challenge
INSERT INTO challenge(category, points, chalNum) VALUES ('Recursion', 20, 1);
INSERT INTO challenge(category, points, chalNum) VALUES ('Recursion', 30, 2);
INSERT INTO challenge(category, points, chalNum) VALUES ('DataStructures', 25, 1);

-- Scores
INSERT INTO scores(challengeID, userId, pointsReceived) VALUES (1, 1, 10);
INSERT INTO scores(challengeID, userId, pointsReceived) VALUES (1, 2, 14);
INSERT INTO scores(challengeID, userId, pointsReceived) VALUES (3, 1, 25);


-- Sample queries
SELECT 
    c.category, u.firstName, u.lastName, s.pointsReceived 
FROM 
    challenge c, user u, scores s 
WHERE 
    s.challengeId = c.challengeId AND u.userId = s.userId;
    
    
SELECT 
    c.category, u.firstName, u.lastName, s.pointsReceived 
FROM 
    challenge c, user u, scores s 
WHERE 
    s.challengeId = c.challengeId AND u.userId = s.userId AND u.firstName = "Becca";
    