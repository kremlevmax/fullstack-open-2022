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

test("All blogs are returned", async () => {
  const allBlogs = await blogsInDB();
  const allBlogsTest = await api.get("/api/blogs").expect(200);
  console.log(allBlogsTest.body);
  expect(allBlogs).toHaveLength(allBlogsTest.body.length);
});

test("Specific blog can be viewed", async () => {
  const blogsFromDB = await blogsInDB();
  const firstBlog = blogsFromDB[0];
  const result = await api
    .get(`/api/blogs/${firstBlog.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const firstBlogData = JSON.parse(JSON.stringify(firstBlog));
  expect(result.body).toEqual(firstBlogData);
});

test("A valid blog can be added", async () => {
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

test("Blog without requiered field can't be added", async () => {
  const newBlog = {
    title: "True Metal",
    author: "Max Cavalera",
    likes: "666",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
  const blogs = await blogsInDB();
  expect(blogs).toHaveLength(initialBlogs.length);
});

test("Blogs list is returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("There two blogs in DB", async () => {
  const blogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(blogs.body).toHaveLength(initialBlogs.length);
});

test("A blog can be deleted", async () => {
  const blogsFromDB = await blogsInDB();
  const firstBlog = blogsFromDB[0];

  await api.delete(`/api/blogs/${firstBlog.id}`).expect(204);

  const newBlogsRequest = await blogsInDB();
  expect(newBlogsRequest).toHaveLength(initialBlogs.length - 1);
});

test("the first note is about HTTP methods", async () => {
  const blogs = await blogsInDB();
  const authors = blogs.map((blog) => blog.author);
  expect(authors).toContain("Max Queen");
});

afterAll(() => {
  mongoose.connection.close();
});
//
