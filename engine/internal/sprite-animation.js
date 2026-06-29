/**
 * Cycles through a list of asset ids over time to animate an entity's image.
 *
 * Given a list of `frames` (asset ids already declared in the game's assets)
 * and a `fps`, `currentFrame()` returns the asset id that should be rendered
 * at the current moment. Time is read from an injectable `now()` source
 * (defaults to `performance.now()`), which keeps the animation testable.
 */
export class SpriteAnimation {
  config = {
    /**
     * Ordered asset ids to cycle through.
     * @type {string[]}
     */
    frames: [],
    // Frames per second.
    fps: 6,
    // Loop back to the first frame after the last one.
    loop: true,
    // Time source - injectable for tests.
    now: () => performance.now(),
  };

  #startTime = null;

  constructor(props = {}) {
    Object.assign(this.config, props);
  }

  start() {
    this.#startTime = this.config.now();
  }

  reset() {
    this.#startTime = null;
  }

  /**
   * @returns {string|null} asset id for the current frame
   */
  currentFrame() {
    const { frames, fps, loop } = this.config;

    if (frames.length === 0) {
      return null;
    }

    if (this.#startTime === null) {
      this.start();
    }

    const elapsed = this.config.now() - this.#startTime;
    const index = Math.floor((elapsed / 1000) * fps);

    if (loop) {
      return frames[index % frames.length];
    }
    return frames[Math.min(index, frames.length - 1)];
  }
}
