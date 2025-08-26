import styled, { css } from "styled-components/native";
import { Circle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type MarginProps = {
    marginTop?: string
}

type ColorIconProps = {
    isPositive?: boolean
}

export const Container = styled.View<MarginProps>`
    flex: 1;
    margin-top: ${({ marginTop }) => marginTop};
`;

export const Item = styled(TouchableOpacity)`
    height: 49px;
    padding: 14px 16px 14px 12px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_5};
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;

export const Header = styled.Text`
    ${({ theme }) => css`
        color: ${theme.COLORS.GRAY_1};
        font-size: ${theme.FONT_SIZE.LG}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};

    margin-bottom: -16px;
`;

export const TextContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 273px;
`

export const Time = styled.Text`
    ${({ theme }) => css`
        color: ${theme.COLORS.GRAY_1};
        font-size: ${theme.FONT_SIZE.PP}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};

    width: 32px;
`;

export const Divider = styled.View`
    height: 14px;
    border: .5px solid ${({ theme }) => theme.COLORS.GRAY_4};
`;

export const Title = styled.Text.attrs({
    numberOfLines: 1,
    ellipsizeMode: 'tail'
})`
    ${({ theme }) => css`
        color: ${theme.COLORS.GRAY_2};
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};

    width: 217px;
`;

export const SeparatorItem = styled.View`
    height: 8px;
`;

export const SeparatorSection = styled.View`
    height: 24px;
`;

export const Icon = styled(Circle).attrs<ColorIconProps>(({ theme, isPositive }) => ({
    size: 14,
    color: isPositive ? theme.COLORS.GREEN : theme.COLORS.RED,
    weight: "fill"
}))``;