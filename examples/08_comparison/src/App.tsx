import * as React from 'react';
import { StrictMode } from 'react';

import NaiveContext from './NaiveContext';
import SplitContext from './SplitContext';
import ContextWithMemo from './ContextWithMemo';
import ContextWithUseMemo from './ContextWithUseMemo';
import ReactTracked from './ReactTracked';

const App: React.FC = () => (
  <StrictMode>
    <h1>Naive Context</h1>
    <NaiveContext />
    <h1>Split Context</h1>
    <SplitContext />
    <h1>Context with React.memo</h1>
    <ContextWithMemo />
    <h1>Context with useMemo</h1>
    <ContextWithUseMemo />
    <h1>react-tracked</h1>
    <ReactTracked />
  </StrictMode>
);

export default App;
