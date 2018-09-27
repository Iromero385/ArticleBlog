var db = require("./../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      var data = {
        articles:dbArticle
      }
      res.render("index", data);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
   
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
