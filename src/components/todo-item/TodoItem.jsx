import React from "react";
import "./TodoItem.css";
import Checkbox from "../checkbox/CheckBox";

const TodoItem = ({
  id,
  title,
  description,
  completed,
  onCheckboxChange,
  openModal,
}) => {
  const handleCheckboxChange = (value) => {
    if (onCheckboxChange) {
      onCheckboxChange(value, id);
    }
  };

  return (
    <div className={`todo-item ${completed && "todo-completed"}`}>
      <div className="todo-item-header">
        <div className="title-area">
          <Checkbox checked={!!completed} onChange={handleCheckboxChange} />

          <h4>{title}</h4>
        </div>
        <div>
          <i className="fa fa-pencil" aria-hidden="true"></i>
          <i
            className="fa fa-trash"
            onClick={() => openModal(id)}
            aria-hidden="true"
          ></i>
        </div>
      </div>

      <div className="separator"></div>

      <p className="description-text">{description}</p>
    </div>
  );
};

export default TodoItem;
