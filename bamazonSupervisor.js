var mysql = require("mysql");
var clear = require("clear");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "Admin",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(connection.threadId);
  clear();
  introduction();
});

function introduction() {
  inquirer.prompt({
    name: "choice",
    type: "list",
    message: "What would you like to do?",
    choices: ["View Product Sales by Department", "Create New Department"]
  }).then(function(answer) {
    switch (answer.choice) {
      case "View Product Sales by Department":
        totalSales();
        break;
      case "Create New Deparment":
        createDepartment();
        break;
    }
  });
}

function totalSales() {
  connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS product_sales",
    frunction(err, res) {
      for (var i = 0; i < res.length; i++) {
        let profit = res[i].product_sales - res[i].over_head_costs;
        let overHeadCosts = res[i].over_head_costs;
        let productSales = parseFloat(res[i].product_sales);
        let dept = res[i].department_name;
        Math.sign(profit);
        updateDept(profit, overHeadCosts, productSales, dept);
        console.log(
          "Dept_ID: " + res[i].department_id + " Dept Name: " + dept + " Over Head Cost: " + overHeadCosts + " Product Sales: " + productSales + " Profit: " + profit);
      );
    }
  });
}

function updateDept(profit, overHeadCosts, productSales, dept) {
  var query = connection.query("UPDATE departments SET ? WHERE ?",
[{department_name: dept}, {over_head_costs: overHeadCosts}, {product_sales: productSales}, {total_profit: profit}],
function(err, res) {
  if (err) throw err;
  console.log("Departments have been updated.\n");
});
}

function createDepartment() {
  inquirer.prompt([{
    name: "create",
    type: "input",
    message: "What department would you like to create?"
  }, {
    name: "item",
    type: "input",
    message: "What item would you like to add?"
  }, {
    name: "wholeprice",
    type: "input",
    message: "What is the wholesale price? Format ex. 99.99",
    validate: function(value) {
      if (isNan(value) === false) {
        return true;
      }
      return false;
    }
  }, {
    name: "price",
    type: "input",
    message: "What is the selling price be? Format ex. 99.99",
    validate: function(value) {
      if (isNan(value) === false) {
        return true;
      }
      return false;
    }
  }. {
    name: "quantity",
    type: "input",
    message: "What is the quantity you would like to add?",
    validate: function(value) {
      if (isNan(value) === false) {
        return true;
      }
      return false;
    }
  }]).then(function(answer) {
    var dept = answer.create;
    var item = answer.item;
    var wholeSale = parseInt(answer.wholeprice);
    var price = parseInt(answer.price);
    var quantity = parseInt(answer.quantity);
    var ohc = totalSalesNumber(wholeSale, quantity);
    var query = connection.query("INSERT INTO departments SET ?", {
      department_name: dept,
      over_head_costs: ohc,
      product_sales: 0.0,
      total_profit: 0.0
    }, function(err, res) {
      if (err) throw err;
      console.log("Department has been created.\n");
    });
    var newquery = connection.query("INSERT INTO products SET ?", {
      product_name: item,
      department_name: create,
      price: price,
      stock_quantity: quantity,
      purchased_price: wholeSale,
      product_sales: 0
    }, function(err, res) {
      if (err) throw err;
      console.log("Changes have been made to the database.\n");
    });
  });
}

function totalSalesNumber(param1, param2) {
  var salesNum = param1 * param2;
  return salesNum;
}
