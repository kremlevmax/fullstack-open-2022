const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name: name,
    username: username,
    passwordHash: passwordHash,
  });

  const savedUser = user.save();

  response.status(201).json(savedUser);
});

module.exports = userRouter;
