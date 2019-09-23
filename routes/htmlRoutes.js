var db = require("../models");

module.exports = function(app) {
  // Load index page with Posts data
  app.get("/", function(req, res) {
    db.Post.findAll({}).then(function(dbPosts) {
      res.render("index", {
        msg: "Welcome !",
        // post will be used for handlebars
        post: dbPosts
      });
    });
  });

  // Load post page and pass in an post by id
  app.get("/post/:id", function(req, res) {
    db.Post.findOne({
      where: { id: req.params.id },
      include: [db.Comment]
    }).then(function(dbPosts) {
      res.render("post", {
        post: dbPosts
      });
    });
  });

  // Create Post
  app.get("/createpost", function(req, res) {
    db.Post.findAll({}).then(function(dbPosts) {
      res.render("createPost", {
        post: dbPosts
      });
    });
  });

  // Render faq page for any unmatched routes
  app.get("/faq", function(req, res) {
    res.render("faq");
  });

  //  Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
