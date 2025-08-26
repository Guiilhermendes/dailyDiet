import styled, { css } from "styled-components/native";
import { ArrowLeft } from "phosphor-react-native";
import { TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";

export const UpperContainer = styled.View`
    position: relative;

    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.GRAY_5 };

    align-items: center;

    padding-left: 24px;
    padding-right: 24px;

    flex-direction: row;

    gap: 92px
`;

export const Container = styled.View`
    flex: 4.5;
    background-color: ${({ theme }) => theme.COLORS.GRAY_7};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    margin-top: -20px;

    padding: 40px 24px 20px 24px;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.LG}px;
        color: ${theme.COLORS.GRAY_1};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};

    margin-top: 12px
`;

export const IconWrapper = styled(TouchableOpacity)`
    width: auto;
    height: auto;
`;

export const Icon = styled(ArrowLeft).attrs(({ theme }) => ({
    size: 24,
    color: theme.COLORS.GRAY_2
}))`
    margin-top: 12px
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    gap: 24px;
    margin-bottom: 24px;
`;

export const DateAndTimeContainer = styled.View`
    flex-direction: row;
    gap: 20px;
`

export const ButtonsTitle = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.GRAY_2};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};
`;

export const ButtonsContainer = styled.View`
    flex-direction: row;
    gap: 8px;
    margin-top: -20px;
`;

export const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
    flex: 1;
`;

export const StyledScrollView = styled(ScrollView).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { flexGrow: 1 },
    keyboardShouldPersistTaps: "handled"
})``;