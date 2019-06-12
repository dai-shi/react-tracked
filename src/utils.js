import { useEffect, useLayoutEffect, useReducer } from 'react';

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// useForceUpdate hook
const forcedReducer = state => state + 1;
export const useForceUpdate = () => useReducer(forcedReducer, 0)[1];
