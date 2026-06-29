import { describe, expect, it } from 'vitest';
import { AutoPilot } from './auto-pilot';

const makeEntity = (cfg = {}) => ({
  config: {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    world: { width: 100, height: 100 },
    ...cfg,
  },
});

describe('AutoPilot', () => {
  it('chases a target horizontally when the X distance dominates', () => {
    const target = makeEntity({ x: 80, y: 5 });
    const ai = new AutoPilot({ pattern: 'chase', target });
    expect(ai.nextMove(makeEntity({ x: 0, y: 0 }))).toBe('right');
  });

  it('chases a target vertically when the Y distance dominates', () => {
    const target = makeEntity({ x: 5, y: 80 });
    const ai = new AutoPilot({ pattern: 'chase', target });
    expect(ai.nextMove(makeEntity({ x: 0, y: 0 }))).toBe('down');
  });

  it('returns null while chasing without a target', () => {
    const ai = new AutoPilot({ pattern: 'chase' });
    expect(ai.nextMove(makeEntity())).toBe(null);
  });

  it('bounces horizontally at world boundaries', () => {
    const ai = new AutoPilot({ pattern: 'horizontal' });
    const me = makeEntity({ x: 0 });
    expect(ai.nextMove(me)).toBe('right');
    me.config.x = 90; // at the right edge (world.width - width)
    expect(ai.nextMove(me)).toBe('left');
  });

  it('uses the injected randomness source for the random pattern', () => {
    const ai = new AutoPilot({ pattern: 'random', random: () => 0 });
    expect(ai.nextMove(makeEntity())).toBe('up');
  });
});
