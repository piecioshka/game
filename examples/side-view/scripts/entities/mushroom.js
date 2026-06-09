import { Entity } from '@engine';
import { drawMushroom } from '../draw-shapes';

// A collectible mushroom.
export class Mushroom extends Entity {
  _renderImage() {
    const ctx = this.config.world?.context;
    if (!ctx) {
      return;
    }
    drawMushroom(ctx, this.config);
  }
}
