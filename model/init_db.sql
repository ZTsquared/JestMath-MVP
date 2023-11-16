--
-- Drop Tables
--


-- EVERYTHING BELOW IS COMMENTED OUT SO THAT I DON'T ACCIDENTALLY DELETE ALL MY DATA.  
-- YOU MUST UNCOMMENT EVERYTHING BELOW BEFORE RUNNING NPM RUN MIGRATE:



-- SET foreign_key_checks = 0;
-- DROP TABLE if exists users;
-- DROP TABLE if exists questions;
-- DROP TABLE if exists jokes;
-- DROP TABLE if exists usersJokes;
-- SET foreign_key_checks = 1;


-- -- Create Tables


-- CREATE TABLE questions(
--     id INT NOT NULL AUTO_INCREMENT, 
--     question VARCHAR(160) not null, 
--     answer VARCHAR(40) not null, 
--     PRIMARY KEY (id)
--     );

-- CREATE TABLE users(
--     id INT NOT NULL AUTO_INCREMENT, 
--     userName VARCHAR(20) not null, 
--     userAge INT not null,
--     balance INT DEFAULT 0, 
--     lifetimeTotal INT DEFAULT 0, 
--     PRIMARY KEY (id)
--     );

-- CREATE TABLE jokes(
--     id INT NOT NULL AUTO_INCREMENT, 
--     setUp VARCHAR(256) not null, 
--     punchLine VARCHAR(256) not null,
--     jokeType VARCHAR(20) not null,
--     PRIMARY KEY (id)
--     );


-- CREATE TABLE usersJokes(
--     id INT NOT NULL AUTO_INCREMENT, 
--     user_id INT NOT NULL,
--     joke_id INT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (joke_id) REFERENCES jokes(id) ON DELETE RESTRICT,
--     PRIMARY KEY (id)
--     );


-- -- Pre-populate data


-- INSERT INTO users (userName, userAge) values ("TestUser1", 8);
-- INSERT INTO users (userName, userAge) values ("TestUser2", 6);

-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("How do you get a squirrel to like you?", "Act like a nut!", "riddle");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("What do you get when you cross a snail with a porcupine?", "A slowpoke!", "riddle");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Why can't a leopard hide?", "Because he's always spotted!", "riddle");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("What do you call an illegally parked frog?", "Toad!", "riddle");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("What's red and smells like blue paint?", "Red paint!", "riddle");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("What did the pirate say when he turned 80?", "Aye matey!", "riddle");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Why don't the circus lions eat the clowns?", "Because they taste funny!", "riddle");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Why did the old man fall down the well?", "Becasue he couldn't see that well!", "riddle");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("What do you call a fake noodle?", "An impasta!", "riddle");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("What does a cloud wear under his raincoat?", "Thunderwear!", "riddle");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Teresa", "Theresa fly in my soup!", "knockknock");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Cozy", "Cozy who's knocking!", "knockknock");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Irma", "Irma little cold, can I come in?", "knockknock");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Livia", "Livia me alone!", "knockknock");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Bean", "Bean working really hard today!", "knockknock");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Juno", "Juno how to unlock this door?", "knockknock");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Luke", "Luke through the peephole and find out!", "knockknock");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Hal", "Hal will you know if you don't open the door?", "knockknock");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Orange", "Orange you gonna let me in?", "knockknock");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Lettuce", "Let us in, it's cold out here!", "knockknock");

-- INSERT INTO questions (question, answer) values ("93 / 3", "31");
-- INSERT INTO questions (question, answer) values ("2 * 3 * 4", "24");
-- INSERT INTO questions (question, answer) values ("95 + 150", "245");
-- INSERT INTO questions (question, answer) values ("1000 / 10", "100");
-- INSERT INTO questions (question, answer) values ("250 / 3", "125");
-- INSERT INTO questions (question, answer) values ("5 * 5 * 5", "125");
-- INSERT INTO questions (question, answer) values ("60 / 3", "20");
-- INSERT INTO questions (question, answer) values ("5 - 10", "-5");
-- INSERT INTO questions (question, answer) values ("120 - 35", "95");
-- INSERT INTO questions (question, answer) values ("75 * 2", "150");
-- INSERT INTO questions (question, answer) values ("45 - 100", "-55");
-- INSERT INTO questions (question, answer) values ("25 + 39", "64");
-- INSERT INTO questions (question, answer) values ("12 / 4", "3");
-- INSERT INTO questions (question, answer) values ("192 + 120", "312");
-- INSERT INTO questions (question, answer) values ("75 / 5", "15");
-- INSERT INTO questions (question, answer) values ("3000 / 2", "1500");
-- INSERT INTO questions (question, answer) values ("80 / 20", "4");