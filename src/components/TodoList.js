import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./../App.css";
import { BsCheckLg } from "react-icons/bs";




const TodoList = () => {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState('')

  //This function is used to add items 
  const handlAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    setNewTitle('');
    setNewDescription('');
  };
  //this code for delete item on Todo page and local storage
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    setTodos(reducedTodo);
  };

  //This for use send compeleted screan and create item look 

  const hanleCompleteTodo = index => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let compeletedOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      compeletedOn: compeletedOn
    }

    let updatedComleteArr = [...completedTodos];
    updatedComleteArr.push(filteredItem);
    setCompletedTodos(updatedComleteArr);
    handleDeleteTodo(index);

  };
  // for delete function work on completed page and local storage
  const handleDeleteCompletedTodo = index => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1); // Remove 1 element starting from the specified index

    setCompletedTodos(reducedTodo);
  }

  useEffect(() => {

    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    // for delete function work on completed page
    let sevedcompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));

    if (savedTodo) {
      setTodos(savedTodo);

      if (sevedcompletedTodos) {
        setCompletedTodos(sevedcompletedTodos);
      }
    }
  }, []);

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);

    setCurrentEditedItem(item);

  }
  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value }
    })

  }
  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value }
    })

  }
  const handleUpdateToDo = () => {
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
  }

  return (

    <div className='body'>
      <div className='container'>
    <div className='App'>
        <header class="main-header clearfix" role="header">
            <nav id="menu" class="main-nav" role="navigation">
                <ul class="main-menu">
                    <li><a href="#section1"><em>Home</em></a></li>
                    <li class="has-submenu"><a href="#section2"><em>About Us</em></a></li>
                </ul>
            </nav>
        </header>
    </div>
</div>
      <h1> ToDo List </h1>
      <div className='todo-wrapper'>
        <div className="todo-input">
          <div className="todo-input-item">

            <label>Title</label>
            <input type="text" value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?" />
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task Discription?" />
          </div>
          <div className="todo-input-item">
            <button type="button"
              onClick={handlAddTodo} className="primaryBtn">Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          > Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (

                  <div className='edit__wrapper' key={index}>
                    <input placeholder='Updated Title'
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title} />
                    <textarea placeholder='Updated Title'
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem.description} />
                    <button type="button"
                      onClick={handleUpdateToDo}
                      className="primaryBtn">Update</button>
                  </div>
                )

              } else {

                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete" />
                      <BsCheckLg className="check-icon"
                        onClick={() => hanleCompleteTodo(index)}
                        title="Completed?" />
                      <AiOutlineEdit className=' check-icon'
                        onClick={() => handleEdit(index, item)}
                        title='Edit?' />
                    </div>
                  </div>
                );
              }
            }
            )}
          {/* This cod for making copleted todolist */}
          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on : {item.compeletedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDeleteCompletedTodo(index)}
                    title="Delete?"
                  />
                </div>
              </div>
            )
          }
          )}
        </div>
      </div>

    </div>

  )
}

export default TodoList;
