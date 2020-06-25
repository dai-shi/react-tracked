declare type Obj = Record<string, unknown>;
export declare const useAffectedDebugValue: <State>(state: State, affected: WeakMap<Obj, Set<string>>) => void;
export {};
