import { AppError } from '../AppError';

describe('AppError', () => {
  it('should create an error with message', () => {
    const errorMessage = 'This is a test error';
    const appError = new AppError(errorMessage);

    expect(appError.message).toBe(errorMessage);
    expect(appError instanceof AppError).toBeTruthy();
  });

  it('should be throwable', () => {
    const errorMessage = 'This error should be throwable';

    expect(() => {
      throw new AppError(errorMessage);
    }).toThrow(errorMessage);
  });
});
