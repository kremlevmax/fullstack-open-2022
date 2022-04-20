const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

userRouter.post("/", async (request, response, next) => {
  const { name, username, password } = request.body;
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "Password has to be at least 3 symbols long" });
  } else if (username.length < 3) {
    return response
      .status(400)
      .json({ error: "Username has to be at least 3 symbols long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name: name,
    username: username,
    passwordHash: passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = userRouter;
