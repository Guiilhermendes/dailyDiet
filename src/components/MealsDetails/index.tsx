import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

import {
    SubInfoContainer,
    ButtonsContainer,
    UpperContainer,
    MealsSubTitle,
    InfoContainer,
    IconWrapper,
    StatusType,
    MealsTitle,
    StatusText,
    StatusTag,
    TimeLabel,
    Container,
    TimeInfo,
    Title,
    Icon,
    Tag
} from "./styles";
import { Loading } from "@components/Loading";
import { useState, useCallback } from "react";
import { ModalDelete } from "@components/ModalDelete";
import { Alert } from "react-native";

import { useFocusEffect, useRoute } from "@react-navigation/native";
import { mealGetById } from "@storage/meal/mealsGet";
import { mealRemoveById } from "@storage/meal/mealRemove";
import { MealStorageDTO } from "@storage/meal/MealStorageDTO";
import { useMeals } from "@contexts/MealContext";

type RouteParams = {
    id: string,
}

export function MealsDetails() {
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const { fetchMeals } = useMeals();

    const [isLoading, setIsLoading] = useState(true);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [meal, setMeal] = useState<MealStorageDTO>();
    
    const navigation = useNavigation();

    async function fetchMealById() {
        try {
            setIsLoading(true);
            const data = await mealGetById(id);
            setMeal(data);
        } catch (error) {
            console.log(error);
            Alert.alert('Detalhes da refeição', 'Não foi possível carregar os detalhes da refeição.');
        } finally {
            setIsLoading(false);
        }
    }
    
    useFocusEffect(useCallback(() => {
        fetchMealById();
    }, []));

    function handleGoBack() {
        navigation.goBack()
    }

    async function handleRemoveMeal() {
        try {
            await mealRemoveById(id);
            await fetchMeals();
            navigation.goBack();
        } catch (error) {
            console.log(error);
            Alert.alert('Detalhes da refeição', 'Não foi possível remover os detalhes da refeição.');
        }
    }

    async function handleEditMeal() {
        navigation.navigate('setMeals', { 
            id,
            isEdit: true
        });
    }

    if (isLoading) { return <Loading/> }

    const type: StatusType = meal?.isOnDiet ? 'POSITIVE' : 'NEGATIVE';
    return (
        <>
            <UpperContainer bgColor={type}>
                <IconWrapper onPress={handleGoBack}>
                    <Icon/>
                </IconWrapper>
                <Title>Refeição</Title>
            </UpperContainer>
            <Container>
                <InfoContainer>
                    <SubInfoContainer>
                        <MealsTitle>{meal?.name}</MealsTitle>
                        <MealsSubTitle>{meal?.description}</MealsSubTitle>
                    </SubInfoContainer>
                    <SubInfoContainer>
                        <TimeLabel>Data e hora</TimeLabel>
                        <TimeInfo>{meal?.date} às {meal?.time}</TimeInfo>
                    </SubInfoContainer>
                    <Tag>
                        <StatusTag colorIcon={type}/>
                        <StatusText>{type === 'POSITIVE' ? "dentro da dieta" : "fora da dieta"}</StatusText>
                    </Tag>
                </InfoContainer>
                <ButtonsContainer>
                    <Button
                        title="Editar refeição"
                        icon="EDIT"
                        onPress={handleEditMeal}
                    />
                    <Button
                        title="Exluir refeição"
                        icon="TRASH"
                        buttonColor="BACKWARDS"
                        titleColor="SECONDARY"
                        onPress={() => setShowModalDelete(true)}
                    />
                </ButtonsContainer>
            </Container>

            <ModalDelete
                isOpen={showModalDelete}
                closeFunction={() => setShowModalDelete(false)}
                removeFunction={handleRemoveMeal}
            />
        </>
    );
}