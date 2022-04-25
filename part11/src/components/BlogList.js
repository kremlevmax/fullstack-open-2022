import React from "react";
import BlogListItem from "./BlogListItem";

const BlogList = ({ forceUpadateBlogList, blogs }) => {
  const blogList = blogs
    .sort((a, b) => a.likes - b.likes)
    .map((blog, index) => (
      <BlogListItem
        forceUpadateBlogList={forceUpadateBlogList}
        blog={blog}
        key={index}
      />
    ));

  return (
    <div>
      <ul>{blogList}</ul>
    </div>
  );
};

export default BlogList;
