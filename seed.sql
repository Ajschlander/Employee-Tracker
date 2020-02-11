-- Deletes database if it already exists
DROP DATABASE IF EXISTS employee_tracker_db;

-- Creates database called employee_tracker_db.
CREATE DATABASE employee_tracker_db;

-- Tells mySQL to use employee_tracker_db for the following code.
USE employee_tracker_db;

-- Creates table used for storing employees
CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (employee_id)
);

-- Creates table used for storing roles
CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL NULL,
  department_id INT NULL,
  PRIMARY KEY (role_id)
);

-- Creates table used for storing departments
CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);

-- * Add departments, roles, employees
-- -- Using these as temp test values
-- -- Add empoloyees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Austin", "Schlander", 1, 2), ("Allison", "Schlander", 2, 3), ("Rick", "Schlander", 3, NULL);

-- Add a role
INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", 100, 1), ("Manager", 100000, 1), ("CEO", 200000, 1);

-- Add a department
INSERT INTO departments (name)
VALUES ("Research & Development"), ("Quality"), ("Human Resources");


