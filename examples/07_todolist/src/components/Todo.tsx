import React from 'react';

type Props = {
  onClick: (e: React.MouseEvent) => void;
  completed: boolean;
  text: string;
};

const Todo: React.FC<Props> = ({ onClick, completed, text }) => (
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
