import React, { useState, useEffect } from "react";
import ListContainer from "./components/ListContainer/ListContainer";
import Loader from "./components/Loader/Loader";
import FailureView from "./components/FailureView/FailureView";
import ListCreationView from "./components/ListCreationView/ListCreationView";
import "./App.css";
import axios from "axios";

const API_URL = "https://apis.ccbp.in/list-creation/lists";

const App = () => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedLists, setSelectedLists] = useState([]);
  const [isListCreationMode, setIsListCreationMode] = useState(false);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(API_URL);
      if (response.status !== 200) {
        throw new Error("Failed to fetch lists");
      }
      const lists_data = await response.data;

      // Grouping items by `list_number`
      // e.g. {1: [{id: 'id1', list_number: 1}, {id:'id2', list_number: 1}], 2: [{id: 'id3', list_number: 2}, {id:'id4', list_number: 2}]}
      const groupedLists = {};
      lists_data?.lists?.forEach((item) => {
        if (!groupedLists[item.list_number]) {
          groupedLists[item.list_number] = [];
        }
        groupedLists[item.list_number].push(item);
      });

      // Converting object to an array
      // e.g. [{items: [{id: 'id1', list_number: 1}, {id:'id2', list_number: 1}], list_number: 1}, {items: [{id: 'id3', list_number: 2}, {id:'id4', list_number: 2}], list_number: 2}]
      const formattedLists = Object.keys(groupedLists).map((key) => ({
        list_number: parseInt(key),
        items: groupedLists[key],
      }));

      setLists(formattedLists);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleListSelection = (listNumber) => {
    if (selectedLists.includes(listNumber)) {
      setSelectedLists(selectedLists.filter((num) => num !== listNumber));
    } else if (selectedLists.length < 2) {
      setSelectedLists([...selectedLists, listNumber]);
    } else {
      setErrorMessage(
        "*You should select exactly 2 lists to create a new list"
      );
    }
  };

  const clearSelection = () => {
    setSelectedLists([]);
  };

  const handleCreateNewList = () => {
    if (selectedLists.length !== 2) {
      setErrorMessage(
        "*You should select exactly 2 lists to create a new list"
      );
      return;
    }
    setIsListCreationMode(true);
    setErrorMessage("");
  };

  if (isLoading) return <Loader />;
  if (isError) return <FailureView onRetry={fetchLists} />;

  return (
    <div className="app-container">
      {!isListCreationMode ? (
        <>
          <h1 className="header-label">List Creation</h1>
          <button className="create-button" onClick={handleCreateNewList}>
            Create a new list
          </button>
          {errorMessage && <h5 className="error-text">{errorMessage}</h5>}
          <div className="lists-container">
            {lists.map((list) => (
              <ListContainer
                key={list.list_number}
                list={list}
                isSelected={selectedLists.includes(list.list_number)}
                onSelect={handleListSelection}
              />
            ))}
          </div>
        </>
      ) : (
        <ListCreationView
          lists={lists}
          selectedLists={selectedLists}
          setIsListCreationMode={setIsListCreationMode}
          setLists={setLists}
          clearSelection={clearSelection}
        />
      )}
    </div>
  );
};

export default App;
