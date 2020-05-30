DROP DATABASE crusine_db;

CREATE DATABASE crusine_db;

USE crusine_db;


-- ****The MySQL TABLES

CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT,
		firstname VARCHAR(20) NOT NULL,
		lastname VARCHAR(20) NOT NULL,
        phone VARCHAR(15) NOT NULL,
    email VARCHAR(45) NOT NULL,
    user_name VARCHAR(30) NOT NULL, 
    user_pass VARCHAR(30) NOT NULL,
    truck_id INT, 
    PRIMARY KEY (user_id)
);

CREATE TABLE trucks(
	truck_id INT NOT NULL AUTO_INCREMENT,
    truck_name VARCHAR(60) NOT NULL,
    user_id INT, 
    PRIMARY KEY (truck_id)
);

ALTER TABLE users
ADD FOREIGN KEY (truck_name) REFERENCES trucks(truck_name);

ALTER TABLE trucks
ADD FOREIGN KEY (user_name) REFERENCES users(user_name);


DROP TABLE IF EXISTS inventory;

CREATE TABLE inventory(
	inv_id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(60) NOT NULL,
    category VARCHAR(15) NOT NULL,
    quantity VARCHAR(60) NOT NULL,
    unit VARCHAR(10) NOT NULL,
    price VARCHAR(60) NOT NULL,
    truck_id INT, 
    PRIMARY KEY (inv_id),
    FOREIGN KEY (truck_id) REFERENCES trucks(truck_id)
);

ALTER TABLE inventory
ADD FOREIGN KEY (truck_id) REFERENCES trucks(truck_id);

CREATE TABLE expenses(
	exp_id INT NOT NULL AUTO_INCREMENT,
    expense_name VARCHAR(60) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    category VARCHAR(30) NOT NULL,
    truck_id INT, 
    PRIMARY KEY (exp_id),
    FOREIGN KEY (truck_id) REFERENCES trucks(truck_id)
);

ALTER TABLE expenses
ADD FOREIGN KEY (truck_id) REFERENCES trucks(truck_id);

CREATE TABLE todo(
	todo_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    body VARCHAR(90) NOT NULL,
    complete BOOLEAN NOT NULL,
    user_id INT, 
    truck_id INT, 
    PRIMARY KEY (todo_id),
    FOREIGN KEY (truck_id) REFERENCES trucks(truck_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

ALTER TABLE todo
ADD FOREIGN KEY (truck_id) REFERENCES trucks(truck_id);

ALTER TABLE todo
ADD FOREIGN KEY (user_id) REFERENCES users(user_id);
