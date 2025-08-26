import AsyncStorage from "@react-native-async-storage/async-storage";
import { mealsGetAll } from "./mealsGet";
import { MealStorageDTO } from "./MealStorageDTO";
import { MEALS_COLLECTION } from "@storage/storageConfig";

export async function mealEditById(mealId: string, updatedMeal: MealStorageDTO) {
    try {
        const storedMeals = await mealsGetAll();
        const mealsWithUpdate = storedMeals.map(meal => {
            if (meal.id === mealId) {
                return { ...updatedMeal };
            }
            return meal;
        });

        const storage = JSON.stringify(mealsWithUpdate);
        await AsyncStorage.setItem(MEALS_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}
