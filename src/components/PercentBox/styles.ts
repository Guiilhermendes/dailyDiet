import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { ArrowUpRight } from "phosphor-react-native";

export type ColorTypeStyleProps = 'PRIMARY' | 'SECONDARY';

type Props = {
    type?: ColorTypeStyleProps,
    marginTop?: string
};

export const Container = styled(TouchableOpacity)<Props>`
    position: relative;

    background-color: ${({ theme, type }) => type == 'PRIMARY' ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
    height: 102px;

    padding: 20px 16px;
    gap: 2px;

    align-items: center;
    justify-content: center;

    border-radius: 8px;
    margin-top: ${({ marginTop }) => marginTop};
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.XG}px;
        color: ${theme.COLORS.GRAY_1};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};
`;

export const SubTitle = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.GRAY_2};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`;

export const IconWrapper = styled.View`
    position: absolute;
    top: 8px;
    right: 8px;
`;

export const Icon = styled(ArrowUpRight).attrs<Props>(({ theme, type }) => ({
    size: 24,
    color: type == 'PRIMARY' ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK
}))`

`;