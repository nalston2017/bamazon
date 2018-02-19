-- Delets the bamazon DB if it exists --
DROP DATABASE IF EXISTS bamazon;
-- Create a database --
CREATE DATABASE bamazon;
-- Access Database --
USE bamazon;

-- Create product table
CREATE TABLE products (
  item_id INT(4) NOT NULL,
  product_name VARCHAR(75) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(5) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products
