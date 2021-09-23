import React, { useState, useEffect } from "react";
import "./App.css";
import Todolist from "./components/Todolist";
import AddNewTodo from "./components/addTodo";

function App() {
  const [todos, setTodos] = useState([
    // {
    //   id: 1,
    //   name: "Hoc Reactjs",
    //   level: "Nguy cấp",
    // },
  ]);

  const convertLevel = ["Nguy cấp", "Chưa cần", "Ngay và luôn"];

  const [editing, setEditing] = useState(null);

  const [showAdd, setShowAdd] = useState(false);

  const [filterList, setFilterList] = useState(todos);

  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      const listTodo = JSON.parse(tasks);
      setTodos(listTodo);
    }
  }, []);

  const changeLevel = (todo) => {
    const index = todos.findIndex((item) => item.id === todo.id);
    const indexLevel = convertLevel.findIndex((lev) => lev === todo.level);
    todo.level = convertLevel[(indexLevel + 1) % convertLevel.length];
    const newTodo = [...todos];
    newTodo[index] = todo;
    setTodos(newTodo);
  };

  useEffect(() => {
    setFilterList(todos);
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
        <h1> To Do List - Team Web D19 </h1>
        <div id="container">
          
          {showAdd ? (
            <AddNewTodo
              todo={todos}
              setTodo={setTodos}
              setShowAdd={setShowAdd}
              setEditing={setEditing}
              editing={editing}
              level={convertLevel}
              setFilterList={setFilterList}
            />
          ) : null}
          <div id="left">
            <button
              id="addNewTodo"
              onClick={() => {
                setShowAdd(!showAdd);
              }}
            >
              Thêm công việc mới
            </button>
            <Todolist
              todo={todos}
              setTodo={setTodos}
              setEditing={setEditing}
              setShowAdd={setShowAdd}
              level={convertLevel}
              changeLevel={changeLevel}
              filterList={filterList}
              setFilterList={setFilterList}
            />
          </div>
        </div>
    </div>
  );
}

export default App;
