import React, { forwardRef } from 'react';

import { useDispatch, TodoType } from './store';

type Props = {
  // FIXME why this complaints?
  // eslint-disable-next-line react/no-unused-prop-types
  todo: TodoType;
};

let numRendered = 0;

const TodoItem = React.memo(
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
