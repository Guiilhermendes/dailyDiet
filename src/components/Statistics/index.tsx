import { 
    ColorTypeStyleProps,
    InfoBoxContainer,
    PercentSubtitle,
    StatisticsTitle,
    UpperContainer,
    PercentTitle,
    IconWrapper,
    Container,
    Icon
} from "./styles";

import { useNavigation } from "@react-navigation/native";
import { InfoBox } from "@components/InfoBox";
import { useMeals } from "@contexts/MealContext";

type Props = {
    type?: ColorTypeStyleProps
}

export function Statistics({
    type = 'PRIMARY'
}: Props) {
    const navigation = useNavigation();
    const { 
        percent,
        onDietCount,
        outDietCount,
        totalMeals,
        bestSequenceOnDiet
    } = useMeals();

    function handleBackToHome() {
        navigation.goBack();
    }
    
    return (
        <>
            <UpperContainer type={type}>
                <IconWrapper onPress={handleBackToHome}>
                    <Icon type={type}/>
                </IconWrapper>
                <PercentTitle>{percent.toFixed(2).replace('.', ',')}%</PercentTitle>
                <PercentSubtitle>das refeições dentro da dieta</PercentSubtitle>
            </UpperContainer>

            <Container>
                <StatisticsTitle>Estatísticas gerais</StatisticsTitle>
                <InfoBoxContainer>
                    <InfoBox
                        size="LARGE"
                        title={String(bestSequenceOnDiet)}
                        subTitle="melhor sequência de pratos dentro da dieta"
                    />

                    <InfoBox
                        size="LARGE"
                        title={String(totalMeals)}
                        subTitle="refeiçõe(s) registrada(s)"
                    />

                    <InfoBoxContainer style={{flexDirection: "row"}}>
                        <InfoBox
                            size="SMALL"
                            color="POSITIVE"
                            title={String(onDietCount)}
                            subTitle="refeiçõe(s) dentro da dieta"
                        />

                        <InfoBox
                            size="SMALL"
                            color="NEGATIVE"
                            title={String(outDietCount)}
                            subTitle="refeiçõe(s) fora da dieta"
                        />
                    </InfoBoxContainer>
                </InfoBoxContainer>
            </Container>
        </>
    )
}