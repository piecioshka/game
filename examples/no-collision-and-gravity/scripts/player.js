import { ArcadeEntity } from '@engine';

export class Player extends ArcadeEntity {
  constructor(props) {
    super(props);
  }

  onPressAButton() {
    console.log(`${this.config.name}: pressing A button`);
    super.onPressAButton();
  }

  onPressBButton() {
    console.log(`${this.config.name}: pressing B button`);
    super.onPressBButton();
  }
}
