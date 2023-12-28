import { EngineView } from './view';

export class EngineTopDownView extends EngineView {
  _applyBoundaries(entity, props) {
    const cfg = entity.config;
    let x = props.x ?? cfg.x;
    let y = props.y ?? cfg.y;
    // console.debug('ArcadeEntity > _applyBoundaries', { x, y });
    const world = cfg.world;
    const entityWidth = cfg.width;
    const entityHeight = cfg.height;

    const isOutOfLeft = x < 0;
    const isOutOfRight = x + entityWidth > world.width;
    const isOutOfTop = y < 0;
    const isOutOfBottom = y + entityHeight > world.height;

    if (isOutOfLeft) {
      x = 0;
    } else if (isOutOfRight) {
      x = world.width - entityWidth;
    }

    if (isOutOfTop) {
      y = 0;
    } else if (isOutOfBottom) {
      y = world.height - entityHeight;
    }

    return { x, y };
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

  onPressAButton() {
    // console.log('ArcadeEntity: pressing A button');
  }

  onPressBButton() {
    // console.log('ArcadeEntity: pressing B button');
  }
}
