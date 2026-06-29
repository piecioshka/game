import { EngineView } from './view';

export class EngineSideView extends EngineView {
  config = {
    gravity: 0,
    jump: 0, // [0-100]
    worldHeight: 400,
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
   */
  _moveHorizontally(entity, targetX) {
    const { y, width, height } = entity.config;
    let x = targetX;

    this.config.platforms.forEach((platform) => {
      const overlapY =
        y + height > platform.y && y < platform.y + platform.height;
      if (!overlapY) {
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
    const protectedPosition = this._applyWorldBoundaries(entity, newPosition);
    entity.moveTo(protectedPosition);
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
    const { y, height } = entity.config;
    const floor = this._floorY(entity);

    const isOnSurface = y + height >= floor;
    if (!isOnSurface) {
      // INFO: Entity can jump only when it stands on a surface
      return;
    }

    // Initial upwards impulse sized so the entity reaches ~`jump` pixels of
    // height under the current gravity (v0 = sqrt(2 * g * h)); gravity then
    // pulls it back down into a smooth arc.
    const peakHeight = this.config.jump;
    entity.velocityY = -Math.sqrt(2 * this.config.gravity * peakHeight);
  }
}
