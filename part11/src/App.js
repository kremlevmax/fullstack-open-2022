import Search from "./components/Search";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import blogServices from "./services/blogs";
import loginServices from "./services/login";
import { useEffect, useState } from "react";
import AddNewBlog from "./components/AddNewBlog";

function App() {
  useEffect(() => {
    blogServices.getAll().then((response) => setBlogs(response.data));
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [searchRequest, setSearchRequest] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const searchOnChangeHandler = (event) => {
    setSearchRequest(event.target.value);
  };

  const loginOnSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });
      setUser(user);
      blogServices.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const loginComponentProps = {
    username,
    setUsername,
    password,
    setPassword,
    loginOnSubmitHandler,
  };

  const blogsList =
    searchRequest === ""
      ? blogs
      : blogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchRequest.toLowerCase())
        );

  return (
    <div className='App'>
      {!user && <LoginForm props={loginComponentProps} />}
      {user && (
        <div>
          <span>{user.name} is logged in</span>
        </div>
      )}
      {user && <AddNewBlog user={user} />}
      <Search onChangeHandler={searchOnChangeHandler} />
      <BlogList blogs={blogsList} />
    </div>
  );
}

export default App;
