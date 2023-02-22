const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// {==================== Route to create/add a post | POST [api/post] | called at public/js/dashboard.js ====================}
router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      // ...req.body,
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// {==================== Route to update a post | PUT [api/post/:id] | called at public/js/modify-post.js ====================}
router.put("/:id", withAuth, async (req, res) => {
  try {
    const post = await Post.update(
      {
        title: req.body.modified_title,
        content: req.body.modified_content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (post[0] === 0) {
      res.status(404).json({ message: "error happened!" });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// {==================== Route to delete a post | DELETE [api/post/:id] | called at public/js/modify-post.js ====================}
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
