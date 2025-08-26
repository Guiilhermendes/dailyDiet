export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            statistics: undefined;
            setMeals: {
                id?: string;
                isEdit?: boolean;
            };
            mealsDetails: {
                id: string;
            };
            feedback: {
                status: string;
            };
        }
    }
}