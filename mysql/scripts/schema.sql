CREATE DATABASE IF NOT EXISTS transactions;
USE transactions;

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount INT,
    description VARCHAR(255)
);

CREATE USER IF NOT EXISTS 'pavan'@'%' IDENTIFIED BY 'pavan@1';
GRANT ALL ON transactions.* TO 'pavan'@'%';
FLUSH PRIVILEGES;
