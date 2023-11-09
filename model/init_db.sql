--
-- Drop Tables
--

-- SET foreign_key_checks = 0;
-- DROP TABLE if exists questions;
-- SET foreign_key_checks = 1;

--
-- Create Tables
--

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