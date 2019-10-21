import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  Reducer,
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

const PersonContext = createContext<[State, Dispatch]>([initialState, () => {}]);

const PersonFirstName: React.FC = () => {
  const [state, dispatch] = useContext(PersonContext);
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
  const [state, dispatch] = useContext(PersonContext);
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

const NaiveContext: React.FC = () => {
  const value = useReducer(reducer, initialState);
  return (
    <PersonContext.Provider value={value}>
      <PersonFirstName />
      <PersonFamilyName />
    </PersonContext.Provider>
  );
};

export default NaiveContext;
