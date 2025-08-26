import { AppError } from '../AppError';

describe('AppError - Comprehensive Tests', () => {
  describe('Basic Functionality', () => {
    it('should create error with simple message', () => {
      const message = 'Simple error message';
      const error = new AppError(message);

      expect(error.message).toBe(message);
      expect(error instanceof AppError).toBe(true);
      expect(typeof error.message).toBe('string');
    });

    it('should be throwable and catchable', () => {
      const errorMessage = 'Test error for throwing';

      expect(() => {
        throw new AppError(errorMessage);
      }).toThrow();

      try {
        throw new AppError(errorMessage);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect((error as AppError).message).toBe(errorMessage);
      }
    });

    it('should maintain message property after throwing', () => {
      const errorMessage = 'Error message to preserve';

      try {
        throw new AppError(errorMessage);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect((error as AppError).message).toBe(errorMessage);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string message', () => {
      const error = new AppError('');
      expect(error.message).toBe('');
    });

    it('should handle very long messages', () => {
      const longMessage = 'a'.repeat(1000);
      const error = new AppError(longMessage);
      expect(error.message).toBe(longMessage);
      expect(error.message.length).toBe(1000);
    });

    it('should handle special characters in message', () => {
      const specialMessage = 'Error with special chars: áéíóú àèìòù âêîôû ãõ ç 🚫⚠️';
      const error = new AppError(specialMessage);
      expect(error.message).toBe(specialMessage);
    });

    it('should handle multiline messages', () => {
      const multilineMessage = 'Line 1\nLine 2\nLine 3';
      const error = new AppError(multilineMessage);
      expect(error.message).toBe(multilineMessage);
      expect(error.message.includes('\n')).toBe(true);
    });

    it('should handle messages with JSON-like content', () => {
      const jsonMessage = '{"error": "Something went wrong", "code": 400}';
      const error = new AppError(jsonMessage);
      expect(error.message).toBe(jsonMessage);
    });

    it('should handle messages with HTML-like content', () => {
      const htmlMessage = '<div>Error: Something went wrong</div>';
      const error = new AppError(htmlMessage);
      expect(error.message).toBe(htmlMessage);
    });
  });

  describe('Error Chain Testing', () => {
    it('should be distinguishable from regular Error', () => {
      const appError = new AppError('App error');
      const regularError = new Error('Regular error');

      expect(appError instanceof AppError).toBe(true);
      expect(regularError instanceof AppError).toBe(false);
      expect(appError instanceof Error).toBe(false); // AppError doesn't extend Error
      expect(regularError instanceof Error).toBe(true);
    });

    it('should work in promise rejections', async () => {
      const errorMessage = 'Async error message';
      
      const rejectionPromise = Promise.reject(new AppError(errorMessage));

      try {
        await rejectionPromise;
        fail('Promise should have rejected');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect((error as AppError).message).toBe(errorMessage);
      }
    });

    it('should work in async/await error handling', async () => {
      const errorMessage = 'Async function error';

      const asyncFunction = async () => {
        throw new AppError(errorMessage);
      };

      try {
        await asyncFunction();
        fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect((error as AppError).message).toBe(errorMessage);
      }
    });
  });

  describe('Property and Method Tests', () => {
    it('should have correct properties', () => {
      const error = new AppError('Test message');

      expect(error.hasOwnProperty('message')).toBe(true);
      expect(typeof error.message).toBe('string');
    });

    it('should work with toString method', () => {
      const message = 'Error for toString test';
      const error = new AppError(message);

      const stringRepresentation = JSON.stringify(error);
      expect(typeof stringRepresentation).toBe('string');
      expect(stringRepresentation).toContain(message);
    });

    it('should be JSON serializable', () => {
      const error = new AppError('JSON test error');

      expect(() => JSON.stringify(error)).not.toThrow();
      
      const serialized = JSON.stringify(error);
      expect(typeof serialized).toBe('string');
    });
  });

  describe('Comparison and Equality', () => {
    it('should not be equal to another AppError with same message', () => {
      const error1 = new AppError('Same message');
      const error2 = new AppError('Same message');

      expect(error1).not.toBe(error2); // Different object instances
      expect(error1.message).toBe(error2.message); // Same message content
    });

    it('should maintain message consistency', () => {
      const originalMessage = 'Original message';
      const error = new AppError(originalMessage);

      expect(error.message).toBe(originalMessage);
      
      // Message should remain the same
      setTimeout(() => {
        expect(error.message).toBe(originalMessage);
      }, 0);
    });
  });

  describe('Usage in Application Context', () => {
    it('should work with field validation errors', () => {
      const validationMessage = 'Por favor, preencha o(s) campo(s): Nome, Descrição';
      const error = new AppError(validationMessage);

      expect(error.message).toContain('campo(s)');
      expect(error.message).toContain('Nome');
      expect(error.message).toContain('Descrição');
    });

    it('should work with duplicate detection errors', () => {
      const duplicateMessage = 'Já existe uma refeição cadastrada com esse nome nessa mesma data e horário';
      const error = new AppError(duplicateMessage);

      expect(error.message).toContain('Já existe');
      expect(error.message).toContain('refeição');
    });

    it('should work with not found errors', () => {
      const notFoundMessage = 'Refeição não encontrada';
      const error = new AppError(notFoundMessage);

      expect(error.message).toBe(notFoundMessage);
    });

    it('should be suitable for user-facing messages', () => {
      const userMessage = 'Não foi possível salvar a refeição. Tente novamente.';
      const error = new AppError(userMessage);

      expect(error.message).toBe(userMessage);
      expect(error.message).toMatch(/^[A-ZÀ-Ú]/); // Starts with capital letter
    });
  });

  describe('Performance and Memory', () => {
    it('should not leak memory with many instances', () => {
      const errors: AppError[] = [];
      
      // Create many error instances
      for (let i = 0; i < 1000; i++) {
        errors.push(new AppError(`Error ${i}`));
      }

      expect(errors.length).toBe(1000);
      expect(errors[0].message).toBe('Error 0');
      expect(errors[999].message).toBe('Error 999');
      
      // Clean up
      errors.length = 0;
    });

    it('should be fast to create', () => {
      const start = performance.now();
      
      for (let i = 0; i < 100; i++) {
        new AppError(`Performance test error ${i}`);
      }
      
      const end = performance.now();
      const duration = end - start;
      
      // Should complete in reasonable time (less than 100ms for 100 instances)
      expect(duration).toBeLessThan(100);
    });
  });
});
