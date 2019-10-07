import * as React from 'react';
import { trackMemo } from 'react-tracked';

import { useDispatch, TodoType } from './store';

type Props = {
  todo: TodoType;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  trackMemo(todo);
  const dispatch = useDispatch();
  return (
    <li>
      {Math.random()}
      <input
        type="checkbox"
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

export default React.memo(TodoItem);
