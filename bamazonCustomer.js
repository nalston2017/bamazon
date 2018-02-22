var mysql = require("mysql");
var clear = require("clear");
var inquirer = require("inquirer");
var idNumber = 0;

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
  introduction();
});

var introduction() {
  inquirer.prompt({
    name: "question"
    message: "Welcome to Bamazon, would you like to see a list of our products?"
    choices: ["yes", "no"]
  }).then(function(answer) {
    if(answer.question.toLowerCase() === "yes") {
      productsList();
    } else {
      conclusion();
    }
  })
}

var productsList function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var productsArr = [];
    for (var i = 0; i < res.length; i++) {
      productsArr.push(
        res[i].item_id + "-" + res[i].product_name + " Price: " + res[i].price + " Quantity: " + res[i].stock_quantity);
      }
  });
}

var customerInquiry = function(productsList) {
  inquirer.prompt([{
      name: "product",
      message: "Please enter the Item ID of the item you would like to buy.",
      type: "input",
      validate: function(value) {
        if(isNan(value) === false && value >= 1 && value <= idNumber) {
          return true;
        }
        return false;
      }
    },
    {
      name: "total",
      message: "How many units of the product would you like to buy?",
      type: "input",
      validate: function(value){
        if(isNan(value) === false) {
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

var stock = function(param1, param2) {
  var query = "SELECT price, stock_quantity FROM products WHERE ?";
  connection.query(query, {item_id: customerPurchases}, function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      let itemPrice = res[i].price;
      let inStock = res[i].stock_quantity;
      if (res[i].stock_quantity >= param2) {
        
      }
    }
  })
  if(productsList.find(i => i.id === answers.product)) {
    var match = productsList.find((itemObject,index) => {
      if(itemObject.id === answers.productsList) {

      }
    });
  }
}

var conclusion = function() {
  console.log("Thanks again, see you next time.");
  connection.end();
}
