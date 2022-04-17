import React from 'react';

type Props = {
  onClick: (e: React.MouseEvent) => void;
  completed: boolean;
  text: string;
};

const Todo = ({ onClick, completed, text }: Props) => (
  <li
    onClick={onClick}
    role="presentation"
    style={{
      textDecoration: completed ? 'line-through' : 'none',
      cursor: 'pointer',
    }}
  >
    {text}
  </li>
);

export default Todo;
