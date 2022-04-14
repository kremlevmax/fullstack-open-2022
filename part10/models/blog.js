const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: {
    type: String,
    unique: true,
    required: true,
  },
  likes: Number,
});

module.exports = mongoose.model("Blog", blogSchema);
