import { Context } from 'react';
import { ContextValue } from './createProvider';
export declare const useTrackedState: <State, Update>(CustomContext: Context<ContextValue<State, Update>>, opts?: any) => State;
export declare const useTracked: <State, Update>(CustomContext: Context<ContextValue<State, Update>>, opts?: any) => [State, Update];
