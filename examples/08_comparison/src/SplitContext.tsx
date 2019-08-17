import * as React from 'react';
import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useMemo,
} from 'react';

const initialState1 = {
  firstName: 'Harry',
};

type State1 = typeof initialState1;
type Action1 =
  | { type: 'setFirstName'; firstName: string }
type Dispatch1 = (action: Action1) => void;

const reducer1 = (state: State1, action: Action1) => {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.firstName };
    default:
      throw new Error('unexpected action type');
  }
};

const PersonContext1 = createContext<[State1, Dispatch1]>([initialState1, () => {}]);

const initialState2 = {
  familyName: 'Potter',
};

type State2 = typeof initialState2;
type Action2 =
  | { type: 'setFamilyName'; familyName: string };
type Dispatch2 = (action: Action2) => void;

const reducer2 = (state: State2, action: Action2) => {
  switch (action.type) {
    case 'setFamilyName':
      return { ...state, familyName: action.familyName };
    default:
      throw new Error('unexpected action type');
  }
};

const PersonContext2 = createContext<[State2, Dispatch2]>([initialState2, () => {}]);

const PersonFirstName: React.FC = React.memo(() => {
  const [state, dispatch] = useContext(PersonContext1);
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
});

const PersonFamilyName: React.FC = React.memo(() => {
  const [state, dispatch] = useContext(PersonContext2);
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
});

const NaiveContext: React.FC = () => {
  const [state1, dispatch1] = useReducer(reducer1, initialState1);
  const [state2, dispatch2] = useReducer(reducer2, initialState2);
  const value1 = useMemo<[State1, Dispatch1]>(() => [state1, dispatch1], [state1, dispatch1]);
  const value2 = useMemo<[State2, Dispatch2]>(() => [state2, dispatch2], [state2, dispatch2]);
  return (
    <PersonContext1.Provider value={value1}>
      <PersonContext2.Provider value={value2}>
        <PersonFirstName />
        <PersonFamilyName />
      </PersonContext2.Provider>
    </PersonContext1.Provider>
  );
};

export default NaiveContext;
