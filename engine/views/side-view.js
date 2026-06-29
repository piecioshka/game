import { EngineView } from './view';

export class EngineSideView extends EngineView {
  config = {
    gravity: 0,
    jump: 0, // [0-100]
    worldHeight: 400,
    // Width of the playable level. When larger than the canvas (a scrolling
    // level), horizontal boundaries use this instead of the canvas width.
    // Null -> fall back to the canvas width (single-screen levels).
    worldWidth: null,
    /**
     * Solid surfaces the entity can land on and cannot pass through, e.g. a
     * wall/ledge ("murek"). Each platform: { x, y, width, height }
     * @type {Array<{x: number, y: number, width: number, height: number}>}
     */
    platforms: [],
  };

  constructor(props) {
    super();
    Object.assign(this.config, props);
  }

  /**
   * Applies gravity every frame: the entity keeps a vertical velocity that is
   * accelerated downwards and integrated into its position. Landing on a
   * surface (world bottom or a platform top) resets the velocity to 0.
   */
  update(entity) {
    const { y, height } = entity.config;
    const velocityY = entity.velocityY ?? 0;
    const nextVelocityY = velocityY + this._gravityStep();
    const nextY = y + nextVelocityY;

    const floor = this._floorY(entity);
    const isLanding = nextY + height >= floor && velocityY >= 0;

    if (isLanding) {
      entity.velocityY = 0;
      if (y + height !== floor) {
        entity.moveTo({ y: floor - height });
      }
      return;
    }

    entity.velocityY = nextVelocityY;
    entity.moveTo({ y: nextY });
  }

  /**
   * Gravity acceleration in pixels per frame^2. `config.gravity` is taken as
   * that acceleration directly (e.g. 1.3 px/frame^2), so the feel does not
   * depend on the entity height.
   */
  _gravityStep() {
    return this.config.gravity;
  }

  /**
   * The Y of the surface under the entity: the world bottom, or a platform top
   * when the entity is horizontally over it and currently at/above its top.
   */
  _floorY(entity) {
    const { x, width, y, height } = entity.config;
    let floor = this.config.worldHeight;

    this.config.platforms.forEach((platform) => {
      const overlapX =
        x + width > platform.x && x < platform.x + platform.width;
      const isAbove = y + height <= platform.y + (entity.velocityY ?? 0) + 1;
      if (overlapX && isAbove && platform.y < floor) {
        floor = platform.y;
      }
    });

    return floor;
  }

  /**
   * Horizontal move that cannot pass through a platform: if the target X would
   * overlap a platform the entity is standing beside (not on top of), it is
   * clamped to the platform's edge.
   *
   * The wall is only solid BELOW its top edge. When the entity's feet are at or
   * above the platform top (within a one-step `clearance`), horizontal movement
   * is allowed so the entity can slide over the crest and then fall onto it via
   * gravity. Keep `clearance` small: a wide band lets the body slide into the
   * platform column while its feet are still below the top, which embeds it in
   * the wall. The right lever for "can the entity reach the top at all" is the
   * jump height, not this tolerance.
   */
  _moveHorizontally(entity, targetX) {
    const { y, width, height } = entity.config;
    let x = targetX;

    this.config.platforms.forEach((platform) => {
      const clearance = Math.abs(this._gravityStep()) + 1;
      const feet = y + height;

      // Feet at/above the platform top: the entity is over the ledge, not
      // beside it -> allow horizontal movement (it lands on top next frame).
      const isAboveTop = feet <= platform.y + clearance;

      const overlapY = feet > platform.y && y < platform.y + platform.height;
      if (!overlapY || isAboveTop) {
        return;
      }

      const wasLeft = entity.config.x + width <= platform.x;
      const wasRight = entity.config.x >= platform.x + platform.width;
      const hitsFromLeft = wasLeft && x + width > platform.x;
      const hitsFromRight = wasRight && x < platform.x + platform.width;
      if (hitsFromLeft) {
        x = platform.x - width;
      } else if (hitsFromRight) {
        x = platform.x + platform.width;
      }
    });

    this._updatePosition(entity, { x });
  }

  _updatePosition(entity, newPosition) {
    const protectedPosition = this._clampToLevel(entity, newPosition);
    entity.moveTo(protectedPosition);
  }

  /**
   * Keeps the entity inside the level horizontally. Uses `config.worldWidth`
   * for scrolling levels (wider than the canvas); falls back to the canvas
   * width otherwise. Vertical position is left untouched so gravity can carry
   * the entity into pits below the canvas.
   */
  _clampToLevel(entity, props) {
    const cfg = entity.config;
    const width = cfg.width;
    const levelWidth = this.config.worldWidth ?? cfg.world.width;

    let x = props.x ?? cfg.x;
    const y = props.y ?? cfg.y;

    if (x < 0) {
      x = 0;
    } else if (x + width > levelWidth) {
      x = levelWidth - width;
    }

    return { x, y };
  }

  /**
   * @param {import('../entities/arcade-entity').ArcadeEntity} entity
   */
  onPressLeft(entity) {
    this._moveHorizontally(entity, entity.config.x - entity.deltaMove);
  }

  /**
   * @param {import('../entities/arcade-entity').ArcadeEntity} entity
   */
  onPressRight(entity) {
    this._moveHorizontally(entity, entity.config.x + entity.deltaMove);
  }

  onPressUp(entity) {
    this.#jump(entity);
  }

  onPressAButton(entity) {
    this.#jump(entity);
  }

  #jump(entity) {
    // Rising-edge guard: while a jump key stays held the keyboard re-emits
    // every frame; only the first emit (before the latch is set) may jump.
    // The latch is cleared by ArcadeEntity once the jump keys are released.
    if (entity.jumpLatched) {
      return;
    }

    const { y, height } = entity.config;
    const floor = this._floorY(entity);

    const isOnSurface = y + height >= floor;
    if (!isOnSurface) {
      // INFO: Entity can jump only when it stands on a surface
      return;
    }

    entity.jumpLatched = true;

    // Initial upwards impulse sized so the entity reaches ~`jump` pixels of
    // height under the current gravity (v0 = sqrt(2 * g * h)); gravity then
    // pulls it back down into a smooth arc.
    const peakHeight = this.config.jump;
    entity.velocityY = -Math.sqrt(2 * this.config.gravity * peakHeight);
  }
}
