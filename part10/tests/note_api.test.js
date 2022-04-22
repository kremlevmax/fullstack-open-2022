const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const {
  initialBlogs,
  nonExistentID,
  blogsInDB,
  usersInDB,
} = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

describe("User test. Already on user in DB", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    const passwordHash = await bcrypt.hash("testpassword", 10);
    const user = new User({ username: "testUser", passwordHash: passwordHash });
    await user.save();
  });

  test("Creating new user with a different name", async () => {
    const usersInBeggining = await usersInDB();
    const newUser = {
      name: "Max",
      username: "kremlevmax",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const usersAtEnd = await usersInDB();
    expect(usersAtEnd).toHaveLength(usersInBeggining.length + 1);
  });

  test("Login in created user", async () => {
    const loginCredentials = {
      username: "testUser",
      password: "testpassword",
    };

    const data = await api
      .post("/api/login")
      .send(loginCredentials)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Create a blog entry", async () => {
    const blogsInBeggining = await blogsInDB();
    const loginCredentials = {
      username: "testUser",
      password: "testpassword",
    };

    const data = await api.post("/api/login").send(loginCredentials);
    const token = data.body.token;
    const blogData = {
      title: "Test Blog",
      author: "Max",
      url: "www.testurl.com",
      likes: "111",
    };

    await api
      .post("/api/blogs/")
      .set("Authorization", "bearer " + token)
      .send(blogData)
      .expect(201);

    const blogsInTheEnd = await blogsInDB();
    expect(blogsInTheEnd).toHaveLength(blogsInBeggining.length + 1);
  });

  test("Delete blog by id", async () => {
    const blogsInBeggining = await blogsInDB();
    const loginCredentials = {
      username: "testUser",
      password: "testpassword",
    };

    const data = await api.post("/api/login").send(loginCredentials);
    const token = data.body.token;
    const blogData = {
      title: "Test Blog",
      author: "Max",
      url: "www.testurl.com",
      likes: "111",
    };

    const newData = await api
      .post("/api/blogs/")
      .set("Authorization", "bearer " + token)
      .send(blogData)
      .expect(201);

    const id = newData.body.id;
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", "bearer " + token)
      .expect(200);

    const blogsInTheEnd = await blogsInDB();
    expect(blogsInTheEnd).toHaveLength(blogsInBeggining.length);
  });

  test("Delete blog by wrong id", async () => {
    const blogsInBeggining = await blogsInDB();
    const loginCredentials = {
      username: "testUser",
      password: "testpassword",
    };

    const data = await api.post("/api/login").send(loginCredentials);
    const token = data.body.token;
    await api
      .delete(`/api/blogs/testwrongid`)
      .set("Authorization", "bearer " + token)
      .expect(400);

    const blogsInTheEnd = await blogsInDB();
    expect(blogsInTheEnd).toHaveLength(blogsInBeggining.length);
  });

  test("Delete blog wih wrong token", async () => {
    const blogsInBeggining = await blogsInDB();
    const loginCredentials = {
      username: "testUser",
      password: "testpassword",
    };

    const data = await api.post("/api/login").send(loginCredentials);
    const rightToken = data.body.token;
    const blogData = {
      title: "Test Blog",
      author: "Max",
      url: "www.testurl.com",
      likes: "111",
    };

    const secpondLoginCredentials = {
      username: "testUser2",
      password: "testpassword2",
    };

    await api.post("/api/users").send(secpondLoginCredentials).expect(201);
    const secondUserData = await api
      .post("/api/login")
      .send(secpondLoginCredentials);
    const wrongToken = secondUserData.body.token;

    const postedBlogData = await api
      .post("/api/blogs/")
      .set("Authorization", "bearer " + rightToken)
      .send(blogData)
      .expect(201);

    const id = postedBlogData.body.id;
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", "bearer " + wrongToken)
      .expect(401);

    const blogsInTheEnd = await blogsInDB();
    expect(blogsInTheEnd).toHaveLength(blogsInBeggining.length + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
//
