module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],

  // moduleDirectories: [
  //   '.',
  //   'src',
  //   'node_modules'
  // ],

  moduleFileExtensions: [
    'js',
    'jsx'
  ],

  rootDir: './src',

  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/components$1'
  },

  // modulePaths: ['src'],

  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  }
}
