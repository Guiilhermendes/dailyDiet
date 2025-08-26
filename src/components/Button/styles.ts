import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Plus, Circle, Trash, PencilSimpleLine } from "phosphor-react-native";

export type SizeTypeButton = 'FULL' | 'MEDIUM' | 'PROPORTIONAL';
export type ColorTypeButton = 'DEFAULT' | 'UNSELECT' | 'POSITIVE' | 'NEGATIVE' | 'BACKWARDS';

export type IconButtonType = 'PLUS' | 'CIRCLE' | 'EDIT' | 'TRASH';

export type ColorTypeTitle = 'PRIMARY' | 'SECONDARY';
export type ColorTypeIcon = 'POSITIVE' | 'NEGATIVE';

type ContainerProps = {
    size?: SizeTypeButton;
    color?: ColorTypeButton;
}

type TitleProps = {
    color?: ColorTypeTitle
}

type CircleIconProps = {
    colorIcon?: ColorTypeIcon
}

const getBgColor = (theme: any, color?: ColorTypeButton) => {
    const buttonColors = {
        DEFAULT: theme.COLORS.GRAY_2,
        UNSELECT: theme.COLORS.GRAY_6,
        POSITIVE: theme.COLORS.GREEN_LIGHT,
        NEGATIVE: theme.COLORS.RED_LIGHT,
        BACKWARDS: theme.COLORS.WHITE,
    };

    return buttonColors[color ?? 'DEFAULT'];
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
    ${({ theme, color, size }) => css`
        background-color: ${getBgColor(theme, color)};
        width: ${size === 'PROPORTIONAL' ? '48.8%' : size === 'MEDIUM' ? '191px' : '100%'};
        border: ${color === 'POSITIVE' ? `solid 1px ${theme.COLORS.GREEN_DARK}` : color === 'NEGATIVE' ? `solid 1px ${theme.COLORS.RED_DARK}` : color === 'BACKWARDS' ? `solid 1px ${theme.COLORS.GRAY_1}` : 'none'}
    `};

    height: 50px;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
`;

export const Title = styled.Text<TitleProps>`
    ${({ theme, color }) => css`
        color: ${color === 'PRIMARY' ? theme.COLORS.WHITE : theme.COLORS.GRAY_1 };
        font-size: ${theme.FONT_SIZE.SM}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};
`;

export const Icon = styled(Plus).attrs(({ theme }) => ({
    size: 18,
    color: theme.COLORS.WHITE
}))``;

export const EditIcon = styled(PencilSimpleLine).attrs(({ theme }) => ({
    size: 18,
    color: theme.COLORS.WHITE
}))``;

export const RemoveIcon = styled(Trash).attrs(({ theme }) => ({
    size: 18,
    color: theme.COLORS.GRAY_1
}))``;

export const CircleIcon = styled(Circle).attrs<CircleIconProps>(({ theme, colorIcon }) => ({
    size: 8,
    color: colorIcon === 'POSITIVE' ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK,
    weight: "fill"
}))``;