import { describe, expect, it } from 'vitest';
import { Countdown } from './countdown';

const makeClock = () => {
  let t = 0;
  return {
    now: () => t,
    advance: (ms) => {
      t += ms;
    },
  };
};

describe('Countdown', () => {
  it('counts down and emits "tick" with the remaining time', () => {
    const clock = makeClock();
    const cd = new Countdown({ duration: 1000, now: clock.now });
    const ticks = [];
    cd.on('tick', (remaining) => ticks.push(remaining));

    cd.start();
    clock.advance(300);
    cd.update();

    expect(cd.getRemaining()).toBe(700);
    expect(ticks).toEqual([700]);
  });

  it('emits "complete" once when it reaches zero', () => {
    const clock = makeClock();
    const cd = new Countdown({ duration: 500, now: clock.now });
    let completed = 0;
    cd.on('complete', () => {
      completed += 1;
    });

    cd.start();
    clock.advance(600);
    cd.update();
    clock.advance(100);
    cd.update();

    expect(cd.getRemaining()).toBe(0);
    expect(cd.isRunning).toBe(false);
    expect(completed).toBe(1);
  });

  it('pauses and resumes without losing time', () => {
    const clock = makeClock();
    const cd = new Countdown({ duration: 1000, now: clock.now });

    cd.start();
    clock.advance(200);
    cd.update();
    cd.pause();

    clock.advance(5000); // time passes while paused...
    cd.update(); // ...but it must not count

    expect(cd.getRemaining()).toBe(800);

    cd.resume();
    clock.advance(300);
    cd.update();

    expect(cd.getRemaining()).toBe(500);
  });

  it('stop() resets the remaining time to the full duration', () => {
    const clock = makeClock();
    const cd = new Countdown({ duration: 1000, now: clock.now });

    cd.start();
    clock.advance(400);
    cd.update();
    cd.stop();

    expect(cd.getRemaining()).toBe(1000);
    expect(cd.isRunning).toBe(false);
  });

  it('add() extends the remaining time', () => {
    const clock = makeClock();
    const cd = new Countdown({ duration: 1000, now: clock.now });

    cd.start();
    clock.advance(400);
    cd.update();
    cd.add(500);

    expect(cd.getRemaining()).toBe(1100);
  });
});
