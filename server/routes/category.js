const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../model/User");

router.post(
  "/createCategory",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { label, icon } = req.body;
    const response = await User.updateOne(
      { _id: req.user.id },
      { $set: { categories: [...req.user.categories, { label, icon }] } }
    );
    res.send({ response });
  }
);

router.put(
  "/updateCategory/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.send({ message: "updating category by id" });
  }
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.user);
    const categories = req.user.categories;
    const newCategories = categories.filter(
      (category) => category._id != req.params.id
    );

    const user = await User.updateOne(
      { _id: req.user.id },
      { $set: { categories: newCategories } }
    );
    res.json({ user });
  }
);

module.exports = router;
