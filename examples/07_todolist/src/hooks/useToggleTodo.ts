import { useCallback } from 'react';
import { produce } from 'immer';

import { useSetState } from '../state';

const useToggleTodo = () => {
  const setState = useSetState();
  const toggleTodo = useCallback((id: number) => {
    setState((s) => produce(s, (draft) => {
      const found = draft.todos.find((todo) => todo.id === id);
      if (found) {
        found.completed = !found.completed;
      }
    }));
  }, [setState]);
  return toggleTodo;
};

export default useToggleTodo;
