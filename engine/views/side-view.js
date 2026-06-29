import { EngineView } from './view';

export class EngineSideView extends EngineView {
  config = {
    gravity: 0,
    jump: 0, // [0-100]
    worldHeight: 400,
    /**
     * Solid surfaces the entity can land on, e.g. a wall/ledge ("murek").
     * Each platform: { x, y, width, height }
     * @type {Array<{x: number, y: number, width: number, height: number}>}
     */
    platforms: [],
  };

  constructor(props) {
    super();
    Object.assign(this.config, props);
  }

  update(entity) {
    const { y, height } = entity.config;
    const floor = this._floorY(entity);
    const isOnFloor = y + height >= floor;

    if (isOnFloor) {
      // Rest exactly on the surface (avoids sinking below a platform top).
      if (y + height > floor) {
        entity.moveTo({ y: floor - height });
      }
      return;
    }

    const step = this._gravityStep(height);
    const nextBottom = y + height + step;
    if (nextBottom >= floor) {
      entity.moveTo({ y: floor - height });
    } else {
      entity.moveTo({ y: y + step });
    }
  }

  _gravityStep(height) {
    return ((this.config.worldHeight - height) * this.config.gravity) / 100;
  }

  /**
   * The Y of the surface under the entity: the world bottom, or a platform top
   * when the entity is horizontally over it and currently at/above its top.
   */
  _floorY(entity) {
    const { x, width, y, height } = entity.config;
    let floor = this.config.worldHeight;

    const landTolerance = this._gravityStep(height) + 4;

    this.config.platforms.forEach((platform) => {
      const overlapX =
        x + width > platform.x && x < platform.x + platform.width;
      const isAbove = y + height <= platform.y + landTolerance;
      if (overlapX && isAbove && platform.y < floor) {
        floor = platform.y;
      }
    });

    return floor;
  }

  _updatePosition(entity, newPosition) {
    const protectedPosition = this._applyWorldBoundaries(entity, newPosition);
    entity.moveTo(protectedPosition);
  }

  /**
   * @param {import('../entities/arcade-entity').ArcadeEntity} entity
   */
  onPressLeft(entity) {
    this._updatePosition(entity, {
      x: entity.config.x - entity.deltaMove,
    });
  }

  /**
   * @param {import('../entities/arcade-entity').ArcadeEntity} entity
   */
  onPressRight(entity) {
    this._updatePosition(entity, {
      x: entity.config.x + entity.deltaMove,
    });
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

    if (y + height < floor) {
      // INFO: Entity can jump only when it stands on a surface
      return;
    }

    const jump = this.config.jump;
    this._updatePosition(entity, {
      y: y - ((this.config.worldHeight - height) * jump) / 100,
    });
  }
}
