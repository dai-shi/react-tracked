import { useState } from 'react';

export type VisibilityFilterType =
  | 'SHOW_ALL'
  | 'SHOW_COMPLETED'
  | 'SHOW_ACTIVE';

export type TodoType = {
  id: number;
  text: string;
  completed: boolean;
};

export type State = {
  todos: TodoType[];
  visibilityFilter: VisibilityFilterType;
};

export const initialState: State = {
  todos: [],
  visibilityFilter: 'SHOW_ALL',
};

export const useValue = (initState: State) => useState(initState);

export type SetState = ReturnType<typeof useValue>[1];
