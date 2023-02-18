const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// {========== To create a One-To-Many relationship, the "hasMany" and "belongsTo" associations are used together ==========}
// One(User) - To - Many(Post)

// Post belongsTo User
/**
The A.belongsTo(B) association means that a One-To-One relationship
exists between A and B, with the foreign key being defined in the source model (A).
**/
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// User have many Post
/**
  The A.hasMany(B) association means that a One-To-Many relationship
  exists between A and B, with the foreign key being defined in the target model (B).
  **/
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});

// {========== To create a One-To-Many relationship, the "hasMany" and "belongsTo" associations are used together ==========}
// One(User) - To - Many(Comment)

// Comment belongsTo User
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// User have many Comment
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});

// {========== To create a One-To-Many relationship, the "hasMany" and "belongsTo" associations are used together ==========}
// One(Post) - To - Many(Comment)

// Comment belongsTo Post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// Post have many Comment
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});

module.exports = { User, Post, Comment };
