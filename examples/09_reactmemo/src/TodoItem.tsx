import React from 'react';
import { memo } from 'react-tracked';

import { useDispatch, TodoType } from './store';

type Props = {
  todo: TodoType;
};

let numRendered = 0;

const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <li>
      numRendered: {++numRendered}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
      />
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.title}
      </span>
    </li>
  );
};

// export default React.memo(TodoItem); // Instead of React.memo
export default memo(TodoItem); // Use custom memo
