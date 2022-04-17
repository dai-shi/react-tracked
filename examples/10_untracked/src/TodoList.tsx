import React from 'react';

import { useTrackedState } from './store';
import TodoItem from './TodoItem';

const TodoList = () => {
  const state = useTrackedState();
  const { todos } = state;
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
