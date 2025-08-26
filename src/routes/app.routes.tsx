import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MealsDetails } from "@components/MealsDetails";
import { Statistics } from "@components/Statistics";
import { SetMeals } from "@components/SetMeals";
import { Feedback } from "@components/Feedback";
import { Home } from "@components/Home";

const {
    Navigator,
    Screen
} = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="home"
                component={Home}
            />
            <Screen
                name="statistics"
                component={Statistics}
            />
            <Screen
                name="setMeals"
                component={SetMeals}
            />
            <Screen
                name="feedback"
                component={Feedback}
            />
            <Screen
                name="mealsDetails"
                component={MealsDetails}
            />
        </Navigator>
    )
}