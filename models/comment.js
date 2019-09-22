module.exports = function(sequelize, DataTypes) {
  // Creating a database Table named "Posts"
  var Comment = sequelize.define("Comment", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    pin: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        len: [4, 6]
      }
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  Comment.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };
  return Comment;
};
