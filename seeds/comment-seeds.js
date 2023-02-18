const { Comment } = require("../models");

const commentData = [
  {
    content: "mvc comment1...",
    user_id: 2,
    post_id: 1,
  },
  {
    content: "mvc comment2...",
    user_id: 3,
    post_id: 1,
  },
  {
    content: "angular comment1...",
    user_id: 1,
    post_id: 2,
  },
  {
    content: "angular comment2...",
    user_id: 3,
    post_id: 2,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
