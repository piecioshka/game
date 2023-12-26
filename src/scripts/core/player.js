import { ArcadeEntity } from '../engine/game-types/arcade-entity';

export class Player extends ArcadeEntity {
  onPressAButton() {
    console.log(`${this.config.name}: on press A button`);
    super.onPressAButton();
  }

  onPressBButton() {
    console.log(`${this.config.name}: on press A button`);
    super.onPressBButton();
  }
}
