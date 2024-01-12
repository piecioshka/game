export class CollisionDetector {
  #toTest = [];

  overlap(player, entities, handler) {
    this.#toTest.push({ player, entities, handler });
  }

  update() {
    this.#toTest.forEach(({ player, entities, handler }) => {
      const { x: px, y: py, width: pWidth, height: pHeight } = player.config;

      const isOverlapWithPlayer = (pointX, pointY) => {
        return (
          pointX >= px &&
          pointX <= px + pWidth &&
          pointY > py &&
          pointY < py + pHeight
        );
      };

      entities.forEach((entity) => {
        if (!entity.alive) {
          // INFO: Entity is no longer alive
          return;
        }

        const { x, y, width, height } = entity.config;
        const isOverlapWithEntity = (pointX, pointY) => {
          return (
            pointX >= x &&
            pointX <= x + width &&
            pointY > y &&
            pointY < y + height
          );
        };

        // ---------------------------------------------------------------------
        // --- Check if Player corners are inside Entity bounding box ----------
        // ---------------------------------------------------------------------

        const isPlayerTopLeftCorner = isOverlapWithEntity(px, py);
        if (isPlayerTopLeftCorner) {
          handler(entity, { type: 'top-left', who: player });
          return;
        }

        const isPlayerTopRightCorner = isOverlapWithEntity(px + pWidth, py);
        if (isPlayerTopRightCorner) {
          handler(entity, { type: 'top-right', who: player });
          return;
        }

        const isPlayerBottomRightCorner = isOverlapWithEntity(
          px + pWidth,
          py + pHeight,
        );
        if (isPlayerBottomRightCorner) {
          handler(entity, { type: 'bottom-right', who: player });
          return;
        }

        const isPlayerBottomLeftCorner = isOverlapWithEntity(px, py + pHeight);
        if (isPlayerBottomLeftCorner) {
          handler(entity, { type: 'bottom-left', who: player });
          return;
        }

        // ---------------------------------------------------------------------
        // --- Check if Entity corners are inside Player bounding box ----------
        // ---------------------------------------------------------------------

        const isEntityTopLeftCorner = isOverlapWithPlayer(x, y);
        if (isEntityTopLeftCorner) {
          handler(entity, { type: 'top-left', who: entity });
          return;
        }

        const isEntityTopRightCorner = isOverlapWithPlayer(x + width, y);
        if (isEntityTopRightCorner) {
          handler(entity, { type: 'top-right', who: entity });
          return;
        }
        const isEntityBottomRightCorner = isOverlapWithPlayer(
          x + width,
          y + height,
        );
        if (isEntityBottomRightCorner) {
          handler(entity, { type: 'bottom-right', who: entity });
          return;
        }

        const isEntityBottomLeftCorner = isOverlapWithPlayer(x, y + height);
        if (isEntityBottomLeftCorner) {
          handler(entity, { type: 'bottom-left', who: entity });
          return;
        }
      });
    });
  }
}
