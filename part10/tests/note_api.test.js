const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const { initialBlogs, nonExistentID, blogsInDB } = require("./test_helper");

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("a valid note can be added", async () => {
  const newBlog = {
    title: "Suoer new boring blog",
    author: "Max Blabling",
    url: "www.maxblalbabla.com",
    likes: "1",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await blogsInDB();
  const blogsTitles = blogs.map((blog) => blog.title);
  expect(blogs).toHaveLength(initialBlogs.length + 1);
  expect(blogsTitles).toContain("Suoer new boring blog");
});

test("note without content is not added", async () => {
  const newBlog = {
    title: "True Metal",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
  const blogs = await blogsInDB();
  expect(blogs).toHaveLength(initialBlogs.length);
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const blogs = await blogsInDB();
  expect(blogs).toHaveLength(initialBlogs.length);
});

test("the first note is about HTTP methods", async () => {
  const blogs = await blogsInDB();
  const authors = blogs.map((blog) => blog.author);
  expect(authors).toContain("Max Queen");
});

afterAll(() => {
  mongoose.connection.close();
});
