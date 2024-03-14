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
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Garfield/Jim Davis", "garfield-2.jpg", "comic");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Garfield/Jim Davis", "garfield-jim-davis-2022-05-01.webp", "comic");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Garfield/Jim Davis", "garfield-jim-davis-2022-05-07.webp", "comic");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("The Far Side/Gary Larsen", "far-side-1.jpg", "comic");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("The Far Side/Gary Larsen", "far-side-2.jpg", "comic");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("The Far Side/Gary Larsen", "far-side-3.jpg", "comic");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Family Circus/Bill & Jeff Keane", "family-circus-1.jpg", "comic");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Family Circus/Bill & Jeff Keane", "family-circus-2.jpg", "comic");
-- INSERT INTO jokes (setUp, punchLine, jokeType) values ("Family Circus/Bill & Jeff Keane", "family-circus-3.jpg", "comic");

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



-- DO NOT UNCOMMENT BELOW - COPIED FROM DATABASE FOR REFERENCE

-- +----+------------------------+--------+
-- | id | question               | answer |
-- +----+------------------------+--------+
-- |  1 | 17 + 48                | 65     |
-- |  2 | 92 + 72                | 164    |
-- |  3 | 35 * 2                 | 70     |
-- |  4 | 24 / 2                 | 12     |
-- |  5 | 93 / 3                 | 31     |
-- |  6 | 7 * 5                  | 35     |
-- | 10 | 290 / 2                | 145    |
-- | 13 | 75 + 13 + 120          | 208    |
-- | 16 | 2 * 2 * 2              | 8      |
-- | 19 | 3 * 46                 | 138    |
-- | 20 | 110 / 11               | 10     |
-- | 21 | 39 / 3                 | 13     |
-- | 23 | 756 + 39               | 795    |
-- | 24 | 68 - 32                | 36     |
-- | 25 | 170 - 94               | 76     |
-- | 26 | 22 * 3                 | 66     |
-- | 27 | 835 - 250              | 585    |
-- | 28 | 35 - 12                | 23     |
-- | 29 | 3 * 3 * 3              | 27     |
-- | 30 | 4 * 2 * 3              | 24     |
-- | 40 | 12 * 3                 | 36     |
-- | 41 | 8 * 8                  | 64     |
-- | 42 | 17 - 20                | -3     |
-- | 43 | 2 - 97                 | -95    |
-- | 45 | 45 - 100               | -55    |
-- | 46 | 9 - 15                 | -6     |
-- | 52 | 44 / 11                | 4      |
-- | 53 | 12 / 3                 | 4      |
-- | 54 | 963 / 3                | 321    |
-- | 55 | 42 / 2                 | 21     |
-- | 56 | 3 * 7 * 2              | 42     |
-- | 57 | 420 * 2                | 840    |
-- | 58 | 85 * 2                 | 170    |
-- | 59 | 23 * 3                 | 69     |
-- | 60 | 9 * 5                  | 45     |
-- | 61 | 27 / 3                 | 9      |
-- | 62 | 390 / 3                | 130    |
-- | 63 | 15 * 6                 | 90     |
-- | 64 | 50 / 12.5              | 4      |
-- | 65 | 18 / 4.5               | 4      |
-- | 66 | 72 / 3                 | 24     |
-- | 67 | 576 / 3                | 192    |
-- | 68 | 27 / 13.5              | 2      |
-- | 69 | 1500 / 2               | 750    |
-- | 70 | 360 / 40               | 9      |
-- | 71 | 34 + 92 +17            | 143    |
-- | 72 | 2468 / 2               | 1234   |
-- | 73 | 4 + 9 + 5 + 12 + 3     | 33     |
-- | 74 | 23 + 12 + 18           | 53     |
-- | 75 | 5 * 5 * 5              | 125    |
-- | 76 | 4 * 4 * 4              | 64     |
-- | 77 | 10 * 10 * 10 * 10 * 10 | 100000 |
-- | 78 | 2 * 3 * 4              | 24     |
-- | 79 | 8 * 6                  | 48     |
-- | 80 | 39 - 98                | -59    |
-- | 81 | 460 + 326              | 786    |
-- | 82 | 4 * 5 * 3              | 60     |
-- | 83 | 50 * 20                | 1000   |
-- | 84 | 15 / 2                 | 7.5    |
-- | 85 | 3 / 2                  | 1.5    |
-- | 86 | 9 / 2                  | 4.5    |
-- | 87 | 7 / 2                  | 3.5    |
-- | 88 | 11 / 2                 | 5.5    |
-- | 89 | 5 * 17                 | 85     |
-- | 90 | 3 / 3                  | 1      |
-- | 91 | 75 * 2                 | 150    |
-- | 92 | 45 - 17                | 28     |
-- | 93 | (5 + 10) / 3           | 5      |
-- +----+------------------------+--------+
