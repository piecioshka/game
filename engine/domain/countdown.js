import { EventEmitter } from '../utils/event-emitter';

/**
 * A frame-driven countdown timer.
 *
 * Create it with a `duration` (in milliseconds), `start()` it and call
 * `update()` on every frame (e.g. from a scene's `update()`). It emits:
 *
 * - `tick`     - on every update while running, with the remaining time (ms),
 * - `complete` - once, when the remaining time reaches zero.
 *
 * Time is read from an injectable `now()` source (defaults to
 * `performance.now()`), which keeps the timer easy to unit test.
 */
export class Countdown extends EventEmitter {
  config = {
    // Total duration in milliseconds.
    duration: 0,
    // Time source - injectable for tests.
    now: () => performance.now(),
  };

  #remaining = 0;
  #lastTick = 0;
  #running = false;
  #completed = false;

  constructor(props = {}) {
    super();
    Object.assign(this.config, props);
    this.#remaining = this.config.duration;
  }

  get isRunning() {
    return this.#running;
  }

  get isCompleted() {
    return this.#completed;
  }

  getRemaining() {
    return this.#remaining;
  }

  /**
   * Begin counting down from the full `duration` (a fresh start).
   */
  start() {
    this.#remaining = this.config.duration;
    this.#completed = false;
    this.#running = true;
    this.#lastTick = this.config.now();
  }

  /**
   * Freeze the remaining time. Call `resume()` to continue.
   */
  pause() {
    this.#running = false;
  }

  /**
   * Continue counting from the time left when it was paused.
   */
  resume() {
    if (this.#running || this.#completed || this.#remaining === 0) {
      return;
    }
    this.#running = true;
    this.#lastTick = this.config.now();
  }

  /**
   * Stop the countdown and reset the remaining time to the full `duration`.
   */
  stop() {
    this.#running = false;
    this.#completed = false;
    this.#remaining = this.config.duration;
  }

  /**
   * Add (or, with a negative value, subtract) time. Useful for pickups that
   * extend the clock.
   */
  add(ms) {
    this.#remaining = Math.max(0, this.#remaining + ms);
    if (this.#remaining > 0) {
      this.#completed = false;
    }
  }

  /**
   * Advance the timer. Should be called once per frame.
   */
  update() {
    if (!this.#running) {
      return;
    }

    const now = this.config.now();
    const delta = now - this.#lastTick;
    this.#lastTick = now;

    this.#remaining = Math.max(0, this.#remaining - delta);
    this.emit('tick', this.#remaining);

    if (this.#remaining === 0) {
      this.#running = false;
      this.#completed = true;
      this.emit('complete');
    }
  }
}
