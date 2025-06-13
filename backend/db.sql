CREATE DATABASE IF NOT EXISTS cosmetix;
USE cosmetix;

CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL UNIQUE,
  user_password CHAR(60) NOT NULL
);

-- Drop the existing traits table to recreate with correct schema
DROP TABLE IF EXISTS traits;

CREATE TABLE IF NOT EXISTS traits (
    traits_id INT AUTO_INCREMENT PRIMARY KEY,
    traits_user_id INT UNIQUE,
    traits_gender ENUM('male', 'female', 'other'),
    traits_skin_color ENUM('very_light', 'light', 'medium', 'olive', 'dark', 'very_dark'),
    traits_skin_type ENUM('normal', 'dry', 'oily', 'combination'),
    traits_sensible INT, -- Changed from boolean to int (1-10 scale)
    traits_age INT,
    traits_acneic ENUM('no_acne', 'mild_acne', 'moderate_acne', 'severe_acne'),
    traits_hair_color ENUM('black', 'brown', 'blonde', 'red', 'gray', 'other'),
    traits_hair_type ENUM('1a', '1b', '1c', '2a', '2b', '2c', '3a', '3b', '3c', '4a', '4b', '4c'),
    traits_hair_quality ENUM('oily', 'dry', 'normal', 'damaged', 'frizzy'),
    FOREIGN KEY (traits_user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS products (
  product_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  product_ingredients VARCHAR(1000) NOT NULL
);
