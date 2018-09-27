var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var cheerio = require("cheerio");
var databaseUrl = "scraper";
var collections = ["scrapedData"];
var mongoose = require("mongoose");


var PORT = 3000;
// Require all models
var db = require("./models");
// Initialize Express
var app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/populatedb", { useNewUrlParser: true });
var exphbs = require("express-handlebars");
// Require request and cheerio. This makes the scraping possible
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articleScrapper", { useNewUrlParser: true });

// Listen on port 3000

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
  );
  app.set("view engine", "handlebars");
  
  // Routes
  require("./routes/apiRoutes")(app);
  require("./routes/htmlRoutes")(app);
  
  app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
    
  module.exports = app;
  