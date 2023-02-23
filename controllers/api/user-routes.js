const router = require("express").Router();
const { User } = require("../../models");

// // {==================== only for testing ====================}
// router.get("/login", async (req, res) => {
//   res.send("This is route /api/user/login");
// });

// {==================== Route to login and create session & cookie | POST [api/user/login] | called at public/js/login.js ====================}
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    // const validPasswordForSeed = await (req.body.password ===
    //   userData.dataValues.password);

    // if (!validPassword && !validPasswordForSeed) {
    if (!validPassword) {
      // console.log(userData);
      // console.log(userData.dataValues.password);
      // console.log(req.body.password);
      // console.log(req.body.password === userData.dataValues.password);
      // console.log(userData.checkPassword(req.body.password));

      res.status(400).json({
        message: `User:${userData.dataValues.username}, you have entered an incorrect password. Please try again.`,
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// {==================== Route to signup (save at User tables) and create session | POST [api/user/signup] | called at public/js/signup.js ====================}
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// {==================== Route to logout and destroy session | POST [api/user/logout] ====================}
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
