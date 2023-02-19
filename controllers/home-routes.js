const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// {==================== Route to get all posts | hompage.handlebars ====================}
router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [{ model: User }],
      order: [["date_created", "DESC"]],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data(posts) and session flag(req.session.logged_in) into template(hompage)
    // res.status(200).json(postData);
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// {==================== Route to get the one post | post.handlebars ====================}
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
    // ????why need spread...post????
    res.render("post", { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// {==================== Route to get user's dashboard | dashboard.handlebars ====================}
// Use withAuth middleware to prevent access to route
router.get("/dashboard", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    // res.status(200).json(user);
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// {==================== Route to get a single post with modified form (delete or update) | modify-post.handlebars ====================}
router.get("/dashboard/post/:id", async (req, res) => {
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

    // ????why need spread...post????
    res.render("modify-post", { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// {==================== Route to get login form | login.handlebars ====================}
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  // Otherwise, render the 'login' template
  res.render("login");
});

// {==================== Route to get signup form / signup.handlebars ====================}
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
