import { useLayoutEffect } from 'react';
export declare const useIsomorphicLayoutEffect: typeof useLayoutEffect;
export declare const useAffectedDebugValue: <State>(state: State, affected: WeakMap<object, Set<string>>) => void;
