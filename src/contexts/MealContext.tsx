import React, {
    createContext,
    useState,
    ReactNode,
    useContext,
    useCallback
} from 'react';
import { mealsGetAll } from '@storage/meal/mealsGet';

type MealContextData = {
    fetchMeals: () => Promise<void>;
    percent: number;
    onDietCount: number;
    outDietCount: number;
    totalMeals: number;
    bestSequenceOnDiet: number;
};

const MealContext = createContext<MealContextData>({} as MealContextData);

type MealProviderProps = {
    children: ReactNode;
}

function MealProvider({ children }: MealProviderProps) {
    const [percent, setPercent] = useState(0);
    const [onDietCount, setOnDietCount] = useState(0);
    const [outDietCount, setOutDietCount] = useState(0);
    const [totalMeals, setTotalMeals] = useState(0);
    const [bestSequenceOnDiet, setBestSequenceOnDiet] = useState(0);

    const fetchMeals = useCallback(async () => {
        try {
            const data = await mealsGetAll();

            const sortedData = data.sort((a, b) => {
                const dateA = new Date(`${a.date.split('.').reverse().join('-')}T${a.time}:00`);
                const dateB = new Date(`${b.date.split('.').reverse().join('-')}T${b.time}:00`);
                return dateA.getTime() - dateB.getTime();
            });

            let currentSequence = 0;
            let maxSequence = 0;

            for (const meal of sortedData) {
                if (meal.isOnDiet) {
                    currentSequence++;
                } else {
                    if (currentSequence > maxSequence) {
                        maxSequence = currentSequence;
                    }
                    currentSequence = 0;
                }
            }

            if (currentSequence > maxSequence) {
                maxSequence = currentSequence;
            }
            
            setBestSequenceOnDiet(maxSequence);

            const mealsOnDiet = data.filter(meal => meal.isOnDiet).length;
            const mealsOutDiet = data.filter(meal => !meal.isOnDiet).length;

            const totalMeals = data.length;
            const newPercent = totalMeals > 0 ? (mealsOnDiet / totalMeals) * 100 : 0;

            setPercent(newPercent);
            setOnDietCount(mealsOnDiet);
            setOutDietCount(mealsOutDiet);
            setTotalMeals(totalMeals);
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <MealContext.Provider value={{
            fetchMeals,

            percent,
            onDietCount,
            outDietCount,
            totalMeals,
            bestSequenceOnDiet
        }}>
            {children}
        </MealContext.Provider>
    );
}

function useMeals() {
    const context = useContext(MealContext);
    return context;
}

export { MealProvider, useMeals };
