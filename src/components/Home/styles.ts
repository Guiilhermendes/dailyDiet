import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView).attrs({
    edges: ['top', 'left', 'right'],
})`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    padding: 22px 24px;
`;