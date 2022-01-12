import React, {
  useReducer,
  useRef,
  useEffect,
  Reducer,
} from 'react';

import { createContainer } from 'react-tracked';

const initialState = {
  firstName: 'Harry',
  familyName: 'Potter',
};

type State = typeof initialState;
type Action =
  | { type: 'setFirstName'; firstName: string }
  | { type: 'setFamilyName'; familyName: string };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.firstName };
    case 'setFamilyName':
      return { ...state, familyName: action.familyName };
    default:
      throw new Error('unexpected action type');
  }
};

const { Provider, useTracked } = createContainer(
  () => useReducer(reducer, initialState),
  { concurrentMode: true },
);

const PersonFirstName: React.FC = () => {
  const [state, dispatch] = useTracked();
  const renders = useRef(1);
  useEffect(() => {
    renders.current += 1;
  });
  return (
    <div>
      First Name:
      <input
        value={state.firstName}
        onChange={(event) => {
          dispatch({ type: 'setFirstName', firstName: event.target.value });
        }}
      />
      (renders:{renders.current})
    </div>
  );
};

const PersonFamilyName: React.FC = () => {
  const [state, dispatch] = useTracked();
  const renders = useRef(1);
  useEffect(() => {
    renders.current += 1;
  });
  return (
    <div>
      Family Name:
      <input
        value={state.familyName}
        onChange={(event) => {
          dispatch({ type: 'setFamilyName', familyName: event.target.value });
        }}
      />
      (renders:{renders.current})
    </div>
  );
};

const ReactTracked: React.FC = () => (
  <Provider>
    <PersonFirstName />
    <PersonFamilyName />
  </Provider>
);

export default ReactTracked;
