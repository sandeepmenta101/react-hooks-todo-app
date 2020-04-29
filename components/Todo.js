import React from 'react';
import '../style.css';

export default function Todo({todo, toggleTodo}){
  let handleTodoClick = () => {
    toggleTodo(todo.id);
  }

  return(<div>
  <label>
    <input type="checkbox" checked={todo.completed} onChange={handleTodoClick}/>
    <span className={todo.completed ? 'striked' : ''}>{todo.name}</span>
  </label>
</div>)
}