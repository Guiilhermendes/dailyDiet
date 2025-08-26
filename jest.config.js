module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@storage/(.*)$': '<rootDir>/src/storage/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '\\.(png|jpg|jpeg|gif)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|@expo|@react-navigation|react-native-uuid|uuid|phosphor-react-native)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/assets/**',
    '!src/@types/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'html'],
};