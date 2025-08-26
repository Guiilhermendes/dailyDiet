import { useMeals } from '../MealContext';

describe('MealContext', () => {
  it('should export useMeals hook', () => {
    expect(useMeals).toBeDefined();
    expect(typeof useMeals).toBe('function');
  });
});
