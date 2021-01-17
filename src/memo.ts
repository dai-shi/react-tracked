import { createElement, memo as reactMemo, forwardRef } from 'react';
import type {
  FC,
  PropsWithChildren,
  NamedExoticComponent,
  ComponentType,
  ComponentProps,
  MemoExoticComponent,
} from 'react';

import { trackMemo } from 'proxy-compare';

export function memo<P extends Record<string, unknown>>(
  Component: FC<P>,
  propsAreEqual?: (
    prevProps: Readonly<PropsWithChildren<P>>,
    nextProps: Readonly<PropsWithChildren<P>>,
  ) => boolean,
): NamedExoticComponent<P>;

export function memo<T extends ComponentType<any>>(
  Component: T,
  propsAreEqual?: (
    prevProps: Readonly<ComponentProps<T>>,
    nextProps: Readonly<ComponentProps<T>>,
  ) => boolean,
): MemoExoticComponent<T>;

export function memo(Component: any, propsAreEqual?: any) {
  const WrappedComponent = forwardRef((props: any, ref: any) => {
    Object.values(props).forEach(trackMemo);
    return createElement(Component, { ...props, ref });
  });
  return reactMemo(WrappedComponent, propsAreEqual);
}
