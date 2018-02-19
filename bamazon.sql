-- Delets the bamazon DB if it exists --
DROP DATABASE IF EXISTS bamazon;
-- Create a database --
CREATE DATABASE bamazon;
-- Access Database --
USE bamazon;

-- Create product table --
CREATE TABLE products (
  item_id INT AUTO_INCREMENT(4) NOT NULL,
  product_name VARCHAR(75) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(5) NOT NULL,
  PRIMARY KEY (id)
);

-- Ten Original Products --
INSERT INTO products
(product_name, department_name, price, stock_quantity)
VALUES
("Military Grade Gas Mask", "Prepper Supplies", 40, 60),
("Hazmat Suit", "Prepper Supplies", 100, 75),
("Fear and Loathing in Las Vegas", "Books", 16, 100),
("Ready Player One", )
