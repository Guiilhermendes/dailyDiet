import logoImg from '@assets/logo.png' 
import * as ImagePicker from 'expo-image-picker';
import { useState  } from "react";

import { 
    Logo,
    Container,
    ProfileImg,
    ChangesImgArea,
} from "./styles";

export function Header() {
    const [image, setImage] = useState('https://img.icons8.com/?size=100&id=15265&format=png&color=000000');

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            aspect: [4,4],
            allowsEditing: true,
            base64: true,
            quality: 1
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    return(
        <Container>
            <Logo source={logoImg}/>
            <ChangesImgArea onPress={handleImagePicker}  >
                <ProfileImg source={{ uri: image  }} />
            </ChangesImgArea>
        </Container>
    );
}