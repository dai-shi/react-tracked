import React from 'react';

import { useTrackedState } from './store';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const state = useTrackedState();
  const ref = React.useRef<HTMLInputElement>(null);
  const { todos } = state;
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem ref={ref} key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
