import { useEffect, useLayoutEffect, useRef } from 'react';

const isClient = (
  typeof window !== 'undefined'
  && typeof window.navigator !== 'undefined'
  && typeof window.navigator.userAgent === 'string'
  && !window.navigator.userAgent.includes('ServerSideRendering')
);

export const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;

// Show warning message if it detects the use of React.memo
// without using trackMemo. The detection is heuristic and not accurate.
// It should only be used in the development mode.
export const useWarnMemo = (state, affected) => {
  const alreadyWarned = useRef(false);
  const prevState = useRef(state);
  const prevAffected = useRef(affected);
  useEffect(() => {
    if (alreadyWarned.current) return;

    const walk = (currObj, prevObj, path) => {
      const currUsed = affected.get(currObj);
      const prevUsed = prevAffected.current.get(prevObj);
      if (!currUsed || !prevUsed) return;
      if (currUsed.size <= 1 && prevUsed.size >= 3) {
        // at least two props are no longer tracked
        // eslint-disable-next-line no-console
        console.warn('Looks like some props are no longer tracked. If this is due to React.memo, consider using `trackMemo`.', path);
        alreadyWarned.current = true;
      }
      currUsed.forEach((key) => {
        walk(currObj[key], prevObj[key], [...path, key]);
      });
    };
    walk(state, prevState.current, []);

    prevState.current = state;
    prevAffected.current = affected;
  });
};
