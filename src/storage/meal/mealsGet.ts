import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS_COLLECTION } from "@storage/storageConfig";
import { MealStorageDTO } from "./MealStorageDTO";
import { AppError } from "@utils/AppError";

export type SectionListMeals = {
    title: string
    data: [{
        id: string
        time: string,
        name: string,
        isOnDiet: boolean
    }]
};

export async function mealsGetAll(): Promise<MealStorageDTO[]> {
    try {
        const storage = await AsyncStorage.getItem(MEALS_COLLECTION);
        const meals: MealStorageDTO[] = storage ? JSON.parse(storage) : [];
        return meals;
    } catch (error) { throw error; }
}

export async function mealGetById(id: string): Promise<MealStorageDTO> {
    try {
        const meals = await mealsGetAll();

        const selectedMeal: MealStorageDTO | undefined = meals.find(meal => meal.id === id);

        if (!selectedMeal) throw new AppError('Refeição não encontrada');

        return selectedMeal;
    } catch (error) {
        throw error;
    }
}

export async function mealsGetAllToSectionList(): Promise<SectionListMeals[]> {
    try {
        const meals = await mealsGetAll();

        const mealsFormatted: SectionListMeals[] = meals.reduce((previousValue: SectionListMeals[], currentValue) => {
            const result = previousValue;
            
            const currentDateFormatted = currentValue.date.replaceAll("/", ".");
            const dateIndex = result.findIndex((meal: SectionListMeals) => {
                return currentDateFormatted === meal.title;
            });
    
            if (dateIndex === -1) {
                const obj: SectionListMeals = {
                    title: currentDateFormatted,
                    data: [{
                        id: currentValue.id,
                        name: currentValue.name,
                        time: currentValue.time,
                        isOnDiet: currentValue.isOnDiet
                    }]
                };
    
                result.push(obj)
            } else {
                result[dateIndex].data.push({
                    id: currentValue.id,
                    name: currentValue.name,
                    time: currentValue.time,
                    isOnDiet: currentValue.isOnDiet
                });
            }
    
            return result
        }, []);

        return mealsFormatted;
    } catch (error) {
        throw error;
    }
}