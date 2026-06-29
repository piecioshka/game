import { describe, expect, it } from 'vitest';
import { Entity } from './entity';
import { SpriteAnimation } from '../internal/sprite-animation';

// Entity wires up DOM UI events in its constructor, so provide a minimal
// canvas stub that satisfies addEventListener/removeEventListener.
const makeWorld = () => ({
  $canvas: {
    addEventListener() {},
    removeEventListener() {},
  },
  config: {},
});

describe('Entity sprite swapping', () => {
  it('setAsset() changes the rendered image', () => {
    const entity = new Entity({ world: makeWorld(), assetId: 'idle' });
    entity.setAsset('run');
    expect(entity.config.assetId).toBe('run');
  });

  it('setAsset() ignores empty values', () => {
    const entity = new Entity({ world: makeWorld(), assetId: 'idle' });
    entity.setAsset(null);
    expect(entity.config.assetId).toBe('idle');
  });

  it('update() advances the sprite animation frame', () => {
    let t = 0;
    const entity = new Entity({ world: makeWorld(), assetId: 'a' });
    entity.setAnimation(
      new SpriteAnimation({
        frames: ['a', 'b'],
        fps: 10,
        now: () => t,
      }),
    );

    t = 100; // one frame at 10fps
    entity.update();
    expect(entity.config.assetId).toBe('b');
  });
});
