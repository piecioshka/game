import { Entity } from '@engine';
import { drawGoal } from '../draw-shapes';

// The flag the hero must reach to win the level.
export class Goal extends Entity {
  _renderImage() {
    const ctx = this.config.world?.context;
    if (!ctx) {
      return;
    }
    drawGoal(ctx, this.config);
  }
}
