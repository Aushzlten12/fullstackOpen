import "./index.css";
import { useEffect, useState } from "react";
import { Blog } from "./components/Blog";
import { getAll, update, setToken, create } from "./services/blogs";
import { login } from "./services/login";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { ErrorMessage } from "./components/ErrorMessage";
import { Header } from "./components/Header";
import { FormNewBlog } from "./components/FormNewBlog";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialBlogs = await getAll();
        setBlogs(initialBlogs);
      } catch (error) {
        console.error("Error fetching initial blogs:", error);
        setErrorMessage("Error fetching blogs");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const blogCreated = await create({
        title,
        url,
      });
      setBlogs(blogs.concat(blogCreated));
      setUrl("");
      setTitle("");
    } catch (error) {
      setErrorMessage("Parameters not valid");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userCredentials = await login({
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userCredentials),
      );
      setToken(userCredentials.token);
      setUser(userCredentials);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Credentials not valid");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const aumentLikes = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const blogChanged = { ...blog, likes: blog.likes + 1 };
    try {
      const returnedBlog = await update(id, blogChanged);
      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)));
    } catch (error) {
      setErrorMessage(`Blog ${blog.title} was already remove from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setBlogs(blogs.filter((blog) => blog.id === id));
    }
  };

  const out = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <>
      <Header user={user} out={out} />
      {errorMessage !== null && <ErrorMessage errorMessage={errorMessage} />}
      {user === null && (
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user !== null && (
        <div>
          <FormNewBlog
            handleCreate={handleCreate}
            title={title}
            setTitle={setTitle}
            author={user.username}
            url={url}
            setUrl={setUrl}
          />
          <ul>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                title={blog.title}
                author={blog.author}
                url={blog.url}
                likes={blog.likes}
                aumentLikes={() => aumentLikes(blog.id)}
              />
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
