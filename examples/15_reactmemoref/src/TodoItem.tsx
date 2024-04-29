import { memo, forwardRef } from 'react';

import { useDispatch } from './store';
import type { TodoType } from './store';

type Props = {
  todo: TodoType;
};

let numRendered = 0;

const TodoItem = memo(
  forwardRef<HTMLInputElement, Props>(({ todo }, ref) => {
    const dispatch = useDispatch();
    return (
      <li>
        numRendered: {++numRendered}
        <input
          ref={ref}
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
  }),
);

export default TodoItem;
