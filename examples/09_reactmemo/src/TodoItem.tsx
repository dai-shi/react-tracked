import { memo } from 'react';

import { useDispatch } from './store';
import type { TodoType } from './store';

type Props = {
  todo: TodoType;
};

let numRendered = 0;

// eslint-disable-next-line react/display-name
const TodoItem = memo(({ todo }: Props) => {
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
});

export default TodoItem;
