import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Platform, Keyboard } from "react-native";

import {
    DateAndTimeContainer,
    ButtonsContainer,
    UpperContainer,
    ButtonsTitle,
    IconWrapper,
    Container,
    Title,
    Form,
    Icon,
    StyledKeyboardAvoidingView,
    StyledScrollView
} from "./styles";

import { mealCreate } from "@storage/meal/mealCreate";
import { mealGetById } from "@storage/meal/mealsGet";
import { mealEditById } from "@storage/meal/mealEdit";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ColorTypeButton } from "@components/Button/styles";
import { useMeals } from "@contexts/MealContext";

type DietTypes = "YES" | "NO" | undefined;

type Props = {
    id?: string;
    isEdit?: boolean;
}

export function SetMeals() {
    const route = useRoute();
    const { 
        id,
        isEdit
    } = route.params as Props;

    const optionText = isEdit ? "Salvar alterações" : "Cadastrar refeição";
    const navigation = useNavigation();
    const { fetchMeals } = useMeals();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [dateObject, setDateObject] = useState(new Date());
    const [timeObject, setTimeObject] = useState(new Date());
    const [isOnDiet, setIsOnDiet] = useState<DietTypes>(undefined);

    const [buttonPositiveColor, setButtonPositiveColor] = useState<ColorTypeButton>("UNSELECT")
    const [buttonNegativeColor, setButtonNegativeColor] = useState<ColorTypeButton>("UNSELECT")

    function handleDismissKeyboard() {
        Keyboard.dismiss();
    }

    function handlePositive() {
        setButtonPositiveColor(buttonPositiveColor == "UNSELECT" ? "POSITIVE" : "UNSELECT");
        setButtonNegativeColor("UNSELECT");
        setIsOnDiet("YES");
    }

    function handleNegative() {
        setButtonNegativeColor(buttonNegativeColor == "UNSELECT" ? "NEGATIVE" : "UNSELECT");
        setButtonPositiveColor("UNSELECT");
        setIsOnDiet("NO");
    }

    function handleGoBack() {
        navigation.goBack()
    }

    function handleDateChange(selectedDate: Date) {
        setDateObject(selectedDate);
        const formattedDate = selectedDate.toLocaleDateString('pt-BR');
        setDate(formattedDate);
    }

    function handleTimeChange(selectedTime: Date) {
        setTimeObject(selectedTime);
        const formattedTime = selectedTime.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
        setTime(formattedTime);
    }

    async function fetchMealById() {
        if (isEdit && id) {
            try {
                const meal = await mealGetById(id);
                if (meal) {
                    setName(meal.name);
                    setDescription(meal.description);
                    setDate(meal.date);
                    setTime(meal.time);
                    
                    const [day, month, year] = meal.date.split('/');
                    const [hour, minute] = meal.time.split(':');
                    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                    const timeObj = new Date();
                    timeObj.setHours(parseInt(hour), parseInt(minute), 0, 0);
                    
                    setDateObject(dateObj);
                    setTimeObject(timeObj);
                    
                    setIsOnDiet(meal.isOnDiet ? "YES" : "NO");
                    setButtonPositiveColor(meal.isOnDiet ? "POSITIVE" : "UNSELECT");
                    setButtonNegativeColor(!meal.isOnDiet ? "NEGATIVE" : "UNSELECT");
                }
            } catch (error) {
                Alert.alert("Editar refeição", "Não foi possível carregar os dados da refeição.");
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchMealById();
    }, [id, isEdit]);

    useEffect(() => {
        if (!isEdit) {
            const now = new Date();
            const formattedDate = now.toLocaleDateString('pt-BR');
            const formattedTime = now.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            });
            setDate(formattedDate);
            setTime(formattedTime);
            setDateObject(now);
            setTimeObject(now);
        }
    }, [isEdit]);

    async function handleAddMeal() {
        try {
            const newMeal = {
                id: "",
                name,
                description,
                date,
                time,
                isOnDiet: isOnDiet === "YES" 
            };
            
            await mealCreate(newMeal);
            await fetchMeals();
            navigation.navigate('feedback', {
                status: isOnDiet === "YES" ? "POSITIVE" : "NEGATIVE"
            });
        } catch (error) {
            console.log({error})
            Alert.alert(optionText, JSON.stringify(error))
        }
    }

    async function handleEditMeal() {
        if (isEdit && id) {
            try {
                const updatedMeal = {
                    id,
                    name,
                    description,
                    date,
                    time,
                    isOnDiet: isOnDiet === "YES"
                };
                await mealEditById(id, updatedMeal);
                await fetchMeals();
                navigation.navigate('feedback', {
                    status: isOnDiet === "YES" ? "POSITIVE" : "NEGATIVE"
                });
            } catch (error) {
                Alert.alert("Editar refeição", "Não foi possível salvar as alterações.");
                console.log(error);
            }
        }
    }

    return (
        <StyledKeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <UpperContainer>
                <IconWrapper onPress={handleGoBack}>
                    <Icon />
                </IconWrapper>
                <Title>{isEdit ? "Editar refeição" : "Nova refeição"}</Title>
            </UpperContainer>
            <Container>
                <StyledScrollView>
                    <Form>
                    <Input
                        title="Nome"
                        autoCorrect={false}
                        returnKeyType="done"
                        onChangeText={setName}
                        value={name}
                        onSubmitEditing={handleDismissKeyboard}
                    />
                    <Input
                        title="Descrição"
                        height="LARGE"
                        autoCorrect={false}
                        returnKeyType="done"
                        onChangeText={setDescription}
                        value={description}
                        onSubmitEditing={handleDismissKeyboard}
                    />
                    <DateAndTimeContainer>
                        <Input
                            title="Data"
                            width="HALF"
                            inputType="date"
                            value={date}
                            onDateTimeChange={handleDateChange}
                        />
                        <Input
                            title="Hora"
                            width="HALF"
                            inputType="time"
                            value={time}
                            onDateTimeChange={handleTimeChange}
                        />
                    </DateAndTimeContainer>

                    <ButtonsTitle>Está dentro da dieta?</ButtonsTitle>
                    <ButtonsContainer>
                        <Button
                            title="Sim"
                            buttonColor={buttonPositiveColor}
                            titleColor="SECONDARY"
                            icon="CIRCLE"
                            buttonSize="PROPORTIONAL"
                            onPress={handlePositive}
                        />
                        <Button
                            title="Não"
                            buttonColor={buttonNegativeColor}
                            titleColor="SECONDARY"
                            icon="CIRCLE"
                            buttonSize="PROPORTIONAL"
                            circleIconColor="NEGATIVE"
                            onPress={handleNegative}
                        />
                    </ButtonsContainer>
                </Form>

                <Button 
                    title={optionText}
                    onPress={isEdit ? handleEditMeal : handleAddMeal}
                />
                </StyledScrollView>
            </Container>
        </StyledKeyboardAvoidingView>
    )
}