import { Entity } from '@engine';
import { drawTile } from '../draw-shapes';

// A solid ground/platform block the hero can stand on and bump into.
export class Platform extends Entity {
  _renderImage() {
    const ctx = this.config.world?.context;
    if (!ctx) {
      return;
    }
    drawTile(ctx, this.config, true);
  }
}
