import React from "react";
import BlogListItem from "./BlogListItem";
import blogServices from "../services/blogs";

const BlogList = ({ forceUpadateBlogList, blogs, user }) => {
  const addLike = async (event, blog) => {
    event.preventDefault();
    const likes = blog.liked ? blog.likes - 1 : blog.likes + 1;
    const updatedBlog = {
      author: blog.author,
      id: blog.id,
      likes: likes,
      title: blog.title,
      url: blog.url,
      user: blog.user,
    };
    await blogServices.like(updatedBlog);
    blog.setLiked((liked) => !liked);
    forceUpadateBlogList();
  };

  const blogList = blogs
    .sort((a, b) => a.likes - b.likes)
    .map((blog, index) => (
      <BlogListItem
        forceUpadateBlogList={forceUpadateBlogList}
        blog={blog}
        user={user}
        key={index}
        addLike={addLike}
      />
    ));

  return (
    <div>
      <ul>{blogList}</ul>
    </div>
  );
};

export default BlogList;
