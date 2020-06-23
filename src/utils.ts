import {
  useEffect,
  useRef,
  useDebugValue,
} from 'react';

type Obj = Record<string, unknown>;

const affectedToPathList = <State>(
  state: State,
  affected: WeakMap<Obj, Set<string>>,
) => {
  const list: string[][] = [];
  const walk = (obj: unknown, path?: string[]) => {
    const used = affected.get(obj as Obj);
    if (used) {
      used.forEach((key) => {
        walk((obj as { [k: string]: Obj })[key], path ? [...path, key] : [key]);
      });
    } else if (path) {
      list.push(path);
    }
  };
  walk(state);
  return list;
};

export const useAffectedDebugValue = <State>(
  state: State,
  affected: WeakMap<Obj, Set<string>>,
) => {
  const pathList = useRef<string[][]>();
  useEffect(() => {
    pathList.current = affectedToPathList(state, affected);
  });
  useDebugValue(pathList.current);
};
