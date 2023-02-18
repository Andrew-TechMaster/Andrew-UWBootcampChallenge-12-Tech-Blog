const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// route to get all posts
router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [{ model: User }],
      order: [["date_created", "DESC"]],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    // res.status(200).json(postData);
    res.render("homepage", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get one post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: Comment, include: [{ model: User }] },
        { model: User },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No post with this id!" });
      return;
    }
    const post = postData.get({ plain: true });
    // res.status(200).json(postData);
    res.render("post", { ...post });
  } catch (err) {
    res.status(500).json(err);
  }
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

module.exports = router;
