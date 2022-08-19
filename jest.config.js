module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],

  moduleFileExtensions: [
    'js',
    'jsx'
  ],

  rootDir: './',

  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1'
  },

  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],

  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  }
}
