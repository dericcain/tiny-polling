import { Polling } from '../src';

jest.useFakeTimers();

describe('Polling', () => {
  const seconds = (n: number) => n * 1000;

  it('should execute the passed in method when the specified interval is reached', () => {
    const mockService = jest.fn();
    const poll = Polling(mockService, 5);
    poll.start();

    jest.advanceTimersByTime(seconds(6));

    expect(mockService).toHaveBeenCalled();
  });

  it('should stop polling when the "stop" method is called', () => {
    const mockService = jest.fn();
    const poll = Polling(mockService);
    poll.start();

    jest.advanceTimersByTime(seconds(5));

    poll.stop();

    expect(mockService).not.toHaveBeenCalled();
  });

  it('should stop polling when there is no network connection', () => {
    const mockService = jest.fn();
    const poll = Polling(mockService);

    poll.start();

    jest.advanceTimersByTime(seconds(11));
    // Make sure we execute the service once before going offline
    expect(mockService).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event('offline'));
    jest.advanceTimersByTime(seconds(30));

    expect(mockService).toHaveBeenCalledTimes(1);
  });

  it('should start polling once the network connection becomes available', () => {
    const mockService = jest.fn();
    const poll = Polling(mockService);

    poll.start();

    jest.advanceTimersByTime(seconds(11));
    // Make sure we execute the service once before going offline
    expect(mockService).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event('offline'));
    jest.advanceTimersByTime(seconds(30));

    expect(mockService).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event('online'));
    jest.advanceTimersByTime(seconds(11));

    expect(mockService).toHaveBeenCalledTimes(2);
  });

  it('should allow a custom interval to be passed in', () => {
    const mockService = jest.fn();
    const poll = Polling(mockService, 5);
    poll.start();

    jest.advanceTimersByTime(seconds(6));

    expect(mockService).toHaveBeenCalledTimes(1);
  });

  it('should not watch the network when manually stopped', () => {
    const mockService = jest.fn();
    const poll = Polling(mockService);

    poll.start();

    jest.advanceTimersByTime(seconds(11));
    // Make sure we execute the service once before going offline
    expect(mockService).toHaveBeenCalledTimes(1);

    poll.stop();

    window.dispatchEvent(new Event('online'));
    jest.advanceTimersByTime(seconds(11));

    expect(mockService).toHaveBeenCalledTimes(1);
  });
});
