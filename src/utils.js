import { useEffect, useLayoutEffect } from 'react';

const isClient = (
  typeof window !== 'undefined'
  && typeof window.navigator !== 'undefined'
  && typeof window.navigator.userAgent === 'string'
  && !window.navigator.userAgent.includes('ServerSideRendering')
);

export const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;
