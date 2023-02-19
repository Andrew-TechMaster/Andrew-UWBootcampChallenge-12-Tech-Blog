const router = require("express").Router();
const { Comment } = require("../../models");

// route to create/add a comment
router.post("/", async (req, res) => {
  try {
    const postData = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      // post_id: req.params.id,
      post_id: req.body.post_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
