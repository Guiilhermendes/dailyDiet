import styled, { css } from "styled-components/native";

type MarginProps = {
    marginTop?: string
}

export const Container = styled.View<MarginProps>`
    height: 79px;
    justify-content: space-between;
    margin-top: ${({ marginTop }) => marginTop};
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        color: ${theme.COLORS.GRAY_1};
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`;
