import React from "react";

const BlogList = ({ blogs }) => {
  const blogList = blogs.map((blog, index) => (
    <li key={index}>
      {blog.title} by {blog.author}. URL: {blog.url} Total likes: {blog.likes}
    </li>
  ));

  return (
    <div>
      <ul>{blogList}</ul>
    </div>
  );
};

export default BlogList;
