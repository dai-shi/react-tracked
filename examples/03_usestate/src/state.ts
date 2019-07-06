import { useState } from 'react';

const initialState = {
  count: 0,
  person: {
    age: 0,
    firstName: '',
    lastName: '',
  },
};

export type State = typeof initialState;

export type Updater = (s: State | ((s: State) => State)) => void;

export const useValue = () => useState(initialState);
