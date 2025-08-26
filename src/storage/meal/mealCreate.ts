import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { MealStorageDTO } from "./MealStorageDTO";

import { MEALS_COLLECTION } from "@storage/storageConfig";
import { mealsGetAll } from "./mealsGet";
import uuid from 'react-native-uuid';

const dictTranslate = {
    "name": "Nome",
    "description": "Descrição",
    "date": "Data",
    "time": "Hora",
    "isOnDiet": "Está dentro da dieta?"
}

export async function mealCreate(newMeal: MealStorageDTO) {
    try {
        const errorFields = Object.entries(newMeal).filter(([key, value]) => !String(value).trim() && key !== "id");
        if (errorFields.length > 0) {
            const textError = errorFields.reduce((text, [key, _], index) => {
                const translated = dictTranslate[key as keyof typeof dictTranslate] || key;
                return text + (index > 0 ? ", " : "") + translated;
            }, "Por favor, preencha o(s) campo(s): ")
            throw new AppError(textError);
        }

        const storageMeals = await mealsGetAll();

        const mealAlreadyExists = storageMeals.findIndex(meal => { 
            const isSameName = meal.name === newMeal.name;
            const isSameDate = String(meal.date) === String(newMeal.date);
            const isSameTime = String(meal.time) === String(newMeal.time);

            return isSameName && isSameDate && isSameTime;
        }) != -1;

        if (mealAlreadyExists) {
            throw new AppError('Já existe uma refeição cadastrada com esse nome nessa mesma data e horário');
        }

        newMeal.id = uuid.v4() as string;
        const storage = JSON.stringify([...storageMeals, newMeal]);

        await AsyncStorage.setItem(MEALS_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}