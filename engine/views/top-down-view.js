import { EngineView } from './view';

export class EngineTopDownView extends EngineView {
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

  /**
   * @param {import('../entities/arcade-entity').ArcadeEntity} entity
   */
  onPressUp(entity) {
    this._updatePosition(entity, {
      y: entity.config.y - entity.deltaMove,
    });
  }

  /**
   * @param {import('../entities/arcade-entity').ArcadeEntity} entity
   */
  onPressDown(entity) {
    this._updatePosition(entity, {
      y: entity.config.y + entity.deltaMove,
    });
  }
}
