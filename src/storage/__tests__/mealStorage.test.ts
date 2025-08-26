import AsyncStorage from '@react-native-async-storage/async-storage';
import { mealCreate } from '../meal/mealCreate';
import { mealsGetAll, mealGetById } from '../meal/mealsGet';
import { MealStorageDTO } from '../meal/MealStorageDTO';

// Mock AsyncStorage
const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

// Mock UUID
jest.mock('react-native-uuid', () => ({
  v4: () => 'test-uuid-generated',
}));

describe('Meal Storage Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockMeal: MealStorageDTO = {
    id: 'test-id',
    name: 'Test Meal',
    description: 'Test Description',
    date: '25/08/2025',
    time: '14:30',
    isOnDiet: true,
  };

  describe('mealsGetAll', () => {
    it('should return all meals', async () => {
      const meals = [mockMeal];
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(meals));

      const result = await mealsGetAll();
      expect(result).toEqual(meals);
    });

    it('should return empty array when no meals exist', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce(null);

      const result = await mealsGetAll();
      expect(result).toEqual([]);
    });
  });

  describe('mealCreate', () => {
    it('should create a new meal successfully', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce('[]');
      mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

      const newMeal = { ...mockMeal, id: '' };
      await mealCreate(newMeal);

      expect(mockAsyncStorage.setItem).toHaveBeenCalled();
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('test-uuid-generated')
      );
    });

    it('should validate required fields', async () => {
      const invalidMeal = { ...mockMeal, name: '', id: '' };

      try {
        await mealCreate(invalidMeal);
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.message).toContain('Por favor, preencha o(s) campo(s)');
      }
    });
  });

  describe('mealGetById', () => {
    it('should return meal by id', async () => {
      const meals = [mockMeal];
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(meals));

      const result = await mealGetById('test-id');
      expect(result).toEqual(mockMeal);
    });

    it('should handle meal not found', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce('[]');

      try {
        await mealGetById('non-existent-id');
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.message).toBe('Refeição não encontrada');
      }
    });
  });
});
