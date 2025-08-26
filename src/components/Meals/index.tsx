import { useState, useCallback } from "react";
import { SectionList, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { 
    SeparatorSection,
    SeparatorItem,
    TextContainer,
    Container,
    Divider,
    Header,
    Title,
    Time,
    Item,
    Icon
} from "./styles";

import { 
    mealsGetAllToSectionList,
    SectionListMeals
} from "@storage/meal/mealsGet";
import { Loading } from "@components/Loading";

type Props = {
    marginTop?: string
}

export function Meals({
    marginTop
}: Props) {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true);
    const [meals, setMeals] = useState<SectionListMeals[]>([]);

    async function fetchMeals() {
        try {
            setIsLoading(true);
            const data = await mealsGetAllToSectionList();
            setIsLoading(false);
            setMeals(data);
        } catch (error) {
            console.log(error);
            Alert.alert('Refeições', 'Não foi possível carregar as refeições.');
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchMeals();
    }, []));

    function handleMealItem(id: string) {
        navigation.navigate("mealsDetails", { id })
    }

    return (
        <Container marginTop={marginTop}>
            {isLoading ? 
                <Loading /> :
                <SectionList
                    sections={meals}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <Item
                            onPress={() => handleMealItem(item.id)}
                        >
                            <TextContainer>
                                <Time>{item.time}</Time>
                                <Divider/>
                                <Title>{item.name}</Title>
                            </TextContainer>
                            <Icon isPositive={item.isOnDiet}/>
                        </Item>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <Header>
                            {title}
                        </Header>
                    )}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <SeparatorItem/>}
                    SectionSeparatorComponent={() => <SeparatorSection/>}
                    stickySectionHeadersEnabled={false}
                />
            }
        </Container>
    )
}