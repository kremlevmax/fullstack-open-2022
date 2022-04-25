import React, { useState } from "react";
import Toggable from "./Toggable";
import blogServices from "../services/blogs";

const BlogList = ({ forceUpadateBlogList, blogs }) => {
  const [liked, setLiked] = useState(false);

  const addLike = async (event, blog) => {
    event.preventDefault();
    await blogServices.like(blog);
    forceUpadateBlogList();
  };

  const blogList = blogs.map((blog, index) => (
    <li key={index}>
      {blog.title}
      <Toggable buttonName={"Show Details"}>
        <span>
          {" "}
          by {blog.author}. URL: {blog.url} Total likes: {blog.likes}
        </span>{" "}
        <button onClick={(event) => addLike(event, blog)}>Like</button>{" "}
      </Toggable>
    </li>
  ));

  return (
    <div>
      <ul>{blogList}</ul>
    </div>
  );
};

export default BlogList;
