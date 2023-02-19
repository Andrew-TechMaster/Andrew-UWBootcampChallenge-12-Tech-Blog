const router = require("express").Router();
const blogRoutes = require("./post-routes");
const userRoutes = require("./user-routes");
const commentRoutes = require("./comment-routes");

router.use("/post", blogRoutes);
router.use("/user", userRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
