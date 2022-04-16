const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      response.json(blog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
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
