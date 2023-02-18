const { Post } = require("../models");

const postData = [
  {
    title: "MVC Intro",
    content: "MVC Framework...Model, View, and Controller",
    user_id: 1,
  },
  {
    title: "Angular",
    content: "Angular is another front-end framework...",
    user_id: 2,
  },
  {
    title: "React",
    content: "React is another front-end framework...",
    user_id: 2,
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
