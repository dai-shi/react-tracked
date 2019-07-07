import { useCallback } from 'react';
import { useDispatch } from 'react-tracked';
import produce from 'immer';

import { SetState } from '../state';

let nextTodoId = 0;

const useAddTodo = () => {
  const setState = useDispatch<SetState>();
  return useCallback((text: string) => {
    setState(s => produce(s, (draft) => {
      draft.todos.push({
        id: nextTodoId++,
        text,
        completed: false,
      });
    }));
  }, [setState]);
};

export default useAddTodo;
