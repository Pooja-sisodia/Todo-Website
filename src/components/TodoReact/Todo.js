import React, { useEffect, useState } from "react";
import "./style.css";

// GET DATA FROM LOCAL STORAGE
const getLocalData = () => {
  const lists = localStorage.getItem("TodoList");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editData, setEditData] = useState();
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (inputData.length === 0) {
      alert("please fill the data");
    }else if(inputData && toggleButton){ 
      setItems(
        items.map((currEle) =>{
          if(currEle.id === editData){
            return { ...currEle , name:inputData}
          }
          return currEle;

        })
      )

      setInputData([]);
      setEditData(null);
      setToggleButton(false);

  }else {
      const myInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myInputData]);
      setInputData("");
    }
  };

  // EDIT TODO LIST ITEMS
  const editItem = (index) => {
    const editListItems = items.find((currEle) => {
      return currEle.id === index;
    });
    setInputData(editListItems.name);
    setEditData(index);
    setToggleButton(true);
  };

  // DELETING ITEMS FROM TODO LIST
  const deleteItems = (index) => {
    const updatedItems = items.filter((currEle) => {
      return currEle.id !== index;
    });
    setItems(updatedItems);
  };

  // REMOVING ALL ITEMS FROM TODO LIST
  const RemoveAll = () => {
    setItems([]);
  };

  // SET LOCAL STORAGE DATA
  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.jpg" alt="TodoLogo" />
            <figcaption>Add Your List Here ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️Add Items"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* show items */}
          <div className="showItems">
            {items.map((currEle) => {
              return (
                <div className="eachItem" key={currEle.id}>
                  <h3>{currEle.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(currEle.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItems(currEle.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* show items */}

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={RemoveAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
