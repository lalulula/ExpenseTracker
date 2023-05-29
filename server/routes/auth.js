const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jwt secret string";
const passport = require("passport");
const categories = [
  { label: "travel", icon: "user" },
  { label: "investment", icon: "user" },
  { label: "shopping", icon: "user" },
  { label: "bills", icon: "user" },
  { label: "food", icon: "user" },
];
router.get("/", (req, res) => {
  res.send("API for authentication running");
});

router.post("/register", async (req, res) => {
  //get all form data
  const { firstName, lastName, email, password } = req.body;
  // check if user exists, has valid credentials
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    res.status(406).json({ message: "User with email already exists" });
    return;
  }
  // hash password
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  // store user
  const user = new User({
    email,
    firstName,
    lastName,
    password: hashedPassword,
    categories,
  });
  await user.save();
  res.status(201).json({ message: "User registered Successfully" });
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  //get all form data
  const { email, password } = req.body;
  // check if user exists, has valid credentials
  const user = await User.findOne({ email });
  //if the user does not exists
  if (!user) {
    res.status(406).json({ message: "User does not exist, register first" });
    return;
  }
  const checkPassword = await bcrypt.compareSync(password, user.password);
  if (!checkPassword) {
    res.status(406).json({ message: "Credential not found" });
    return;
  }
  //If the user credentials are correct, create a jwt token for user session info

  const data = { userId: user._id, username: user.username };
  const token = jwt.sign(data, JWT_SECRET);

  res.send({ message: "User successfully logged in", token, user });
});
router.get(
  "/getCurrentUser",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    // console.log("Current user is", req.user);
    res.json(req.user);
  }
);

module.exports = router;
