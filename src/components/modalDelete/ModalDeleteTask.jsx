import Card from "../card/Card";
import "./ModalDeleteTask.css";
import Button from "../button/Button";

export const ModalDeleteTask = ({ onDelete, onClose, id }) => {
  return (
    <Card>
      <div className="content">
        <h2 className="title">Sigur vrei sa stergi acest Task ?</h2>
        <div className="button-wrap">
          <Button onClick={() => onDelete(id)}>
            <p>Da</p>
          </Button>
          <Button onClick={onClose}>
            <p>Nu</p>
          </Button>
        </div>
      </div>
    </Card>
  );
};
