import { useState } from "react";
import Button from "../button/Button";
import Card from "../card/Card";
import Input from "../input/Input";
import TextArea from "../input/TextArea";
import "./Form.css";

export const EditTodoForm = ({ initialValue, onEditSubmit }) => {
  const [editTask, setEditTask] = useState({
    ...initialValue,
  });
  const handleTitleValue = (e) => {
    setEditTask((prevState) => ({ ...prevState, title: e.target.value }));
  };
  const handleDescriptionValue = (e) => {
    setEditTask((prevState) => ({ ...prevState, description: e.target.value }));
  };
  const resetForm = () => setEditTask({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onEditSubmit) {
      onEditSubmit(editTask);
    }
    resetForm();
  };

  return (
    <Card>
      <h2>Edit Todo</h2>
      <form onSubmit={handleSubmit}>
        <Input
          value={editTask.title}
          onChange={handleTitleValue}
          placeholder="Title"
          type="text"
        />
        <TextArea
          value={editTask.description}
          onChange={handleDescriptionValue}
          placeholder="Description"
        />
        <Button type="submit">Edit</Button>
      </form>
    </Card>
  );
};
