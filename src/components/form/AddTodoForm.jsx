import { useState } from "react";
import Button from "../button/Button";
import Card from "../card/Card";
import Input from "../input/Input";
import TextArea from "../input/TextArea";
import "./Form.css";

export const AddTodoForm = ({ addNewTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const handleTitleValue = (e) => {
    setNewTask((prevState) => ({ ...prevState, title: e.target.value }));
  };
  const handleDescriptionValue = (e) => {
    setNewTask((prevState) => ({ ...prevState, description: e.target.value }));
  };
  const resetForm = () => setNewTask({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTask(newTask);
    resetForm();
  };

  return (
    <Card>
      <h2>Create Todo</h2>
      <form onSubmit={handleSubmit}>
        <Input
          value={newTask.title}
          onChange={handleTitleValue}
          placeholder="Title"
          type="text"
        />
        <TextArea
          value={newTask.description}
          onChange={handleDescriptionValue}
          placeholder="Description"
        />
        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
};
