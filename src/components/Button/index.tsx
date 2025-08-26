import { TouchableOpacityProps } from "react-native";

import { 
    ColorTypeButton,
    IconButtonType,
    SizeTypeButton,
    ColorTypeTitle,
    ColorTypeIcon,
    RemoveIcon,
    CircleIcon,
    Container,
    EditIcon,
    Title,
    Icon,
} from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
    icon?: IconButtonType; 
    buttonColor?: ColorTypeButton;
    buttonSize?: SizeTypeButton;
    titleColor?: ColorTypeTitle;
    circleIconColor?: ColorTypeIcon;
}

export function Button({
    title,
    icon,
    buttonColor = 'DEFAULT',
    buttonSize = 'FULL',
    titleColor = 'PRIMARY',
    circleIconColor = 'POSITIVE',
    ...rest
}: Props) {
    const renderIcon = () => {
        if (!icon) return null;

        switch(icon) {
            case 'CIRCLE':
                return <CircleIcon colorIcon={circleIconColor} />
            case 'EDIT':
                return <EditIcon />
            case 'TRASH':
                return <RemoveIcon />
            case 'PLUS':
            default:
                return <Icon />
        }
    };

    return (
        <Container
            size={buttonSize}
            color={buttonColor}
            {...rest}
        >
            {renderIcon()}
            <Title color={titleColor} > 
                {title}
            </Title>
        </Container>
    );
}