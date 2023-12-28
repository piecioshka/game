import { EngineView } from './view';

export class EngineSideView extends EngineView {
  config = {
    gravity: 0,
  };

  constructor(props) {
    super();
    this.config.gravity = props.gravity;
  }

  update(entity) {
    const gravity = this.config.gravity;
    const { y, height } = entity.config;
    const worldHeight = 400;
    const isOnTheBottom = y + height >= worldHeight;

    if (!isOnTheBottom) {
      entity.moveTo({
        y: y + (worldHeight * gravity) / 100,
      });
    }
  }

  _updatePosition(entity, newPosition) {
    const protectedPosition = this._applyBoundaries(entity, newPosition);
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
    // [to be implemented in inherited class]
  }

  onPressDown(entity) {
    // [to be implemented in inherited class]
  }
}
