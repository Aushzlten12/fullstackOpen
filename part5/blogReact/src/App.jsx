import "./index.css";
import { useEffect, useState } from "react";
import { Blog } from "./components/Blog";
import { getAll, remove, update, setToken, create } from "./services/blogs";
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
    getAll()
      .then((initalBlos) => {
        setBlogs(initalBlos);
      })
      .catch((error) => {
        console.error("Error fetching inital blogs", error);
        setNotification("Error fetching blogs");
      });
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

  const handleRemove = (id) => {
    const blogRemoved = blogs.find((blog) => blog.id === id);
    remove(id)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setNotification(`${blogRemoved.title} has removed`);
        setColor("green");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch(() => {
        setNotification("Can't remove this blog");
        setColor("red");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  const aumentLikes = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const blogChanged = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    update(id, blogChanged)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)));
      })
      .catch(() => {
        setColor("red");
        setNotification(`Blog ${blog.title} was already remove from server`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
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
            {blogs
              .slice()
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => {
                const userHasCreateBlog = user.username === blog.author;
                console.log(userHasCreateBlog);
                return (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    createdByUser={userHasCreateBlog}
                    aumentLikes={() => aumentLikes(blog.id)}
                    remove={handleRemove}
                  />
                );
              })}
          </ul>
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
