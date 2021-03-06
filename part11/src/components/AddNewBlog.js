import React, { useState } from "react";
// import blogServices from "../services/blogs";
import PropTypes from "prop-types";

const AddNewBlog = ({ forceUpadateBlogList, user, createBlog }) => {
  AddNewBlog.propTypes = {
    forceUpadateBlogList: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };
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
    await createBlog(blogEntry);
    setTitle("");
    setURL("");
    setLikes("");
    forceUpadateBlogList();
  };

  return (
    <form onSubmit={createBlogOnSubmitHandler}>
      <div>
        <span>Title:</span>
        <input
          data-testid='textbox1'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <span>URL:</span>
        <input
          data-testid='textbox2'
          value={url}
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <div>
        <span>Likes:</span>
        <input
          data-testid='textbox3'
          value={likes}
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  );
};

export default AddNewBlog;
