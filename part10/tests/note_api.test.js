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

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain("Suoer new boring blog");
});

test("note without content is not added", async () => {
  const newBlog = {
    title: "True Metal Blog",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
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
