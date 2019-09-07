interface PollingType {
  start: () => void;
  stop: () => void;
}

export function Polling(serviceToPoll: () => void, intervalInSeconds: number = 10): PollingType {
  let timer: number = 0;
  const interval: number = intervalInSeconds * 1000;

  function start() {
    timer = window.setInterval(serviceToPoll, interval);
    watchNetworkConnection();
  }

  function stop(manuallyStop = true) {
    clearInterval(timer);

    if (manuallyStop) {
      window.removeEventListener('offline', waitForNetworkConnection);
      window.removeEventListener('online', start);
    }
  }

  function watchNetworkConnection() {
    window.addEventListener('offline', waitForNetworkConnection);
    window.removeEventListener('online', start);
  }

  function waitForNetworkConnection() {
    stop(false);
    window.addEventListener('online', start);
  }

  return {
    start,
    stop,
  };
}
