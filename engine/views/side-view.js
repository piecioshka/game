import { EngineView } from './view';

// TODO(piecioshka): find a way to read this value from world config
const worldHeight = 400;

export class EngineSideView extends EngineView {
  config = {
    gravity: 0,
    jump: 0,
  };

  constructor(props) {
    super();
    this.config.gravity = props.gravity;
    this.config.jump = props.jump;
  }

  update(entity) {
    const gravity = this.config.gravity;
    const { y, height } = entity.config;
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

  onPressAButton(entity) {
    // console.debug('EngineSideView > onPressAButton', entity);
    this._updatePosition(entity, {
      y: entity.config.y - (worldHeight * this.config.jump) / 100,
    });
  }
}
