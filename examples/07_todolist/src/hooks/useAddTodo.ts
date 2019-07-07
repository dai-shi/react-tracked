import { useCallback } from 'react';
import { useDispatch } from 'react-tracked';
import produce from 'immer';

import { SetState } from '../state';

let nextTodoId = 0;

const useAddTodo = () => {
  const setState = useDispatch<SetState>();
  const addTodo = useCallback((text: string) => {
    setState(s => produce(s, (draft) => {
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
