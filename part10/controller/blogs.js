const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// const getToken = (request) => {
//   const authorizationHeader = request.get("authorization");
//   if (
//     authorizationHeader &&
//     authorizationHeader.toLowerCase().startsWith("bearer ")
//   ) {
//     return authorizationHeader.substring(7);
//   }
//   return null;
// };

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
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
  // const decodedToken = jwt.verify(request.token, process.env.SECRET);

  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "token missing or invalid" });
  // }

  const user = await User.findById(request.token.id);

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
});

blogRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes + 1,
  };

  try {
    const oldBlog = await Blog.findById(id);
    const updatedBlog = await Blog.findByIdAndUpdate(oldBlog.id, blog, {
      new: true,
    });
    response.status(200).json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
