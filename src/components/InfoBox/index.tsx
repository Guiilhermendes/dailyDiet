import {
    ColorTypeStyleProps,
    SizeTypeStyleProps,
    Container,
    SubTitle,
    Title,
} from "./styles";

type Props = {
    size: SizeTypeStyleProps,
    color?: ColorTypeStyleProps,
    title: string,
    subTitle: string
}

export function InfoBox({
    color = 'DEFAULT',
    subTitle,
    title,
    size
}: Props) {
    return (
        <Container
            sizeType={size}
            colorType={color}
        >
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
        </Container>
    )
}