var express = require('express');
//requiring express handlebars module 
var exphbs = require('express-handlebars');

var Products = require('./productsSold')
var products = new Products('./Nelisa Sales History.csv');

var app = express();
//rendering static files
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){ 
  res.render("index");
});

app.get("/products", function(req, res){

  //
  var listOfProducts = products.groupedItems();    
  var productList = [];
  for (key in listOfProducts){
    productList.push({
      name: key,
      qty: listOfProducts[key]
    });
  }//rendering product list to the server
  res.render('products', {products : productList});
});

app.get("/popular_product", function(req, res){

  var mostPopularProduct = products.mostPopular();
  res.render('popular_product', {product : mostPopularProduct});
});

app.get("/least_popular", function(req, res){

  var least_Popular = products.leastPopular();
  res.render('least_popular', {product: least_Popular});
});

app.get("/categories", function(req, res){

  var listCategories = products.numberOfEachCategorySold();
  res.render('categories', {categories : listCategories});

});


app.get("/most_popular_cat", function(req, res){

  var listOfCategories = products.category();
  var categoryList = [];
  
  for (key in listOfCategories){
    categoryList.push({
      catName: key,
      qty: listOfCategories[key]
    });
    res.render("most_popular_cat", {category : categoryList[0]})
  }
})




//app.use(express.static('Images'));

// create a route
//app.get('/', function (req, res) {      
  // I can execute any code when someone is doing something in the browser...
 //res.send('Hello World!');
//});

//app.get('/', function(req, res){
//res.send("Most popular products")
//})
// new route
app.get('/hello', function (req, res){
res.send('Hello CodeX!');
});

//start the server
var server = app.listen(3000, function () {

 var host = server.address().address;
 var port = server.address().port;

 console.log('Example app listening at http://%s:%s', host, port);

});