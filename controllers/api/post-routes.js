const router = require("express").Router();
const { Post } = require("../../models");

// route to create/add a post
router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    // const newProject = await Project.create({
    //   ...req.body,
    //   user_id: req.session.user_id,
    // });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // const dish = await Dish.update(
    //   {
    //     dish_name: req.body.dish_name,
    //     description: req.body.description,
    //     guest_name: req.body.guest_name,
    //     has_nuts: req.body.has_nuts,
    //   },
    //   {
    //     where: {
    //       id: req.params.id,
    //     },
    //   }
    // );
    // res.status(200).json(dish);
  } catch (err) {
    // res.status(500).json(err);
  }
});

module.exports = router;
