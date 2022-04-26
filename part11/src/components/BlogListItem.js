import React, { useState, useRef } from "react";
import Toggable from "./Toggable";
import blogServices from "../services/blogs";

const BlogListItem = ({ forceUpadateBlogList, blog, user }) => {
  const [liked, setLiked] = useState(false);

  const listItemDetailsRef = useRef();

  const addLike = async (event, blog) => {
    event.preventDefault();
    const likes = liked ? blog.likes - 1 : blog.likes + 1;
    const updatedBlog = {
      author: blog.author,
      id: blog.id,
      likes: likes,
      title: blog.title,
      url: blog.url,
      user: blog.user,
    };
    await blogServices.like(updatedBlog);
    setLiked((liked) => !liked);
    forceUpadateBlogList();
  };

  const deleteBlog = async (event, id) => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      event.preventDefault();
      await blogServices.deleteBlog(id);
      setLiked(false);
      forceUpadateBlogList();
      listItemDetailsRef.current.hideDetails();
    }
  };

  const buttonName = liked ? "Don't Like" : "Like";
  const isShownDeleteButton =
    user.id && user.id === blog.user.toString() ? true : false;
  return (
    <li>
      {blog.title}
      <Toggable buttonName={"Show Details"} ref={listItemDetailsRef}>
        <span>
          {" "}
          by {blog.author}. URL: {blog.url} Total likes: {blog.likes}
        </span>{" "}
        <button onClick={(event) => addLike(event, blog)}>{buttonName}</button>{" "}
        {isShownDeleteButton && (
          <button onClick={(event) => deleteBlog(event, blog.id)}>
            Delete
          </button>
        )}
      </Toggable>
    </li>
  );
};

export default BlogListItem;
