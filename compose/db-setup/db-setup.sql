CREATE DATABASE IF NOT EXISTS todoexpress;

CREATE USER IF NOT EXISTS 'todouser'@'%' IDENTIFIED BY 'todo2023';

GRANT SELECT, UPDATE, INSERT, DELETE ON todoexpress.* TO 'todouser'@'%';

FLUSH PRIVILEGES;

USE todoexpress;

CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    status VARCHAR(255) DEFAULT 'open'
);
USE todoexpress;

INSERT INTO todos (description) VALUES ("Gassigehen");
INSERT INTO todos (description) VALUES ("füße waschen");
INSERT INTO todos (description) VALUES ("aufpassen");

