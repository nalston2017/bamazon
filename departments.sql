USE bamazon;

CREATE TABLE departments
(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(50) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  product_sales DECIMAL(10,2) DEFAULT 0,
  total_profit DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY (department_id)
);

INSERT INTO departments
(department_name, over_head_costs)
VALUES
("Books", 1000),
("Prepper Supplies", 270),
("Board Games", 150),
("DVDs". 40),
("Video Games", 250);

SELECT * FROM departments;
