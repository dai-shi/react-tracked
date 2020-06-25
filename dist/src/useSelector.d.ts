import { Context } from 'use-context-selector';
export declare const useSelector: <State, Selected>(StateContext: Context<State>, selector: (state: State) => Selected) => Selected;
