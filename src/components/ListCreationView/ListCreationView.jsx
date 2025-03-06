import React, { useState } from "react";
import "./ListCreationView.css";
import ListItem from "../ListItem/ListItem";

const ListCreationView = ({
  lists,
  selectedLists,
  setIsListCreationMode,
  setLists,
  clearSelection,
}) => {

  //lists:  e.g. 
  // [{items: [{id: 'id1', list_number: 1}, {id:'id2', list_number: 1}], list_number: 1}, 
  // {items: [{id: 'id3', list_number: 2}, {id:'id4', list_number: 2}], list_number: 2}]

  // firstLists: {items: [{id: 'id1', list_number: 1}, {id:'id2', list_number: 1}], list_number: 1}
  const firstList = lists?.find(
    (list) => list.list_number === selectedLists?.[0]
  );

  // secondLists: {items: [{id: 'id3', list_number: 2}, {id:'id4', list_number: 2}], list_number: 2}
  const secondList = lists?.find(
    (list) => list.list_number === selectedLists?.[1]
  );

  const [firstListItems, setFirstListItems] = useState([...firstList.items]);
  const [secondListItems, setSecondListItems] = useState([...secondList.items]);
  const [newListItems, setNewListItems] = useState([]);

  const nextListNumber = Math.max(...lists.map((list) => list.list_number)) + 1;

  const moveItem = (item, fromList, setFromList, toList, setToList) => {
    setFromList(fromList.filter((i) => i.id !== item.id));
    setToList([...toList, item]);
  };

  const handleCancel = () => {
    setIsListCreationMode(false);
    clearSelection();
  };

  const handleUpdate = () => {
    if (newListItems.length === 0) {
      return;
    }

    const newList = {
      list_number: nextListNumber,
      items: newListItems,
    };

    const updatedLists = lists.map((list) =>
      list.list_number === firstList.list_number
        ? { ...list, items: firstListItems }
        : list.list_number === secondList.list_number
        ? { ...list, items: secondListItems }
        : list
    );

    setLists([...updatedLists, newList]);
    setIsListCreationMode(false);
    clearSelection();
  };

  return (
    <div className="list-creation-container">
      <div className="list-row">
        {/* First Selected List */}
        <div className="list-box">
          <h5>
            List {firstList.list_number} ( {firstListItems?.length} )
          </h5>
          {firstListItems.map((item) => (
            <ListItem key={item.id} item={item} movementButton rightButton onRightButtonClick={() => moveItem(
              item,
              firstListItems,
              setFirstListItems,
              newListItems,
              setNewListItems
            )}/>
          ))}
        </div>

        {/* New List (Middle) */}
        <div className="list-box">
          <h5>
            List {nextListNumber} ({newListItems?.length})
          </h5>
          {newListItems.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              movementButton
              leftButton
              rightButton
              onLeftButtonClick={() =>
                moveItem(
                  item,
                  newListItems,
                  setNewListItems,
                  firstListItems,
                  setFirstListItems
                )
              }
              onRightButtonClick={() =>
                moveItem(
                  item,
                  newListItems,
                  setNewListItems,
                  secondListItems,
                  setSecondListItems
                )
              }
            />
          ))}
        </div>

        {/* Second Selected List */}
        <div className="list-box">
          <h5>
            List {secondList.list_number} ({secondListItems?.length})
          </h5>
          {secondListItems.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              movementButton
              leftButton
              onLeftButtonClick={() =>
                moveItem(
                  item,
                  secondListItems,
                  setSecondListItems,
                  newListItems,
                  setNewListItems
                )
              }
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="buttons">
        <button onClick={handleCancel} className="cancel-btn">
          Cancel
        </button>
        <button onClick={handleUpdate} className="create-button">
          Update
        </button>
      </div>
    </div>
  );
};

export default ListCreationView;
