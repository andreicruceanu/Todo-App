import React, { useState } from "react";
import Card from "./components/card/Card";
import TodoItem from "./components/todo-item/TodoItem";
import Button from "./components/button/Button";
import "./App.css";
import Modal from "./components/modal/Modal";
import { AddTodoForm } from "./components/form/AddTodoForm";

const TODOS_MOCK = [
  {
    id: 1,
    title: "Todo 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At id illo repellendus non maiores in pariatur aliquam iure fugit amet!",
    completed: false,
  },
  {
    id: 2,
    title: "Todo 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: false,
  },
  {
    id: 3,
    title: "Todo 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
  {
    id: 4,
    title: "Todo 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
];

function App() {
  const [addTaskModal, setAddTaskModal] = useState(false);

  const [todoList, setTodoList] = useState(TODOS_MOCK);

  const activeTodoList = todoList.filter((task) => task.completed === false);

  console.log(activeTodoList);

  const completeTodoList = todoList.filter((task) => task.completed === true);

  const handleOpenAddTaskModal = () => {
    setAddTaskModal(true);
  };
  const handleCloseAddTaskModal = () => {
    setAddTaskModal(false);
  };

  const handleClickCheckbox = (value, id) => {
    setTodoList((prevState) =>
      prevState.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: value,
          };
        }
        return task;
      })
    );
  };

  const addNewTask = (task) => {
    const newTask = {
      ...task,
      id: parseInt(todoList.length) + 1,
      completed: false,
    };
    setTodoList((prevState) => [...prevState, newTask]);

    setAddTaskModal(false);
  };

  return (
    <div className="App">
      <div className="app-container">
        <Modal isOpen={addTaskModal} onClose={handleCloseAddTaskModal}>
          <AddTodoForm addNewTask={addNewTask} />
        </Modal>
        <Card>
          <h1>My todos</h1>
          <Button onClick={handleOpenAddTaskModal}>Add +</Button>
          <div className="list-container">
            {activeTodoList.map((task) => (
              <TodoItem
                id={task.id}
                title={task.title}
                description={task.description}
                completed={task.completed}
                onCheckboxChange={handleClickCheckbox}
                key={task.id}
              />
            ))}
          </div>

          <div className="separator"></div>

          <h2>Completed</h2>
          <div className="list-container">
            {completeTodoList.map((task) => (
              <TodoItem
                id={task.id}
                completed={true}
                key={task.id}
                title={task.title}
                onCheckboxChange={handleClickCheckbox}
                description={task.description}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
