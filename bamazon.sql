-- Delets the bamazon DB if it exists --
DROP DATABASE IF EXISTS bamazon;
-- Create a database --
CREATE DATABASE bamazon;
-- Access Database --
USE bamazon;

-- Create product table --
CREATE TABLE products (
  item_id INT(4) ZEROFILL AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(75) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(5) NOT NULL,
  PRIMARY KEY (item_id)
);

-- Ten Original Products --
INSERT INTO products
(product_name, department_name, price, stock_quantity)
VALUES
("Military Grade Gas Mask", "Prepper Supplies", 40, 60),
("Hazmat Suit", "Prepper Supplies", 100, 75),
("Fear and Loathing in Las Vegas", "Books", 16, 100),
("Ready Player One", "Books", 16, 42),
("Final Fantasy VII", "Video Games", 12, 10),
("Breaking Bad Season 1", "DVDs", 30, 10),
("Monopoly - The Walking Dead Edition", "Board Games", 100, 25),
("Solar Powered Water Purifier", "Prepper Supplies", 50, 25),
("Settlers of Catan", "Board Games", 50, 35),
("Kingdon Hearts II", "Video Games", 35, 50);

SELECT * FROM products;
