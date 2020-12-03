import { ComponentProps, createElement, memo as reactMemo } from 'react';

import { trackMemo } from 'proxy-compare';

export const memo = (
  Component: Parameters<typeof reactMemo>[0],
  areEqual?: Parameters<typeof reactMemo>[1],
) => {
  const WrappedComponent = (props: ComponentProps<typeof Component>) => {
    Object.values(props).forEach(trackMemo);
    return createElement(Component, props);
  };
  return reactMemo(WrappedComponent, areEqual);
};
