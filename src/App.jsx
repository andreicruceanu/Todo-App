import React, { useEffect, useState } from "react";
import Card from "./components/card/Card";
import TodoItem from "./components/todo-item/TodoItem";
import Button from "./components/button/Button";
import "./App.css";
import Modal from "./components/modal/Modal";
import { AddTodoForm } from "./components/form/AddTodoForm";
import { ModalDeleteTask } from "./components/modalDelete/ModalDeleteTask";
import { EditTodoForm } from "./components/form/EditTodoFrom";

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

const getStoredValuesFromLocalStorage = () => {
  try {
    const storedItems = localStorage.getItem("todos");

    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    return [];
  }
};

function App() {
  const [todoList, setTodoList] = useState(getStoredValuesFromLocalStorage());

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const activeTodoList = todoList.filter((task) => task.completed === false);

  const completeTodoList = todoList.filter((task) => task.completed === true);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setDeleteMode(false);
    setEditMode(null);
  };

  const handleDeleteMode = (id) => {
    setSelectedTodoId(id);
    setDeleteMode(true);
    setIsOpenModal(true);
  };

  const handleEditMode = (id) => {
    const todoEdit = todoList.find((task) => task.id === id);
    setEditMode(todoEdit);
    setIsOpenModal(true);
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

  const handleDeleteTask = (id) => {
    setTodoList((prevState) => prevState.filter((task) => task.id !== id));
    setDeleteMode(false);
    setIsOpenModal(false);
  };

  const handleEditTask = (editTask) => {
    setTodoList((prev) =>
      prev.map((item) => {
        if (item.id === editTask.id) {
          return editTask;
        } else {
          return item;
        }
      })
    );
    setIsOpenModal(false);
    setEditMode(false);
  };

  const addNewTask = (task) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).slice(2, 10),
      completed: false,
    };
    setTodoList((prevState) => [...prevState, newTask]);

    setIsOpenModal(false);
  };

  return (
    <div className="App">
      <div className="app-container">
        <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
          {deleteMode ? (
            <ModalDeleteTask
              onClose={handleCloseModal}
              onDelete={handleDeleteTask}
              id={selectedTodoId}
            />
          ) : editMode ? (
            <EditTodoForm
              initialValue={editMode}
              onEditSubmit={handleEditTask}
            />
          ) : (
            <AddTodoForm addNewTask={addNewTask} />
          )}
        </Modal>
        <Card>
          <h1>My todos</h1>
          <Button onClick={handleOpenModal}>Add +</Button>
          <div className="list-container">
            {activeTodoList.map((task) => (
              <TodoItem
                id={task.id}
                title={task.title}
                description={task.description}
                completed={task.completed}
                onCheckboxChange={handleClickCheckbox}
                openModal={handleDeleteMode}
                onEdit={handleEditMode}
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
                title={task.title}
                description={task.description}
                completed={true}
                onCheckboxChange={handleClickCheckbox}
                openModal={handleDeleteMode}
                onEdit={handleEditMode}
                key={task.id}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
