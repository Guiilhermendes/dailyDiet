import styled, { css }from "styled-components/native";
import { TextInput, TouchableOpacity, View } from "react-native";

export type WidthType = 'FULL' | 'HALF';
export type HeightType = 'LARGE' | 'SMALL';

type LabelProps = {
    width?: WidthType;
    height?: HeightType;
}

type ContainerProps = {
    height?: HeightType;
}

export const Label = styled.View<LabelProps>`
    width: ${({ width }) => width === "FULL" ? "100%" : "47%"};
    height: ${({ height }) => height === "LARGE" ? "142px" : "70px"};
    gap: 4px;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.GRAY_2};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};
`;

export const Container = styled(TextInput).attrs<ContainerProps>(({ theme, height }) => ({
    multiline: height === "LARGE",
    textAlignVertical: height === "LARGE" ? "top" : "center"
}))`
    flex: 1;

    min-height: ${({ height }) => height === "LARGE" ? "120px" : "48px"};
    max-height: ${({ height }) => height === "LARGE" ? "120px" : "48px"};

    ${({ theme }) => css`
        background-color: ${theme.COLORS.WHITE};
        color: ${theme.COLORS.GRAY_1};
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size : ${theme.FONT_SIZE.MD}px;
        border: solid 1px ${theme.COLORS.GRAY_5};
    `};

    border-radius: 6px;
    padding: 14px;
`;

export const DateTimeButton = styled(TouchableOpacity)<ContainerProps>`
    flex: 1;
    justify-content: center;

    min-height: ${({ height }) => height === "LARGE" ? "120px" : "48px"};
    max-height: ${({ height }) => height === "LARGE" ? "120px" : "48px"};

    ${({ theme }) => css`
        background-color: ${theme.COLORS.WHITE};
        border: solid 1px ${theme.COLORS.GRAY_5};
    `};

    border-radius: 6px;
    padding: 14px;
`;

export const DateTimeText = styled.Text`
    ${({ theme }) => css`
        color: ${theme.COLORS.GRAY_1};
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size : ${theme.FONT_SIZE.MD}px;
    `};
`;

export const ModalOverlay = styled(TouchableOpacity)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
`;

export const ModalContainer = styled(View)`
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px;
    padding-bottom: 40px;
    min-height: 300px;
`;

export const PickerContainer = styled(View)`
    align-items: center;
    flex: 1;
`;