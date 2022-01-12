import { useState } from 'react';

import { createContainer } from 'react-tracked';

const initialState = {
  count: 0,
  person: {
    age: 0,
    firstName: '',
    lastName: '',
  },
};

const useValue = () => useState(initialState);

export const { Provider, useTracked } = createContainer(useValue, { concurrentMode: true });
