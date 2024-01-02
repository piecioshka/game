import { describe, expect, it } from 'vitest';
import { EventEmitter } from './event-emitter';

describe('EventEmitter', () => {
  it('should register & dispatch an event', () => {
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
