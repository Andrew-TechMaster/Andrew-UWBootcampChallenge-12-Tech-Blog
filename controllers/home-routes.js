const router = require("express").Router();
// const Post = require("../models/Post");

// route to get all dishes
router.get("/", async (req, res) => {
  // const postData = await Post.findAll().catch((err) => {
  //   res.json(err);
  // });
  // const posts = postData.map((post) => post.get({ plain: true }));
  // res.json(posts);
  res.render("homepage");
});

// Dashboard route
// Use withAuth middleware...
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// Login route
router.get("/login", (req, res) => {
  // // If the user is already logged in, redirect to the homepage
  // if (req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }

  // Otherwise, render the 'login' template
  res.render("login");
});

// Signup route
router.get("/signup", (req, res) => {
  res.render("signup");
});

// route to get one post
router.get("/post/:id", async (req, res) => {
  try {
    // const postData = await Post.findByPk(req.params.id);
    // if (!postData) {
    //   res.status(404).json({ message: "No post with this id!" });
    //   return;
    // }
    // const post = postData.get({ plain: true });
    res.render("post");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
