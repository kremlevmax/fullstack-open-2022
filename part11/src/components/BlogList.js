import React from "react";
import BlogListItem from "./BlogListItem";

const BlogList = ({ forceUpadateBlogList, blogs }) => {
  const blogList = blogs.map((blog, index) => (
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
