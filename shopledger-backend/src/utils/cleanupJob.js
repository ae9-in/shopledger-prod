let started = false;

export function startCleanupJob() {
  if (started) return;
  started = true;

  const timer = setInterval(() => {
    // placeholder cleanup task
  }, 60 * 60 * 1000);

  if (typeof timer.unref === 'function') timer.unref();
}
