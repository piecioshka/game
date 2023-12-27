import { describe, expect, it } from 'vitest';
import { EventEmitter } from './event-emitter';

describe('EventEmitter', () => {
  it('should register an event', () => {
    const ee = new EventEmitter();
    const cb = () => null;
    ee.on('test', cb);
    expect(ee._listeners).toEqual({ test: [{ name: 'test', cb }] });
  });

  it('should dispatch an event', () => {
    const ee = new EventEmitter();
    let triggered = false;
    const cb = () => {
      triggered = true;
    };
    ee.on('test', cb);
    ee.emit('test');
    expect(triggered).toEqual(true);
  });
});
