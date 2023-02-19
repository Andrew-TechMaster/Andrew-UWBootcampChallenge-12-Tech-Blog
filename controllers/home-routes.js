const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// {==================== Route to get all posts | GET [http://localhost:3001/] | hompage.handlebars ====================}
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
    /*
    console.log(postData);
    console.log("------------------");
    console.log(posts);
    res.status(200).json(postData);
    */
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// {==================== Route to get the one post | GET [baseUrl/post/:id] | post.handlebars ====================}
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

    /*
    console.log(postData);
    console.log(post);
    res.status(200).json(postData);
    */
    res.render("post", { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// {==================== Route to get user's dashboard | GET [baseUrl/dashboard] | dashboard.handlebars ====================}
router.get(
  //  <---------------- route path ---------------->
  "/dashboard",
  //  <---------------- withAuth middleware to prevent access to route | redirect them to the login route ---------------->
  withAuth,
  //  <---------------- call back to get user and render page dashboard.handlebars ---------------->
  async (req, res) => {
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
  }
);

// {==================== Route to get a single post with modified form (delete or update) | GET [baseUrl/dashboard/post/:id] | modify-post.handlebars ====================}
router.get(
  //  <---------------- route path ---------------->
  "/dashboard/post/:id",
  //  <---------------- withAuth middleware to prevent access to route | redirect them to the login route ---------------->
  withAuth,
  //  <---------------- call back to get post and render modify-post.handlebars page ---------------->
  async (req, res) => {
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

      res.render("modify-post", { ...post, logged_in: req.session.logged_in });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// {==================== Route to get login form | GET [baseUrl/login] | login.handlebars ====================}
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  // Otherwise, render the 'login' template
  res.render("login");
});

// {==================== Route to get signup form | GET [baseUrl/signup] | signup.handlebars ====================}
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
