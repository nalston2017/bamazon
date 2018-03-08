var mysql = require("mysql");
var clear = require("clear");
var inquirer = require("inquirer");
var idNumber;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: db_password,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(connection.threadId);
  clear();
  idNumber();
  introduction();
});

function idNumber() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var idArray = [];
    for (let i = 0; i < res.length; i++) {
      idArray.push(res[i].department_id)
    }
    idNumber = idArray.length;
  });
  return idNumber;
}

var introduction = function() {
  inquirer.prompt({
    name: "question"
    message: "Welcome to Bamazon, would you like to see a list of our products?"
    choices: ["yes", "no"]
  }).then(function(answer) {
    if (answer.question.toLowerCase() === "yes") {
      productsList();
    } else {
      conclusion();
    }
  });
}

var productsList = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var productsArr = [];
    for (var i = 0; i < res.length; i++) {
      productsArr.push(
        res[i].item_id + "-" + res[i].product_name + " Price: " + res[i].price + " Quantity: " + res[i].stock_quantity);
    }
  });
}

function customerInquiry() {
  inquirer.prompt([{
      name: "product",
      message: "Please enter the Item ID of the item you would like to buy.",
      type: "input",
      validate: function(value) {
        if (isNan(value) === false && value >= 1 && value <= idNumber) {
          return true;
        }
        return false;
      }
    },
    {
      name: "total",
      message: "How many units of the product would you like to buy?",
      type: "input",
      validate: function(value) {
        if (isNan(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]).then(function(answer) {
    var customerPurchases = parseInt(answer.product);
    var inputQuantity = parseInt(answer.total);
    stock(customerPurchases, inputQuantity);
  });
}

function stock(param1, param2) {
  var query = "SELECT price, stock_quantity FROM products WHERE ?";
  connection.query(query, {
    item_id: param1
  }, function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      let inStock = res[i].stock_quantity;
      let itemPrice = res[i].price;

      if (res[i].stock_quantity >= param2) {
        updateParams(param1, param2, customerPurchases, inputQuantity);
        return true;
      } else {
        console.log(`Sorry we do not have that quantity in stock. Please select a lower quantity.`);
        purchase();
        return false;
      }
    }
  });
}

function updateParams(param1, param2, param3, param4) {
  var cart = parseInt(param2) * parseFloat(param4);
  var remainingStock = parseInt(param3) - parseInt(param2);
  console.log("\n Total: $" + cart);
  var query = connection.query("UPDATE products SET ? WHERE ?",
[{
  stock_quantity: remainingStock
},{
  item_id: param1
}], function(err, res) {
  console.log("The Stock has been updated to: " + remainingStock + "\n\n");
});
sales(param1, param2);
}

function sales(param1, param2) {
var query = "SELECT product_sales, purchased_price FROM products WHERE ?";
connection.query(query, {item_id:param1}, function(err, res) {
  if(err) throw err;
  for (let i = 0; i < res.length; i++) {
    let salesInDatabase = res[i].product_sales;
    let purchasePrice = res[i].purchased_price;

    var trackSales = (salesInDatabase + param2) * purchasePrice;
  }
  trackProductSales(param1, trackSales);
});
}

function trackProductSales(param1, param5){
  var query = connection.query("UPDATE products SET ? WHERE ?",
[{product_sales: param5},{item_id: param1}], function(err, res) {
  console.log("All sales are up to date for: " + param5 + "\n");
});
connection.end();
}

function

var conclusion = function() {
  console.log("Thanks again, see you next time.");
  connection.end();
}
