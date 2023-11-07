--
-- Drop Tables
--

SET foreign_key_checks = 0;
-- DROP TABLE if exists questions;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE questions(
    id INT NOT NULL AUTO_INCREMENT, 
    question VARCHAR(160) not null, 
    answer VARCHAR(40) not null, 
    PRIMARY KEY (id)
    );
