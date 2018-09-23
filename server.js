
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

var app = express();

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
  