import { createDeepProxy, isDeepChanged, trackMemo } from '../src/deepProxy';

const noop = () => {
  // do nothing
};

describe('object tracking', () => {
  it('should fail without trackMemo', () => {
    const proxyCache = new WeakMap();
    const s1 = { a: { b: 1, c: 2 } };
    const a1 = new WeakMap();
    const p1 = createDeepProxy(s1, a1, proxyCache);
    noop(p1.a.b);
    expect(isDeepChanged(s1, { a: s1.a }, a1)).toBe(false);
    expect(isDeepChanged(s1, { a: { b: 3, c: 2 } }, a1)).toBe(true);
    expect(isDeepChanged(s1, { a: { b: 1, c: 3 } }, a1)).not.toBe(true);
  });

  it('should work with trackMemo', () => {
    const proxyCache = new WeakMap();
    const s1 = { a: { b: 1, c: 2 } };
    const a1 = new WeakMap();
    const p1 = createDeepProxy(s1, a1, proxyCache);
    noop(p1.a.b);
    trackMemo(p1.a);
    expect(isDeepChanged(s1, { a: s1.a }, a1)).toBe(false);
    expect(isDeepChanged(s1, { a: { b: 3, c: 2 } }, a1)).toBe(true);
    expect(isDeepChanged(s1, { a: { b: 1, c: 3 } }, a1)).toBe(true);
  });

  it('should work with trackMemo in advance', () => {
    const proxyCache = new WeakMap();
    const s1 = { a: { b: 1, c: 2 } };
    const a1 = new WeakMap();
    const p1 = createDeepProxy(s1, a1, proxyCache);
    trackMemo(p1.a);
    noop(p1.a.b);
    expect(isDeepChanged(s1, { a: s1.a }, a1)).toBe(false);
    expect(isDeepChanged(s1, { a: { b: 3, c: 2 } }, a1)).toBe(true);
    expect(isDeepChanged(s1, { a: { b: 1, c: 3 } }, a1)).toBe(true);
  });
});

describe('object tracking two level deep', () => {
  it('should fail without trackMemo', () => {
    const proxyCache = new WeakMap();
    const s1 = { x: { a: { b: 1, c: 2 } } };
    const a1 = new WeakMap();
    const p1 = createDeepProxy(s1, a1, proxyCache);
    noop(p1.x.a.b);
    expect(isDeepChanged(s1, { x: { a: s1.x.a } }, a1)).toBe(false);
    expect(isDeepChanged(s1, { x: { a: { b: 3, c: 2 } } }, a1)).toBe(true);
    expect(isDeepChanged(s1, { x: { a: { b: 1, c: 3 } } }, a1)).not.toBe(true);
  });

  it('should work with trackMemo', () => {
    const proxyCache = new WeakMap();
    const s1 = { x: { a: { b: 1, c: 2 } } };
    const a1 = new WeakMap();
    const p1 = createDeepProxy(s1, a1, proxyCache);
    noop(p1.x.a.b);
    trackMemo(p1.x.a);
    expect(isDeepChanged(s1, { x: { a: s1.x.a } }, a1)).toBe(false);
    expect(isDeepChanged(s1, { x: { a: { b: 3, c: 2 } } }, a1)).toBe(true);
    expect(isDeepChanged(s1, { x: { a: { b: 1, c: 3 } } }, a1)).toBe(true);
  });

  it('should work with trackMemo in advance', () => {
    const proxyCache = new WeakMap();
    const s1 = { x: { a: { b: 1, c: 2 } } };
    const a1 = new WeakMap();
    const p1 = createDeepProxy(s1, a1, proxyCache);
    trackMemo(p1.x.a);
    noop(p1.x.a.b);
    expect(isDeepChanged(s1, { x: { a: s1.x.a } }, a1)).toBe(false);
    expect(isDeepChanged(s1, { x: { a: { b: 3, c: 2 } } }, a1)).toBe(true);
    expect(isDeepChanged(s1, { x: { a: { b: 1, c: 3 } } }, a1)).toBe(true);
  });
});
