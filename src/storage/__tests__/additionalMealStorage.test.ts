import { mealEditById } from '../meal/mealEdit';
import { mealRemoveById } from '../meal/mealRemove';
import { mealsGetAllToSectionList } from '../meal/mealsGet';
import { MealStorageDTO } from '../meal/MealStorageDTO';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('Additional Meal Storage Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockMeal: MealStorageDTO = {
    id: 'test-id-1',
    name: 'Test Meal',
    description: 'Test Description',
    date: '25/08/2025',
    time: '14:30',
    isOnDiet: true,
  };

  const mockMeal2: MealStorageDTO = {
    id: 'test-id-2',
    name: 'Test Meal 2',
    description: 'Test Description 2',
    date: '25/08/2025',
    time: '18:00',
    isOnDiet: false,
  };

  describe('mealEditById', () => {
    it('should edit meal successfully', async () => {
      const existingMeals = [mockMeal, mockMeal2];
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(existingMeals));
      mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

      const updatedMeal = { ...mockMeal, name: 'Updated Meal Name' };
      await mealEditById('test-id-1', updatedMeal);

      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('Updated Meal Name')
      );
    });

    it('should maintain other meals when editing one', async () => {
      const existingMeals = [mockMeal, mockMeal2];
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(existingMeals));
      mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

      const updatedMeal = { ...mockMeal, name: 'Updated Meal' };
      await mealEditById('test-id-1', updatedMeal);

      const savedData = JSON.parse((mockAsyncStorage.setItem as jest.Mock).mock.calls[0][1]);
      expect(savedData).toHaveLength(2);
      expect(savedData[1]).toEqual(mockMeal2); // Second meal unchanged
    });

    it('should handle storage errors', async () => {
      mockAsyncStorage.getItem.mockRejectedValueOnce(new Error('Storage error'));

      await expect(mealEditById('test-id', mockMeal)).rejects.toThrow('Storage error');
    });
  });

  describe('mealRemoveById', () => {
    it('should remove meal by id successfully', async () => {
      const existingMeals = [mockMeal, mockMeal2];
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(existingMeals));
      mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

      await mealRemoveById('test-id-1');

      const savedData = JSON.parse((mockAsyncStorage.setItem as jest.Mock).mock.calls[0][1]);
      expect(savedData).toHaveLength(1);
      expect(savedData[0]).toEqual(mockMeal2);
    });

    it('should handle non-existent meal removal gracefully', async () => {
      const existingMeals = [mockMeal];
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(existingMeals));
      mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

      await mealRemoveById('non-existent-id');

      const savedData = JSON.parse((mockAsyncStorage.setItem as jest.Mock).mock.calls[0][1]);
      expect(savedData).toHaveLength(1); // Original meal still there
      expect(savedData[0]).toEqual(mockMeal);
    });

    it('should handle empty storage when removing', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce('[]');
      mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

      await mealRemoveById('any-id');

      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        '[]'
      );
    });
  });

  describe('mealsGetAllToSectionList', () => {
    it('should format meals for section list correctly', async () => {
      const meals = [
        { ...mockMeal, date: '25/08/2025', time: '08:00' },
        { ...mockMeal2, id: 'test-id-2', date: '25/08/2025', time: '12:00' },
        { ...mockMeal, id: 'test-id-3', date: '26/08/2025', time: '18:00' },
      ];
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(meals));

      const result = await mealsGetAllToSectionList();

      expect(result).toHaveLength(2); // Two different dates
      expect(result[0].title).toBe('25.08.2025');
      expect(result[0].data).toHaveLength(2);
      expect(result[1].title).toBe('26.08.2025');
      expect(result[1].data).toHaveLength(1);
    });

    it('should group meals by date correctly', async () => {
      const meals = [
        { ...mockMeal, id: '1', date: '25/08/2025', time: '08:00', name: 'Breakfast' },
        { ...mockMeal, id: '2', date: '25/08/2025', time: '12:00', name: 'Lunch' },
        { ...mockMeal, id: '3', date: '25/08/2025', time: '19:00', name: 'Dinner' },
      ];
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(meals));

      const result = await mealsGetAllToSectionList();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('25.08.2025');
      expect(result[0].data).toHaveLength(3);
      
      // Check that all meals are included
      const mealNames = result[0].data.map(meal => meal.name);
      expect(mealNames).toContain('Breakfast');
      expect(mealNames).toContain('Lunch');
      expect(mealNames).toContain('Dinner');
    });

    it('should handle empty meals array', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce('[]');

      const result = await mealsGetAllToSectionList();

      expect(result).toEqual([]);
    });

    it('should preserve meal properties in section list format', async () => {
      const meal = {
        id: 'test-id',
        name: 'Test Meal',
        description: 'Description',
        date: '25/08/2025',
        time: '14:30',
        isOnDiet: true,
      };
      mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([meal]));

      const result = await mealsGetAllToSectionList();

      expect(result[0].data[0]).toEqual({
        id: 'test-id',
        name: 'Test Meal',
        time: '14:30',
        isOnDiet: true,
      });
    });
  });
});
