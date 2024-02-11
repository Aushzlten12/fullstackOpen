import "./index.css";
import { useEffect, useState } from "react";
import { Blog } from "./components/Blog";
import { getAll, update, setToken, create } from "./services/blogs";
import { login } from "./services/login";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Notification } from "./components/Notification";
import { Header } from "./components/Header";
import { FormNewBlog } from "./components/FormNewBlog";
import { Togglable } from "./components/Togglable";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [color, setColor] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialBlogs = await getAll();
        setBlogs(initialBlogs);
      } catch (error) {
        console.error("Error fetching initial blogs:", error);
        setNotification("Error fetching blogs");
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

  const addBlog = (blogObject) => {
    create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
      })
      .catch(() => {
        setNotification("wrong parameters");
        setColor("red");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  const handleLogin = (userObject) => {
    login(userObject)
      .then((userCredentials) => {
        window.localStorage.setItem(
          "loggedBlogappUser",
          JSON.stringify(userCredentials),
        );
        setToken(userCredentials.token);
        setUser(userCredentials);
      })
      .catch(() => {
        setNotification("wrong username or password");
        setColor("red");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  const aumentLikes = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const blogChanged = { ...blog, likes: blog.likes + 1 };
    try {
      const returnedBlog = await update(id, blogChanged);
      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)));
    } catch (error) {
      setNotification(`Blog ${blog.title} was already remove from server`);
      setTimeout(() => {
        setNotification(null);
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
      {notification !== null && (
        <Notification notification={notification} color={color} />
      )}
      {user === null && <Login HandleLogin={handleLogin} />}
      {user !== null && (
        <div>
          <Togglable buttonLabel="New Blog">
            <FormNewBlog createBlog={addBlog} author={user.username} />
          </Togglable>
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
