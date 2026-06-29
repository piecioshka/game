import { describe, expect, it } from 'vitest';
import { SpriteAnimation } from './sprite-animation';

const makeClock = () => {
  let t = 0;
  return {
    now: () => t,
    advance: (ms) => {
      t += ms;
    },
  };
};

describe('SpriteAnimation', () => {
  it('returns null when there are no frames', () => {
    const anim = new SpriteAnimation({ frames: [] });
    expect(anim.currentFrame()).toBe(null);
  });

  it('advances frames according to fps', () => {
    const clock = makeClock();
    const anim = new SpriteAnimation({
      frames: ['a', 'b', 'c'],
      fps: 10, // one frame every 100ms
      now: clock.now,
    });

    expect(anim.currentFrame()).toBe('a');
    clock.advance(100);
    expect(anim.currentFrame()).toBe('b');
    clock.advance(100);
    expect(anim.currentFrame()).toBe('c');
  });

  it('loops back to the first frame', () => {
    const clock = makeClock();
    const anim = new SpriteAnimation({
      frames: ['a', 'b'],
      fps: 10,
      loop: true,
      now: clock.now,
    });

    anim.start(); // lock the start time at t=0
    clock.advance(200); // 2 frames elapsed -> index 2 % 2 === 0
    expect(anim.currentFrame()).toBe('a');
  });

  it('clamps on the last frame when loop is disabled', () => {
    const clock = makeClock();
    const anim = new SpriteAnimation({
      frames: ['a', 'b'],
      fps: 10,
      loop: false,
      now: clock.now,
    });

    anim.start(); // lock the start time at t=0
    clock.advance(9999);
    expect(anim.currentFrame()).toBe('b');
  });
});
