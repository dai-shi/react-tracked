import { useRef } from 'react';

import { useTrackedState } from './store';
import TodoItem from './TodoItem';

const TodoList = () => {
  const state = useTrackedState();
  const ref = useRef<HTMLInputElement>(null);
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
