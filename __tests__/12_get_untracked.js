import { createDeepProxy, getUntrackedObject } from '../src/deepProxy';

const noop = () => {};

describe('object tracking', () => {
  it('should get untracked object', () => {
    const proxyCache = new WeakMap();
    const s1 = { a: { b: 1, c: 2 } };
    const a1 = new WeakMap();
    const p1 = createDeepProxy(s1, a1, proxyCache);
    noop(p1.a.b);
    expect(p1).not.toBe(s1);
    expect(p1.a).not.toBe(s1.a);
    expect(p1.a.b).toBe(s1.a.b);
    expect(getUntrackedObject(p1)).toBe(s1);
    expect(getUntrackedObject(p1.a)).toBe(s1.a);
    expect(getUntrackedObject(p1.a.b)).toBe(null);
  });
});
