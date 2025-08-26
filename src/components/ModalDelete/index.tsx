import { Button } from "@components/Button";
import {
    ButtonsContainer,
    Container,
    Content,
    Title,
    Modal,
    Props
} from "./styles";

type ModalDeleteProps = Props & {
    removeFunction: () => void
}

export function ModalDelete({
    isOpen,
    closeFunction,
    removeFunction
}: ModalDeleteProps) {
    return (
        <Modal 
            isOpen={isOpen}
            closeFunction={closeFunction}
        >
            <Container>
                <Content>
                    <Title>Deseja realmente excluir o registro da refeição?</Title>
                    <ButtonsContainer>
                        <Button
                            title="Cancelar"
                            buttonColor="BACKWARDS"
                            titleColor="SECONDARY"
                            buttonSize="PROPORTIONAL"
                            onPress={closeFunction}
                        />
                        <Button
                            title="Sim, excluir"
                            buttonSize="PROPORTIONAL"
                            onPress={removeFunction}
                        />
                    </ButtonsContainer>
                </Content>
            </Container>
        </Modal>
    )
}