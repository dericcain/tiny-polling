export class Polling {
  private timer: number = 0;

  private isEnabled = true;


  public constructor(private serviceToPoll: () => void = () => {}, private intervalInSeconds: number = 10) {}

  public get interval() {
    return this.intervalInSeconds * 1000;
  }

  public start = () => {
    if (this.isEnabled) {
      this.timer = window.setInterval(this.serviceToPoll, this.interval);
      this.watchNetworkConnection();
    }
  };

  public stop = ( manuallyStop = true ) => {
    clearInterval(this.timer);
    this.isEnabled = !manuallyStop;

    if (manuallyStop) {
      window.removeEventListener('offline', this.waitForNetworkConnection);
      window.removeEventListener('online', this.start);
    }
  };

  private watchNetworkConnection = () => {
    window.addEventListener('offline', this.waitForNetworkConnection);
    window.removeEventListener('online', this.start);
  };

  private waitForNetworkConnection = () => {
    this.stop(false);
    window.addEventListener('online', this.start);
  };
}
