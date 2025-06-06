create database if not exists cosmetix;

use cosmetix;

create table if not exists users (
  user_id int primary key auto_increment not null,
  user_name varchar(100) not null,
  user_email varchar(100) not null unique,
  user_password char(60) not null
);

create table if not exists traits (
    traits_id int auto_increment primary key,
    traits_user_id int unique,
    traits_gender enum('male', 'female', 'other'),
    traits_skin_color varchar(50),
    traits_skin_type enum('normal', 'dry', 'oily', 'mixed'),
    traits_sensible boolean,
    traits_age int,
    traits_acneic enum('no_acne', 'mild', 'severe'),
    traits_hair_color varchar(50),
    traits_hair_type enum('1a', '1b', '1c', '2a', '2b', '2c', '3a', '3b', '3c', '4a', '4b', '4c'),
    traits_hair_quality enum('oily', 'dry', 'mixed', 'normal'),
    foreign key (traits_user_id) references users(user_id)
);

create table if not exists products (
  product_id int primary key auto_increment not null,
  product_name varchar(100) not null,
  product_ingredients varchar(1000) not null
);
