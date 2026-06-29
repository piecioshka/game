import { Entity } from '@engine';
import { drawBrick } from '../draw-shapes';

// A static wall/ledge ("murek") the player can jump onto.
export class Brick extends Entity {
  _renderImage() {
    const ctx = this.config.world?.context;
    if (!ctx) {
      return;
    }
    drawBrick(ctx, this.config);
  }
}
