import { 
    PickerContainer,
    DateTimeButton,
    ModalContainer,
    DateTimeText,
    ModalOverlay,
    HeightType,
    WidthType,
    Container,
    Label,
    Title,
} from "./styles";

import { TextInput, TextInputProps, Platform, Modal } from "react-native";
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

type MaskType = "date" | "time";
type InputType = "text" | "date" | "time";

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>;
    title?: string;
    height?: HeightType;
    width?: WidthType;
    maskType?: MaskType;
    inputType?: InputType;
    onDateTimeChange?: (date: Date) => void;
}

function maskDate(value: string) {
    value = value.replace(/\D/g, "");
    if (value.length > 4) value = value.replace(/^(\d{2})(\d{2})(\d{0,4}).*/, "$1/$2/$3");
    else if (value.length > 2) value = value.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
    return value.slice(0, 10);
}

function maskTime(value: string) {
    value = value.replace(/\D/g, "");
    if (value.length > 2) value = value.replace(/^(\d{2})(\d{0,2})/, "$1:$2");
    return value.slice(0, 5);
}

export function Input({
    inputRef,
    title,
    height = "SMALL",
    width = "FULL",
    maskType,
    inputType = "text",
    onDateTimeChange,
    value,
    onChangeText,
    ...rest
}: Props) {
    const [internalValue, setInternalValue] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (value && inputType === "date") {
            try {
                const [day, month, year] = value.split('/');
                const parsedDay = parseInt(day, 10);
                const parsedMonth = parseInt(month, 10) - 1;
                const parsedYear = parseInt(year, 10);
                
                if (!isNaN(parsedDay) && !isNaN(parsedMonth) && !isNaN(parsedYear)) {
                    setCurrentDate(new Date(parsedYear, parsedMonth, parsedDay));
                } else {
                    setCurrentDate(new Date());
                }
            } catch (error) {
                console.log('Erro ao inicializar data:', error);
                setCurrentDate(new Date());
            }
        } else if (value && inputType === "time") {
            try {
                const [hour, minute] = value.split(':');
                const parsedHour = parseInt(hour, 10);
                const parsedMinute = parseInt(minute, 10);
                
                if (!isNaN(parsedHour) && !isNaN(parsedMinute)) {
                    const timeDate = new Date();
                    timeDate.setHours(parsedHour, parsedMinute, 0, 0);
                    setCurrentDate(timeDate);
                } else {
                    setCurrentDate(new Date());
                }
            } catch (error) {
                console.log('Erro ao inicializar hora:', error);
                setCurrentDate(new Date());
            }
        } else if (!value && (inputType === "date" || inputType === "time")) {
            setCurrentDate(new Date());
        }
    }, [value, inputType]);

    const handleChangeText = (text: string) => {
        let masked = text;
        if (maskType === "date") masked = maskDate(text);
        else if (maskType === "time") masked = maskTime(text);
        setInternalValue(masked);
        if (onChangeText) onChangeText(masked);
    };

    const handleDateTimeChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setCurrentDate(selectedDate);
            if (onDateTimeChange) {
                onDateTimeChange(selectedDate);
            }
        }
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
    };

    const handleButtonPress = () => {
        setShowDatePicker(true);
    };

    const handleModalClose = () => {
        setShowDatePicker(false);
    };

    const formatDateDisplay = (date: Date) => {
        return date.toLocaleDateString('pt-BR');
    };

    const formatTimeDisplay = (date: Date) => {
        return date.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    };

    const getDisplayValue = () => {
        if (inputType === "date") {
            if (!value || value.trim() === '') {
                return formatDateDisplay(new Date());
            }
            return value;
        } else if (inputType === "time") {
            if (!value || value.trim() === '') {
                return formatTimeDisplay(new Date());
            }
            return value;
        }
        return maskType
            ? (value !== undefined ? value : internalValue)
            : value;
    };

    const getPickerValue = () => {
        return currentDate;
    };

    const inputOnChangeText = maskType
        ? handleChangeText
        : onChangeText;

    if (inputType === "date" || inputType === "time") {
        return (
            <>
                <Label 
                    width={width}
                    height={height}
                >
                    <Title>{title}</Title>
                    <DateTimeButton 
                        height={height}
                        onPress={handleButtonPress}
                        activeOpacity={0.7}
                    >
                        <DateTimeText>{getDisplayValue()}</DateTimeText>
                    </DateTimeButton>
                </Label>
                
                <Modal
                    visible={showDatePicker}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={handleModalClose}
                >
                    <ModalOverlay 
                        onPress={handleModalClose}
                        activeOpacity={1}
                    >
                        <ModalContainer>
                            <PickerContainer>
                                <DateTimePicker
                                    value={getPickerValue()}
                                    mode={inputType === "date" ? "date" : "time"}
                                    display="spinner"
                                    onChange={handleDateTimeChange}
                                    locale="pt-BR"
                                    textColor="#000000"
                                />
                            </PickerContainer>
                        </ModalContainer>
                    </ModalOverlay>
                </Modal>
            </>
        );
    }

    return (
        <Label 
            width={width}
            height={height}
        >
            <Title>{title}</Title>
            <Container 
                ref={inputRef}
                height={height}
                value={getDisplayValue()}
                onChangeText={inputOnChangeText}
                {...rest}
            />
        </Label>
    );
}