import React from "react";
import Toggable from "./Toggable";

const BlogList = ({ blogs }) => {
  const blogList = blogs.map((blog, index) => (
    <li key={index}>
      {blog.title}
      <Toggable buttonName={"Show Details"}>
        <span>
          {" "}
          by {blog.author}. URL: {blog.url} Total likes: {blog.likes}
        </span>
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
