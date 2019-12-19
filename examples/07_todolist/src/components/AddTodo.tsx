import React, { useState } from 'react';

import useAddTodo from '../hooks/useAddTodo';

const AddTodo: React.FC = () => {
  const [text, setText] = useState('');
  const addTodo = useAddTodo();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) {
            return;
          }
          addTodo(text);
          setText('');
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
