import { Context } from 'react';
import { ContextValue } from './createProvider';
export declare const useSelector: <State, Update, Selected>(CustomContext: Context<ContextValue<State, Update>>, selector: (state: State) => Selected) => any;
