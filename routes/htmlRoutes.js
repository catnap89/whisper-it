var db = require("../models");

module.exports = function(app) {
  // Load index page with Posts data
  app.get("/", function(req, res) {
    db.Post.findAll({}).then(function(dbPosts) {
      res.render("index", {
        msg: "Welcome!",
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
// render page post.handlebars to create comment on button click
  app.get("/create", function(req, res) {
    res.render("post.handlebars");
  });

  // render page comments handlebars to reply  to post on button

  app.get("/reply", function(req, res) {
    res.render("comments.handlebars");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
