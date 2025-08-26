import styled, { css } from "styled-components/native";

export type Props = {
    isOpen: boolean,
    closeFunction: () => void
}

export const Modal = styled.Modal.attrs<Props>(({ isOpen, closeFunction }) => ({
    animationType: 'fade',
    transparent: true,
    visible: isOpen,
    onRequestClose: closeFunction
}))``;

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.25);
`;

export const Content = styled.View`
    width: 327px;
    height: 192px;
    
    border-radius: 8px;

    background-color: ${({ theme }) => theme.COLORS.GRAY_7};

    gap: 32px;
    padding: 24px;

    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.LG}px;
        color: ${theme.COLORS.GRAY_2};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};

    text-align: center;
`;

export const ButtonsContainer = styled.View`
    width: auto;
    height: auto;
    gap: 12px;
    flex-direction: row;
`