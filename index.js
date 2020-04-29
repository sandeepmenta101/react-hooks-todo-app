import React, { useState, useRef, useEffect } from 'react';
import { render } from 'react-dom';

import TodoList from './components/TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos';
function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log(storedTodos);
    if(storedTodos.length > 0) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  let handleTodo = (e) => {
    const name = todoNameRef.current.value;
    if(name === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: todos.length, name, completed: false}];
    });
    todoNameRef.current.value = null;
  }
  let toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  let handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }
    return (
      <>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input type="text" ref={todoNameRef}/>
        <button onClick={handleTodo}>Add Todo</button>
        <button onClick={handleClearTodos}>Clear Completed Todos</button>
        <div>{todos.filter(todo => !todo.completed).length} left todo</div>
      </>
    );
}

render(<App />, document.getElementById('root'));
