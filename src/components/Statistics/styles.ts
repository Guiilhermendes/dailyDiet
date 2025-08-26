import styled, { css } from "styled-components/native";
import { ArrowLeft } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export type ColorTypeStyleProps = 'PRIMARY' | 'SECONDARY';

type Props = {
    type?: ColorTypeStyleProps
};

export const UpperContainer = styled.View<Props>`
    position: relative;

    flex: 1;
    background-color: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT };

    align-items: center;
    justify-content: center;
`;

export const Container = styled.View`
    flex: 3.3;
    background-color: ${({ theme }) => theme.COLORS.GRAY_7};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    margin-top: -20px;

    padding: 33px 24px;
    align-items: center;
`;

export const PercentTitle = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.XG}px;
        color: ${theme.COLORS.GRAY_1};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};
`;

export const PercentSubtitle = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.GRAY_2};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`;

export const IconWrapper = styled(TouchableOpacity)`
    position: absolute;
    top: 56px;
    left: 24px;
`;

export const Icon = styled(ArrowLeft).attrs<Props>(({ theme, type }) => ({
    size: 24,
    color: type === 'PRIMARY' ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK
}))``;

export const StatisticsTitle = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.GRAY_1};
    `};

    margin-bottom: 23px
`;

export const InfoBoxContainer = styled.View`
    width: 100%;
    gap: 12px;
`;