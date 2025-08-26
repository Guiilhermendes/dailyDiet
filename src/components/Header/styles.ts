import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Logo = styled.Image`
    width: 82px;
    height: 37px;
`;

export const ProfileImg = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: solid 2px ${({ theme }) => theme.COLORS.GRAY_2};
`;

export const ChangesImgArea = styled(TouchableOpacity)``;