import { useCallback } from 'react';
import produce from 'immer';

import { useSetState } from '../state';

let nextTodoId = 0;

const useAddTodo = () => {
  const setState = useSetState();
  const addTodo = useCallback((text: string) => {
    setState((s) => produce(s, (draft) => {
      draft.todos.push({
        id: nextTodoId++,
        text,
        completed: false,
      });
    }));
  }, [setState]);
  return addTodo;
};

export default useAddTodo;
