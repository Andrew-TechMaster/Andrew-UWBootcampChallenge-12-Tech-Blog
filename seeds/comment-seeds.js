const { Comment } = require("../models");

const commentData = [
  {
    content: "Nice intro!",
    user_id: 1,
    post_id: 1,
  },
  {
    content: "Thanks for sharring.",
    user_id: 2,
    post_id: 2,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
