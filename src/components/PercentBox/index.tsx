import { TouchableOpacityProps } from "react-native";
import { 
    ColorTypeStyleProps,
    IconWrapper,
    Container,
    SubTitle,
    Title,
    Icon
} from "./styles";
import { useMeals } from "@contexts/MealContext";

type Props = TouchableOpacityProps & {
    type?: ColorTypeStyleProps
    marginTop?: string
}

export function PercentBox({
    type = 'PRIMARY',
    marginTop,
    ...rest
}: Props) {
    const { percent } = useMeals();

    return (
        <Container 
            {...rest}
            type={type}
            marginTop={marginTop}
        >
            <IconWrapper>
                <Icon type={type} />
            </IconWrapper>
            <Title>{percent.toFixed(2).replace('.', ',')}%</Title>
            <SubTitle>das refeições dentro da dieta</SubTitle>
        </Container>
    );
}