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

const affectedToPathList = (state, affected) => {
  const list = [];
  const walk = (obj, path) => {
    const used = affected.get(obj);
    if (used) {
      used.forEach((key) => {
        walk(obj[key], path ? [...path, key] : [key]);
      });
    } else if (path) {
      list.push(path);
    }
  };
  walk(state);
  return list;
};

export const useAffectedDebugValue = (state, affected) => {
  const pathList = useRef(null);
  useEffect(() => {
    pathList.current = affectedToPathList(state, affected);
  });
  useDebugValue(pathList.current);
};
