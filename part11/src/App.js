import Search from "./components/Search";
import BlogList from "./components/BlogList";
import services from "./services/blogs";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    services.getAll().then((response) => setBlogs(response.data));
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [searchRequest, setSearchRequest] = useState("");

  const onChangeHandler = (event) => {
    setSearchRequest(event.target.value);
  };

  const blogsList =
    searchRequest === ""
      ? blogs
      : blogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchRequest.toLowerCase())
        );

  return (
    <div className='App'>
      <Search onChangeHandler={onChangeHandler} />
      <BlogList blogs={blogsList} />
    </div>
  );
}

export default App;
