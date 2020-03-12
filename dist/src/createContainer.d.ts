/// <reference types="react" />
export declare const createContainer: <State, Update extends (...args: any) => any, Props>(useValue: (props: Props) => readonly [State, Update]) => {
    readonly Provider: import("react").FC<Props>;
    readonly useTrackedState: (opts?: any) => State;
    readonly useTracked: (opts?: any) => [State, Update];
    readonly useUpdate: () => Update;
    readonly useSelector: <Selected>(selector: (state: State) => Selected) => any;
};
