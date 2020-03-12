import { Context, FC, MutableRefObject } from 'react';
export declare const MUTABLE_SOURCE_CONTEXT_PROPERTY = "s";
export declare const UPDATE_CONTEXT_PROPERTY = "u";
export declare const STATEREF_SOURCE_PROPERTY = "r";
export declare const LISTENERS_SOURCE_PROPERTY = "l";
export declare type ContextValue<State, Update> = {
    [MUTABLE_SOURCE_CONTEXT_PROPERTY]: any;
    [UPDATE_CONTEXT_PROPERTY]: Update;
};
export declare const createProvider: <State, Update extends (...args: any) => any, Props>(CustomContext: Context<ContextValue<State, Update>>, useValue: (props: Props) => readonly [State, Update]) => FC<Props>;
export declare const subscribe: (source: {
    l: MutableRefObject<Set<() => void>>;
}, callback: () => void) => () => boolean;
