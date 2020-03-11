import {
  useEffect,
  useLayoutEffect,
  useRef,
  useDebugValue,
} from 'react';

const isClient = (
  typeof window !== 'undefined'
  && !/ServerSideRendering/.test(window.navigator && window.navigator.userAgent)
);

export const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;

const affectedToPathList = <State>(
  state: State,
  affected: WeakMap<object, Set<string>>,
) => {
  const list: string[][] = [];
  const walk = (obj: unknown, path?: string[]) => {
    const used = affected.get(obj as object);
    if (used) {
      used.forEach((key) => {
        walk((obj as { [k: string]: object })[key], path ? [...path, key] : [key]);
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
  affected: WeakMap<object, Set<string>>,
) => {
  const pathList = useRef<string[][] | null>(null);
  useEffect(() => {
    pathList.current = affectedToPathList(state, affected);
  });
  useDebugValue(pathList);
};
