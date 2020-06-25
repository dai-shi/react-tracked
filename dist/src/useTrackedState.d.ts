import { Context as ContextOrig } from 'react';
import { Context } from 'use-context-selector';
declare type Opts = {
    unstable_forceUpdateForStateChange?: boolean;
    unstable_ignoreIntermediateObjectUsage?: boolean;
    unstable_ignoreStateEquality?: boolean;
};
export declare const useTrackedState: <State>(StateContext: Context<State>, opts?: Opts) => State;
export declare const useTracked: <State, Update>(StateContext: Context<State>, UpdateContext: ContextOrig<Update>, opts?: Opts | undefined) => [State, Update];
export {};
