import React from "react";
import ListItem from "../ListItem/ListItem";
import "./ListContainer.css";

const ListContainer = ({ list, isSelected, onSelect }) => {
  const onSelectList = () => {
    onSelect(list.list_number);
  };

  return (
    <div className={`list-container ${isSelected ? "selected" : ""}`}>
      <div className="list-header" onClick={onSelectList}>
        <input type="checkbox" checked={isSelected} onChange={onSelectList} />
        <h5 className="list-heading">List {list.list_number}</h5>
      </div>
      <div className="item-container">
        {list.items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ListContainer;
