import { useState } from 'react';

import { createContainer } from 'react-tracked';

export type VisibilityFilterType =
  | 'SHOW_ALL'
  | 'SHOW_COMPLETED'
  | 'SHOW_ACTIVE';

export type TodoType = {
  id: number;
  text: string;
  completed: boolean;
};

type State = {
  todos: TodoType[];
  visibilityFilter: VisibilityFilterType;
};

const initialState: State = {
  todos: [],
  visibilityFilter: 'SHOW_ALL',
};

const useValue = () => useState(initialState);

export const {
  Provider,
  useUpdate: useSetState,
  useTracked,
  useTrackedState,
} = createContainer(useValue, { concurrentMode: true });
