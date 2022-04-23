import Search from "./components/Search";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import services from "./services/blogs";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    services.getAll().then((response) => setBlogs(response.data));
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [searchRequest, setSearchRequest] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userCredentials, setUserCredentials] = useState({});

  const searchOnChangeHandler = (event) => {
    setSearchRequest(event.target.value);
  };

  const usernameOnChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordOnChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const enterOnClickHandler = () => {
    setUserCredentials({ username, password });
    setUsername("");
    setPassword("");
  };

  const loginComponentProps = {
    username,
    usernameOnChangeHandler,
    password,
    passwordOnChangeHandler,
    enterOnClickHandler,
  };

  // console.log(JSON.stringify(userCredentials));

  const blogsList =
    searchRequest === ""
      ? blogs
      : blogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchRequest.toLowerCase())
        );

  return (
    <div className='App'>
      <LoginForm props={loginComponentProps} />
      <Search onChangeHandler={searchOnChangeHandler} />
      <BlogList blogs={blogsList} />
    </div>
  );
}

export default App;
