const router = require("express").Router();
const blogRoutes = require("./post-routes");
const userRoutes = require("./user-routes");

router.use("/post", blogRoutes);
router.use("/user", userRoutes);

module.exports = router;
