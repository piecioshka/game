import { EngineView } from './view';

// TODO(piecioshka): find a way to read this value from world config
const worldHeight = 400;

export class EngineSideView extends EngineView {
  config = {
    gravity: 0,
    jump: 0, // [0-100]
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
        y: y + ((worldHeight - height) * gravity) / 100,
      });
    }
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
    // console.debug('EngineSideView > onPressAButton', entity);
    this.#jump(entity);
  }

  onPressAButton(entity) {
    // console.debug('EngineSideView > onPressAButton', entity);
    this.#jump(entity);
  }

  #jump(entity) {
    const jump = this.config.jump;
    const { y, height } = entity.config;

    if (y + height < worldHeight) {
      // INFO: Entity can jump only when is on the ground
      return;
    }

    this._updatePosition(entity, {
      y: y - ((worldHeight - height) * jump) / 100,
    });
  }
}
