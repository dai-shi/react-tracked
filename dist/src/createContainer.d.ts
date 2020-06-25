import { FC } from 'react';
import { useTrackedState as useTrackedStateOrig, useTracked as useTrackedOrig } from './useTrackedState';
export declare const createContainer: <State, Update extends (...args: any) => any, Props>(useValue: (props: Props) => readonly [State, Update]) => {
    readonly Provider: FC<Props>;
    readonly useTrackedState: (opts?: Parameters<typeof useTrackedStateOrig>[1]) => State;
    readonly useTracked: (opts?: Parameters<typeof useTrackedOrig>[2]) => [State, Update];
    readonly useUpdate: () => Update;
    readonly useSelector: <Selected>(selector: (state: State) => Selected) => Selected;
};
