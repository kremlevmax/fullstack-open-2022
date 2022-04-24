import Search from "./components/Search";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import blogServices from "./services/blogs";
import loginServices from "./services/login";
import { useEffect, useState } from "react";
import AddNewBlog from "./components/AddNewBlog";
import Notification from "./components/Notification";
import LoginBadge from "./components/LoginBadge";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [searchRequest, setSearchRequest] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [updateBlogList, setUpdateBlogList] = useState(false);

  const upadateBlogList = () => {
    setUpdateBlogList((updateBlogList) => !updateBlogList);
  };

  useEffect(() => {
    const getBlogList = async () => {
      try {
        const response = await blogServices.getAll();
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogList();
  }, [updateBlogList]);

  useEffect(() => {
    const userData = window.localStorage.getItem("loggedInUser");
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, []);

  const searchOnChangeHandler = (event) => {
    setSearchRequest(event.target.value);
  };

  const loginOnSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });
      setUser(user);
      blogServices.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
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
    setNotification,
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
      {user && <LoginBadge user={user} />}
      {user && (
        <AddNewBlog
          setNotification={() =>
            setUpdateBlogList((updateBlogList) => !updateBlogList)
          }
          upadateBlogList={() => upadateBlogList}
          user={user}
        />
      )}
      {notification && <Notification notification={notification} />}
      <Search onChangeHandler={() => searchOnChangeHandler} />
      <BlogList blogs={blogsList} />
    </div>
  );
}

export default App;
