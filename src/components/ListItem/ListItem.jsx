import React from "react";
import "./ListItem.css";

const ListItem = ({
  item,
  movementButton = false,
  leftButton = false,
  rightButton = false,
  onLeftButtonClick = () => {},
  onRightButtonClick= () => {},
}) => {
  return (
    <div className="list-item">
      <h5 className="list-text">{item.name}</h5>
      <h5 className="list-text description">{item.description}</h5>
      {movementButton && (
        <div className={`movement-button-div ${rightButton && 'right-button-div'} ${leftButton && 'left-button-div'}`}>
          {leftButton && <button onClick={onLeftButtonClick} className="movement-button">←</button>}
          {rightButton && <button onClick={onRightButtonClick} className="movement-button">→</button>}
        </div>
      )}
    </div>
  );
};

export default ListItem;
