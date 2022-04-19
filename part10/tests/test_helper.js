const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Makeup Blog",
    author: "Max Factor",
    url: "www.maxfactor.com",
    likes: "777",
  },
  {
    title: "Drag Blog",
    author: "Max Queen",
    url: "www.maxqueen.com",
    likes: "666",
  },
];

const nonExistentID = async () => {
  const blogItem = new Blog({
    title: "Pet Shop Good Boys",
    author: "Chewie Dogski",
    url: "www.goodboysbark.com",
    likes: "1000",
  });
  await blogItem.save();
  await blogItem.remove();
  return blogItem._id.toString();
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, nonExistentID, blogsInDB, usersInDB };
