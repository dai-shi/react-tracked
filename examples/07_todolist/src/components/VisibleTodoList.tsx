/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import useVisibleTodos from '../hooks/useVisibleTodos';
import useToggleTodo from '../hooks/useToggleTodo';
import Todo from './Todo';

const VisibleTodoList: React.FC = () => {
  const visibleTodos = useVisibleTodos();
  const toggleTodo = useToggleTodo();
  return (
    <ul>
      {visibleTodos.map((todo) => (
        <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
      ))}
    </ul>
  );
};

export default VisibleTodoList;
