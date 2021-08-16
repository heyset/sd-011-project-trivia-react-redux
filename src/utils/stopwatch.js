const createStopwatch = (initialTime, callbacks) => {
  const INTERVAL = 1000;
  const DEFAULT_TIME = 30;

  let isRunning = false;
  let remaining = initialTime || DEFAULT_TIME;
  let intervalHandle;

  return {
    getRemaining: () => remaining,
    reset() {
      if (isRunning) return;
      remaining = initialTime || DEFAULT_TIME;
      if (callbacks.reset) {
        callbacks.reset(remaining);
      }
      return this;
    },
    stop() {
      if (callbacks.stop) {
        callbacks.stop();
      }
      clearInterval(intervalHandle);
      isRunning = false;
      return this;
    },
    start() {
      if (callbacks.start) {
        callbacks.start();
      }
      isRunning = true;

      intervalHandle = setInterval(() => {
        remaining -= 1;
        if (callbacks.tick) {
          callbacks.tick(remaining);
        }
        if (remaining <= 0) {
          if (callbacks.end) {
            callbacks.end();
          }
          clearInterval(intervalHandle);
          isRunning = false;
        }
      }, INTERVAL);
      return this;
    },
  };
};

export default createStopwatch;
