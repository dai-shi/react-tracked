import { useCallback } from 'react';
import { useDispatch } from 'react-tracked';
import produce from 'immer';

import { SetState } from '../state';

const useToggleTodo = () => {
  const setState = useDispatch<SetState>();
  const toggleTodo = useCallback((id: number) => {
    setState(s => produce(s, (draft) => {
      const found = draft.todos.find(todo => todo.id === id);
      if (found) {
        found.completed = !found.completed;
      }
    }));
  }, [setState]);
  return toggleTodo;
};

export default useToggleTodo;
