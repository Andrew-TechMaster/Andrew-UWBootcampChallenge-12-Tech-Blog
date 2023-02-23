const { Post } = require("../models");

const postData = [
  {
    title: "MVC Introduction (for beginners)",
    content:
      "MVC (Model-View-Controller) is a pattern in software design commonly used to implement user interfaces, data, and controlling logic. It emphasizes a separation between the software's business logic and display. This 'separation of concerns' provides for a better division of labor and improved maintenance.",
    user_id: 1,
  },
  {
    title: "Angular",
    content:
      "Angular is an open-source, JavaScript framework written in TypeScript. Google maintains it, and its primary purpose is to develop single-page applications. As a framework, Angular has clear advantages while also providing a standard structure for developers to work with. It enables users to create large applications in a maintainable manner. ",
    user_id: 2,
  },
  {
    title: "React",
    content:
      "The React.js framework is an open-source JavaScript framework and library developed by Facebook. It’s used for building interactive user interfaces and web applications quickly and efficiently with significantly less code than you would with vanilla JavaScript.",
    user_id: 2,
  },
  // {
  //   title: "What exactly is Node.js?",
  //   content:
  //     "Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more. Node.js is a back-end JavaScript runtime environment, that runs on the V8 JavaScript Engine, and executes JavaScript code outside a web browser.",
  //   user_id: 4,
  // },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
