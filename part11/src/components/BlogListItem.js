import React, { useState } from "react";
import Toggable from "./Toggable";
import blogServices from "../services/blogs";

const BlogListItem = ({ forceUpadateBlogList, blog }) => {
  const [liked, setLiked] = useState(false);

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
  const buttonName = liked ? "Don't Like" : "Like";
  return (
    <li>
      {blog.title}
      <Toggable buttonName={"Show Details"}>
        <span>
          {" "}
          by {blog.author}. URL: {blog.url} Total likes: {blog.likes}
        </span>{" "}
        <button onClick={(event) => addLike(event, blog)}>{buttonName}</button>{" "}
      </Toggable>
    </li>
  );
};

export default BlogListItem;
