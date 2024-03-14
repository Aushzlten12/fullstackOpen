import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addToTodos, removeFromTodos } from "./store/slice";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import Todo from "./components/Todo";

const App = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  console.log(todos);

  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text === "") {
      return;
    }

    dispatch(
      addToTodos({
        id: Math.floor(Math.random() * 1000),
        text,
        status: "incomplete",
      }),
    );
  };

  const handleEdit = (id) => {
    const existingTodo = todos.find((todo) => todo.id === id);
    setText(existingTodo.text);
    dispatch(removeFromTodos(id));
  };

  return (
    <>
      <div className="app">
        <div className="content">
          <div className="header">
            <span className="title">Todo List</span>
          </div>
          <div className="add">
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              type="text"
            />
            <button onClick={handleAdd}>
              <BsPlusCircle />
              <span>Add</span>
            </button>
          </div>
          <div className="main">
            {todos.map((todo, index) => {
              return <Todo key={index} todo={todo} handleEdit={handleEdit} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
