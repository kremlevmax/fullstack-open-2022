const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const blogData = request.body;

  const blog = new Blog({
    title: blogData.title,
    author: blogData.author,
    url: blogData.url,
    likes: blogData.likes,
  });
  try {
    const savedBlogItem = await blog.save();
    response.status(201).json(savedBlogItem);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
