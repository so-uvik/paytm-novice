const express = require("express");
const userRouter = express.Router();

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
  const { success } = signupBody.safeParse(req.body);
  if (!success)
    return res.status(411).json({ message: "request format invalid" });
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser)
    return res.status(411).json({ message: "email already exists, signin" });

  res.status(200).json({ message: "All good!" });
});
module.exports = userRouter;
