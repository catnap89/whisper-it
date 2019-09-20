var db = require("../models");

module.exports = function(app) {
  app.get("/api/posts/:id/comments", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Comment.findAll({
      include: [db.Post]
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // Not Sure if this is necessary, but I think it does not hurt to have one
  app.get("/api/posts/:id/comments/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Comment.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  app.post("/api/posts/:id/comments", function(req, res) {
    db.Comment.create(req.body).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  app.delete("/api/posts/:id/comments/:id", function(req, res) {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });
};
