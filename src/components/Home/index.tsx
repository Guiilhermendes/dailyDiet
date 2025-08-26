import { 
    Container,
} from "./styles";

import { useNavigation } from '@react-navigation/native';
import { useEffect } from "react";

import { PercentBox } from "@components/PercentBox";
import { AddMeals } from "@components/AddMeals";
import { Header } from "@components/Header";
import { Meals } from "@components/Meals";
import { useMeals } from "@contexts/MealContext";

export function Home() {
    const navigation = useNavigation();
    const { fetchMeals } = useMeals();

    function handleStatistics() {
        navigation.navigate('statistics')
    }

    useEffect(() => {
        fetchMeals();
    }, []);

    return (
        <Container>
            <Header/>
            <PercentBox 
                marginTop="33px"
                onPress={handleStatistics}
            />
            <AddMeals marginTop="40px"/>
            <Meals marginTop="32px"/>
        </Container>
    );
}