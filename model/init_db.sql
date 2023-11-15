--
-- Drop Tables
--



-- THE 3 LINES BELOW ARE COMMENTED OUT SO THAT I DON'T ACCIDENTALLY DELETE ALL MY DATA.
-- IF YOU WANT TO REFRESH YOUR DATABASE YOU WILL HAVE TO UNCOMMENT THEM
-- SET foreign_key_checks = 0;
-- DROP TABLE if exists questions;
-- SET foreign_key_checks = 1;


Create Tables


CREATE TABLE questions(
    id INT NOT NULL AUTO_INCREMENT, 
    question VARCHAR(160) not null, 
    answer VARCHAR(40) not null, 
    PRIMARY KEY (id)
    );

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT, 
    userName VARCHAR(20) not null, 
    userAge INT not null,
    balance INT DEFAULT 0, 
    lifetimeTotal INT DEFAULT 0, 
    PRIMARY KEY (id)
    );

CREATE TABLE jokes(
    id INT NOT NULL AUTO_INCREMENT, 
    setUp VARCHAR(256) not null, 
    punchLine VARCHAR(256) not null,
    jokeType VARCHAR(20) not null,
    PRIMARY KEY (id)
    );


CREATE TABLE usersJokes(
    id INT NOT NULL AUTO_INCREMENT, 
    user_id INT NOT NULL,
    joke_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (joke_id) REFERENCES jokes(id) ON DELETE RESTRICT,
    PRIMARY KEY (id)
    );
