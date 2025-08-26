import AsyncStorage from "@react-native-async-storage/async-storage";
import { MealStorageDTO } from "./MealStorageDTO";
import { mealsGetAll } from "./mealsGet";
import { MEALS_COLLECTION } from "@storage/storageConfig";

export async function mealRemoveById(id: string) {
    try {
        const storageMeals: MealStorageDTO[] = await mealsGetAll();
        const meals = storageMeals.filter(meal => meal.id !== id);
        await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(meals));
    } catch (error) {
        throw error;
    }
}