import styled, { css } from "styled-components/native";

export type SizeTypeStyleProps = 'SMALL' | 'LARGE';
export type ColorTypeStyleProps = 'DEFAULT' | 'POSITIVE' | 'NEGATIVE';

type Props = {
    sizeType: SizeTypeStyleProps,
    colorType?: ColorTypeStyleProps,
}

export const Container = styled.View<Props>`
    ${({ sizeType, colorType, theme }) => css`
        width: ${sizeType === 'SMALL' ? '48.3%' : '100%'};
        height: ${sizeType === 'SMALL' ? '107px' : '89px'};
        background-color: ${colorType === 'POSITIVE' ? theme.COLORS.GREEN_LIGHT : colorType === 'NEGATIVE' ? theme.COLORS.RED_LIGHT : theme.COLORS.GRAY_6};
    `};

    align-items: center;
    justify-content: center;

    border-radius: 8px;
    padding: 16px;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.XL}px;
        color: ${theme.COLORS.GRAY_1};
    `};

    text-align: center;
`;

export const SubTitle = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.GRAY_2};
    `};

    text-align: center;
`;