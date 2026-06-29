// Developer mode: pressing "b" twice in quick succession toggles the bounding
// boxes on every entity (via the world's `isVisibleBoundingBox` flag).

const KEY_B = 66;
const DOUBLE_PRESS_WINDOW = 400; // ms between the two "b" presses

/**
 * Installs the dev-mode keyboard shortcut on a world.
 * @param {import('../domain/world').EngineWorld} world
 * @returns {() => void} a cleanup function that removes the listener
 */
export function setupDevMode(world) {
  let lastPress = 0;

  const onKeyDown = (evt) => {
    if (evt.keyCode !== KEY_B) {
      return;
    }

    const now = evt.timeStamp;
    if (now - lastPress <= DOUBLE_PRESS_WINDOW) {
      world.config.isVisibleBoundingBox = !world.config.isVisibleBoundingBox;
      lastPress = 0; // reset so a third "b" starts a fresh pair
    } else {
      lastPress = now;
    }
  };

  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}
