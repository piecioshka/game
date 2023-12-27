export const UIEvents = {
  setup(canvas, eventName, entity) {
    const entityName = entity.config.name;
    const { x, y, width, height } = entity.config;
    // console.debug(`[⚙️] Setup "${eventName}" on "${entityName}"`);

    const handler = function (evt) {
      const clickedX = evt.offsetX;
      const clickedY = evt.offsetY;

      const isInHorizontalRange = x < clickedX && x + width > clickedX;
      const isInVerticalRange = y < clickedY && y + height > clickedY;
      const isOverlaps = isInHorizontalRange && isInVerticalRange;

      // console.debug('UIEvents', entityName, { eventName, isOverlaps });

      if (isOverlaps) {
        // console.debug(`[🔥] Emit "${eventName}" on "${entityName}"`);
        entity.emit(eventName);
      }
    };

    canvas.addEventListener(eventName, handler);

    return () => {
      canvas.removeEventListener(eventName, handler);
    };
  },
};
