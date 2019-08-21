import * as React from 'react';
import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useMemo,
} from 'react';

const initialState = {
  firstName: 'Harry',
  familyName: 'Potter',
};

type State = typeof initialState;
type Action =
  | { type: 'setFirstName'; firstName: string }
  | { type: 'setFamilyName'; familyName: string };
type Dispatch = (action: Action) => void;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.firstName };
    case 'setFamilyName':
      return { ...state, familyName: action.familyName };
    default:
      throw new Error('unexpected action type');
  }
};

const PersonContext = createContext<[State, Dispatch]>([initialState, () => {}]);

const PersonFirstName: React.FC = () => {
  const [state, dispatch] = useContext(PersonContext);
  const { firstName } = state;
  const renders = useRef(1);
  return useMemo(() => {
    renders.current += 1; // XXX side effect
    return (
      <div>
        First Name:
        <input
          value={firstName}
          onChange={(event) => {
            dispatch({ type: 'setFirstName', firstName: event.target.value });
          }}
        />
        (renders:{renders.current})
      </div>
    );
  }, [firstName, dispatch]);
};

const PersonFamilyName: React.FC = () => {
  const [state, dispatch] = useContext(PersonContext);
  const { familyName } = state;
  const renders = useRef(1);
  return useMemo(() => {
    renders.current += 1; // XXX side effect
    return (
      <div>
        Family Name:
        <input
          value={familyName}
          onChange={(event) => {
            dispatch({ type: 'setFamilyName', familyName: event.target.value });
          }}
        />
        (renders:{renders.current})
      </div>
    );
  }, [familyName, dispatch]);
};

const ContextWithUseMemo: React.FC = () => {
  const value = useReducer(reducer, initialState);
  return (
    <PersonContext.Provider value={value}>
      <PersonFirstName />
      <PersonFamilyName />
    </PersonContext.Provider>
  );
};

export default ContextWithUseMemo;
