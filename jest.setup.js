import '@testing-library/jest-native/extend-expect';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useFocusEffect: jest.fn(),
}));

jest.mock('react-native-uuid', () => ({
  v4: () => 'test-uuid',
}));

const mockTheme = {
  COLORS: {
    WHITE: '#FFFFFF',
    GREEN: '#CBE4B4',
    GREEN_LIGHT: '#E5F0DB',
    GREEN_DARK: '#639339',
    RED: '#F3BABD',
    RED_LIGHT: '#F4E6E7',
    RED_DARK: '#BF3B44',
    GRAY_1: '#1B1D1E',
    GRAY_2: '#333638',
    GRAY_3: '#5C6265',
    GRAY_4: '#B9BBBC',
    GRAY_5: '#DDDEDF',
    GRAY_6: '#EFF0F0',
    GRAY_7: '#FAFAFA',
  },
  FONT_FAMILY: {
    REGULAR: 'NunitoSans_400Regular',
    BOLD: 'NunitoSans_700Bold',
  },
  FONT_SIZE: {
    PP: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 24,
    XG: 32,
  },
};

jest.mock('styled-components/native', () => {
  const actualSC = jest.requireActual('styled-components/native');
  return {
    ...actualSC,
    useTheme: () => mockTheme,
  };
});

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');