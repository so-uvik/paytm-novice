const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const z = require("zod");
const { User } = require("../db");

const signupBody = z.object({
  username: z.string().max(30).trim(),
  email: z.string().email().trim(),
  firstName: z.string().min(3).max(50).trim(),
  lastName: z.string().min(3).max(50).trim(),
  password: z.string().min(6).trim(),
});

userRouter.post("/signup", async (req, res) => {
  const { success, error } = signupBody.safeParse(req.body);
  if (!success) return res.status(411).json({ message: error });
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser)
    return res
      .status(411)
      .json({ message: "email already exists, signin instead" });

  const user = await User.create({
    email: req.body.email,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });

  const userId = user._id;

  const token = await jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({ message: "User created successfully", token: token });
});

module.exports = userRouter;
