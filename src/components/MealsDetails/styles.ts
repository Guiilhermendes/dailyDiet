import styled, { css } from "styled-components/native";
import { ArrowLeft } from "phosphor-react-native";
import { Circle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export type StatusType = 'POSITIVE' | 'NEGATIVE';

type UpperContainerProps = {
    bgColor?: StatusType
}

type StatusTypeProps = {
    colorIcon?: StatusType
}

export const UpperContainer = styled.View<UpperContainerProps>`
    position: relative;

    flex: 1;
    background-color: ${({ theme, bgColor }) => theme.COLORS[bgColor === 'POSITIVE' ? "GREEN_LIGHT" : "RED_LIGHT"] };

    align-items: center;

    padding-left: 24px;
    padding-right: 24px;

    flex-direction: row;

    gap: 115px
`;

export const Container = styled.View`
    flex: 4.5;
    background-color: ${({ theme }) => theme.COLORS.GRAY_7};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    margin-top: -20px;

    padding: 40px 24px;

    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.LG}px;
        color: ${theme.COLORS.GRAY_1};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};

    margin-top: 12px
`;

export const Icon = styled(ArrowLeft).attrs(({ theme }) => ({
    size: 24,
    color: theme.COLORS.GRAY_2
}))`
    margin-top: 12px
`;

export const InfoContainer = styled.View`
    width: 100%;
    height: auto;
    gap: 24px;
`;

export const SubInfoContainer = styled.View`
    width: 100%;
    height: auto;
    gap: 8px;
`;

export const MealsTitle = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.XL}px;
        color: ${theme.COLORS.GRAY_1};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};
`;

export const MealsSubTitle = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.GRAY_2};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`;

export const TimeLabel = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.GRAY_1};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};
`;

export const TimeInfo = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.GRAY_2};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`;

export const Tag = styled.View`
    height: 34px;
    width: 144px;

    align-items: center;
    justify-content: center;

    border-radius: 10%;

    background-color: ${({ theme }) => theme.COLORS.GRAY_6};

    gap: 5px;
    flex-direction: row;
`;

export const StatusTag = styled(Circle).attrs<StatusTypeProps>(({ theme, colorIcon }) => ({
    size: 8,
    color: colorIcon === 'POSITIVE' ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK,
    weight: 'fill'
}))``;

export const StatusText = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.GRAY_1};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`;

export const ButtonsContainer = styled.View`
    width: 100%;
    height: auto;
    gap: 9px;
`;

export const IconWrapper = styled(TouchableOpacity)`
    width: auto;
    height: auto;
`;