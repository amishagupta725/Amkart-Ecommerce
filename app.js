var express = require("express");
var app = express();
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt-nodejs");
var mysql = require("mysql");

app.set("view engine","ejs");
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'templerun4',
    database : 'ecart'
  });
connection.connect((err)=> {
    if(err){
        throw err;
    }
    console.log("MySql connected!");
});

app.get("/",function(req,res){
    res.render("landing");
});

//ROUTE FOR VARIOUS CATEGORIES

app.get("/electronics",function(req,res){
    const q = "SELECT * FROM Products where Category = 'Electronics'";
    connection.query(q,function(err,results){
        console.log(results);
        res.render("products",{data:results});
    });
});

app.get("/clothing",function(req,res){
    const q = "SELECT * FROM Products where Category = 'Clothing'";
    connection.query(q,function(err,results){
    res.render("products",{data:results});
});
});

app.get("/groceries",function(req,res){
    const q = "SELECT * FROM Products where Category = 'Groceries'";
    connection.query(q,function(err,results){
    res.render("products",{data:results});
    });
});

//ROUTE FOR SHOW PAGE OF A PARTICULAR ITEM

app.get("/:category/:id",function(req,res){
    var q = 'SELECT * FROM Products WHERE product_id = "' + req.params.id + '"' ;
    connection.query(q,function(err,results){
      console.log(results);
      res.render("show",{data:results[0]});
    });
});

app.listen(3000,function(){
    console.log("E-cart is running!");
});