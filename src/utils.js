import { useEffect, useLayoutEffect } from 'react';

const isClient = (
  typeof window !== 'undefined'
  && !/ServerSideRendering/.test(window.navigator && window.navigator.userAgent)
);

export const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;
