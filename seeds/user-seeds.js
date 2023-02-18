const { User } = require("../models");

const userData = [
  {
    username: "Andrew",
    email: "andrew@gmail.com",
    password: "test1234",
  },
  {
    username: "John",
    email: "john@hotmail.com",
    password: "test1234",
  },
  {
    username: "Doe",
    email: "doe@yahoo.com",
    password: "test1234",
  },
  // {
  //   username: "Peter",
  //   email: "peter@gmail.com",
  //   password: "test1234",
  // }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
