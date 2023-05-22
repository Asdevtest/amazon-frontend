module.exports = {
  modulePathIgnorePatterns: ['src/services'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@constants/(.*)': ['<rootDir>/src/constants/$1'],

    '@utils/(.*)': ['<rootDir>/src/utils/$1'],

    '@models/(.*)': ['<rootDir>/src/models/$1'],
    '@navigation/(.*)': ['<rootDir>/src/navigation/$1'],
    '@services/(.*)': ['<rootDir>/src/services/$1'],
    '@styles/(.*)': ['<rootDir>/src/styles/$1'],
    '@components/(.*)': ['<rootDir>/src/ui/components/$1'],
    '@views/(.*)': ['<rootDir>/src/ui/views/$1'],
    '@typings/(.*)': ['<rootDir>/src/types/$1'],
    '@contexts/(.*)': ['<rootDir>/src/contexts/$1'],
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  // verbose: true,

  // scriptPreprocessor: '<rootDir>/node_modules/babel-jest',
  // plugins: ['@babel/plugin-transform-modules-commonjs'],
  // extensionsToTreatAsEsm: ['.ts'],
  // moduleDirectories: ['node_modules', 'src'],
  // allowSyntheticDefaultImports: true,
  // esModuleInterop: true,
}
