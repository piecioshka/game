/**
 * Computer-controlled movement for an entity.
 *
 * The auto pilot decides a movement direction on every frame and the owner
 * (e.g. `ArcadeEntity`) translates it into the same `viewType.onPressX` calls
 * that a keyboard would trigger. This way auto-moving works for every view
 * type (top-down, side-view, ...) without duplicating movement logic.
 */
export const MOVE_DIRECTIONS = ['up', 'right', 'down', 'left'];

export class AutoPilot {
  config = {
    /**
     * @type {'random'|'horizontal'|'vertical'|'chase'}
     */
    pattern: 'random',
    /**
     * Entity to follow when pattern is "chase".
     * @type {import('../entities/entity').Entity|null}
     */
    target: null,
    // Frames between direction changes for the "random" pattern.
    interval: 30,
    // Injectable randomness source (handy for tests).
    random: Math.random,
  };

  #frame = 0;
  #direction = null;

  constructor(props = {}) {
    Object.assign(this.config, props);
  }

  /**
   * Decide the next movement direction for the given entity.
   * @returns {'up'|'right'|'down'|'left'|null}
   */
  nextMove(entity) {
    this.#frame += 1;

    switch (this.config.pattern) {
      case 'horizontal':
        return this.#bounce(entity, 'left', 'right', 'x', 'width');
      case 'vertical':
        return this.#bounce(entity, 'up', 'down', 'y', 'height');
      case 'chase':
        return this.#chase(entity);
      case 'random':
      default:
        return this.#wander();
    }
  }

  /**
   * Move towards a single edge, then bounce back when the entity reaches a
   * world boundary on the given axis.
   */
  #bounce(entity, negDirection, posDirection, axis, sizeKey) {
    if (this.#direction === null) {
      this.#direction = posDirection;
    }

    const cfg = entity.config;
    const world = cfg.world;
    const position = cfg[axis];
    const limit = axis === 'x' ? world.width : world.height;
    const maxPosition = limit - cfg[sizeKey];

    if (position <= 0) {
      this.#direction = posDirection;
    } else if (position >= maxPosition) {
      this.#direction = negDirection;
    }

    return this.#direction;
  }

  /**
   * Move towards the target along the axis with the larger distance.
   */
  #chase(entity) {
    const target = this.config.target;
    if (!target) {
      return null;
    }

    const me = entity.config;
    const it = target.config;
    const dx = it.x + it.width / 2 - (me.x + me.width / 2);
    const dy = it.y + it.height / 2 - (me.y + me.height / 2);

    if (Math.abs(dx) >= Math.abs(dy)) {
      return dx >= 0 ? 'right' : 'left';
    }
    return dy >= 0 ? 'down' : 'up';
  }

  /**
   * Pick a random direction and keep it for `interval` frames.
   */
  #wander() {
    const shouldChange =
      this.#direction === null || this.#frame % this.config.interval === 0;

    if (shouldChange) {
      const index = Math.floor(this.config.random() * MOVE_DIRECTIONS.length);
      this.#direction = MOVE_DIRECTIONS[index];
    }

    return this.#direction;
  }
}
