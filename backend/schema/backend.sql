CREATE DATABASE IF NOT EXISTS transactions;

USE transactions;

CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount INT,
  item VARCHAR(100)
);

INSERT INTO expenses (amount, item)
VALUES (200, 'travel');

