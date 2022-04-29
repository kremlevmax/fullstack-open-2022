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

blogRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    return response.json(updatedBlog);
  } catch (error) {
    console.log(error);
  }
  next();
});

blogRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  const user = request.user;

  try {
    const blog = await Blog.findById(id);
    if (blog && blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(id);
      response.status(200).end();
    } else {
      response
        .status(401)
        .json({ error: "You are not auhorized to delete this item" })
        .end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const blogData = request.body;
  const user = request.user;

  const blog = new Blog({
    title: blogData.title,
    author: blogData.author,
    url: blogData.url,
    likes: blogData.likes,
    user: user._id,
  });

  try {
    const savedBlogItem = await blog.save();
    user.blogs = user.blogs.concat(savedBlogItem._id);
    await user.save();
    response.status(201).json(savedBlogItem);
  } catch (exception) {
    next(exception);
  }
  next();
});

// blogRouter.put("/:id", async (request, response, next) => {
//   const id = request.params.id;
//   const blog = {
//     title: request.body.title,
//     author: request.body.author,
//     url: request.body.url,
//     likes: request.body.likes + 1,
//   };

//   try {
//     const oldBlog = await Blog.findById(id);
//     const updatedBlog = await Blog.findByIdAndUpdate(oldBlog.id, blog, {
//       new: true,
//     });
//     response.status(200).json(updatedBlog);
//   } catch (exception) {
//     next(exception);
//   }
// });

module.exports = blogRouter;
