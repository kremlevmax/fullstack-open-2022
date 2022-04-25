import React, { useState } from "react";
import blogServices from "../services/blogs";

const AddNewBlog = ({ upadateBlogList, user }) => {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [likes, setLikes] = useState("");

  const blogEntry = {
    title,
    author: user.name,
    url,
    likes,
  };

  const createBlogOnSubmitHandler = async (event) => {
    event.preventDefault();
    await blogServices.create(blogEntry);
    setTitle("");
    setURL("");
    setLikes("");
    upadateBlogList();
  };

  return (
    <form onSubmit={createBlogOnSubmitHandler}>
      <div>
        <span>Title:</span>
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <span>URL:</span>
        <input value={url} onChange={({ target }) => setURL(target.value)} />
      </div>
      <div>
        <span>Likes:</span>
        <input
          value={likes}
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  );
};

export default AddNewBlog;
