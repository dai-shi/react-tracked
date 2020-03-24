import { Context as ContextOrig } from 'react';
import { Context } from 'use-context-selector';
export declare const useTrackedState: <State>(StateContext: Context<State>, opts?: any) => State;
export declare const useTracked: <State, Update>(StateContext: Context<State>, UpdateContext: ContextOrig<Update>, opts?: any) => [State, Update];
