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
    message: "What would you like to check today?"
    choices: ["View Products for Sale",
      "View Low Inventory Less than 35 items in stock",
      "Add to Inventory Quantity",
      "Add New Product"
    ]
  }).then(function(answer) {
    switch (answer.choice) {
      case "View Products for Sale":
        viewProducts();
        break;
      case "View Low Inventory Less than 35 items in stock":
        inventory();
        break;
      case "Add to Inventory Quantity":
        viewProducts();
        addInventory();
        break;
      case "Add New Product":
        addProduct();
        break;
    }
  });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].item_id + "Product Name: " + res[i].product_name + "Price: " + res[i].price)
    }
  });
  connection.end();
};

function inventory() {
connection.query("SELECT * FROM products WHERE stock_quantity <= 35", function(err, res) {
if (err) throw err;
for (let i = 0; i < res.length; i++) {
  console.log(res[i].item_id + "- Product Name: " + res[i].product_name + " Price: " + res[i].price + "\n");
}
});
connection.end();
}

function addInventory() {
  inquirer.prompt([{
      name: "item",
      type: "input",
      message: "Enter the Item ID of the product you want to update. \n\n",
    },
    {
      name: "quantity",
      type: "input",
      message: "Please enter the new quantity."
      validate: function(value) {
        if (isNan(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]).then(function(answer) {
    var itemID = answer.item;
    var quantity = parseInt(answer.quantity);
    var query = connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: quantity
      },
      {
        item_id: itemID
      }
    ], function(err, res) {
      if (err) throw err;
      console.log("Products have been added.\n");
    });
  })
  connection.end();
};

function addProduct() {
  inquirer.prompt([{
      name: "department",
      type: "input",
      message: "Please enter the department you would like to add product to."
    },
    {
      name: "item",
      type: "input",
      message: "Please enter the name of the item you would like to increase the inventory of."
    }, {
      name: "price",
      type: "input",
      message: "Please enter the new sell price. Format - 99.99",
      validate: function(value) {
        if (isNan(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "quantity",
      type: "input",
      message: "Enter the quantity/stock.",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "purchasePrice",
      type: "input",
      message: "Please enter the wholesale price.",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }]).then(fuinstanction(answer){
var addedItem = answer.item;
var deptItem = answer.department.toLowerCase();
var newPrice = parseFloat(answer.price);
var newQuantity = parseInt(answer.quantity);
var newPurchasePrice = parseFloat(answer.purchasePrice);
departments(addedItem, deptItem, newPrice, newQuantity, newPurchasePrice);
    })
    connection.end();
};

function departments(addedItem, deptItem, newPrice, newQuantity, newPurchasePrice) {
connection.query("SELECT * FROM departments", function(err, res){
  if(err) throw err;
  var array = [];
  for (let i = 0; i < array.length; i++) {
    array[i].push(res[i].department_name);
  }
  if(array.includes(deptItem)){
    var query = connection.query("INSERT INTO products SET ?",
  {
    product_name: addedItem,
    department_name: deptItem,
    price: newPrice,
    stock_quantity: newQuantity,
    purchasePrice: newPurchasePrice
  }, function(err, res) {
    if(err) throw err;
    console.log("Changes have been added.\n");
  });
} else {
  console.log("The changes have not made. Please check the input data for errors.");
}
})
connection.end();
};
