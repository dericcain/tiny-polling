import { Polling } from '../src';

jest.useFakeTimers();

describe('Polling', () => {
  const seconds = (n: number) => n * 1000;

  test('should execute the passed in method when the specified interval is reached', () => {
    const mockService = jest.fn();
    const poll = new Polling(mockService, 5);
    poll.start();

    jest.advanceTimersByTime(seconds(6));

    expect(mockService).toHaveBeenCalled();
  });

  test('should stop polling when the "stop" method is called', () => {
    const mockService = jest.fn();
    const poll = new Polling(mockService);
    poll.start();

    jest.advanceTimersByTime(seconds(5));

    poll.stop();

    expect(mockService).not.toHaveBeenCalled();
  });

  test('should stop polling when there is no network connection', () => {
    const mockService = jest.fn();
    const poll = new Polling(mockService);

    poll.start();

    jest.advanceTimersByTime(seconds(11));
    // Make sure we execute the service once before going offline
    expect(mockService).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event('offline'));
    jest.advanceTimersByTime(seconds(30));

    expect(mockService).toHaveBeenCalledTimes(1);
  });

  test('should start polling once the network connection becomes available', () => {
    const mockService = jest.fn();
    const poll = new Polling(mockService);

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

  test('should allow a custom interval to be passed in', () => {
    const mockService = jest.fn();
    const poll = new Polling(mockService, 5);
    poll.start();

    jest.advanceTimersByTime(seconds(6));

    expect(mockService).toHaveBeenCalledTimes(1);
  });
});
