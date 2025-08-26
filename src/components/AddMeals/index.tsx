import { 
    Container,
    Title
} from "./styles";

import { useNavigation } from "@react-navigation/native"; 
import { Button } from "@components/Button";

type Props = {
    marginTop?: string
}

export function AddMeals({
    marginTop
}: Props) {
    const navigation = useNavigation();

    function handleAddMeals(){
        navigation.navigate('setMeals', {});
    } 

    return (
        <Container marginTop={marginTop}>
            <Title>Refeições</Title>
            <Button 
                title="Nova refeição"
                icon="PLUS"
                onPress={handleAddMeals}
            />
        </Container>
    );
}