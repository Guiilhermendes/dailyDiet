import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export type TitleColorType = 'POSITIVE' | 'NEGATIVE';

type TitleProps = {
    color?: TitleColorType
}

type SubTitleProps = {
    isBold?: boolean 
};

export const Container = styled(SafeAreaView).attrs({
    edges: ['top', 'left', 'right'],
})`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    align-items: center;
    justify-content: center;
    gap: 36px;
    padding: 0px 32px;
`;

export const TextContainer = styled.View`
    align-items: center;
    gap: 8px
`;

export const Title = styled.Text<TitleProps>`
    ${({ theme, color }) => css`
        font-size: ${theme.FONT_SIZE.XL}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLORS[color === 'POSITIVE' ? "GREEN_DARK" : "RED_DARK"]};
    `};
`;

export const SubTitle = styled.Text<SubTitleProps>`
    ${({ theme, isBold }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY[isBold ? "BOLD" : "REGULAR"]};
        color: ${theme.COLORS.GRAY_1};
        text-align: center;
    `};
`;

export const ImageView = styled.Image`
    width: 224px;
    height: 288px;
`;