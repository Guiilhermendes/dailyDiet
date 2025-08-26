import { 
    TitleColorType,
    TextContainer,
    ImageView,
    Container,
    SubTitle,
    Title
} from "./styles";

import positive from '@assets/positive.png'
import negative from '@assets/negative.png'

import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";

type Props = {
    status?: TitleColorType
}

export function Feedback() {
    const navigation = useNavigation();
    const route = useRoute();

    const { status } = route.params as Props;

    function handleGoHome() {
        navigation.navigate("home")
    };

    return (
        <Container>
            <TextContainer>
                <Title color={status}>{status === 'POSITIVE' ? "Continue assim!" : "Que pena!"}</Title>
                <SubTitle>
                    {status === 'POSITIVE' ? (
                        <>
                            Você continua <SubTitle isBold>dentro da dieta.</SubTitle> Muito bem!
                        </>
                    ) : (
                        <>
                            Você <SubTitle isBold>saiu da dieta</SubTitle> dessa vez, mas continue se esforçando e não desista!
                        </>
                    )}
                </SubTitle>
            </TextContainer>
            <ImageView source={status === 'POSITIVE' ? positive : negative} />
            <Button
                title="Ir para a página inicial"
                buttonSize="MEDIUM"
                onPress={handleGoHome}
            />
        </Container>
    );
}