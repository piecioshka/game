import { ArcadeEntity } from '../engine/game-types/arcade';

export class Player extends ArcadeEntity {
  onPressSpace() {
    console.log('shot shot from Player');
    super.onPressSpace();
  }
}
