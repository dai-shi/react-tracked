import { Context } from 'react';
import { ContextValue } from './createProvider';
export declare const useUpdate: <State, Update>(CustomContext: Context<ContextValue<State, Update>>) => Update;
