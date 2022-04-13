const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/blogs");
  const authors = response.body.map((response) => response.author);
  expect(authors).toContain("Max Queen");
});

afterAll(() => {
  mongoose.connection.close();
});
