module.exports = {
  testEnvironment: 'jsdom', // Para pruebas de React
  transformIgnorePatterns: [
    'node_modules/(?!axios|axios-mock-adapter)', // Permite que Jest transforme `axios`
  ],
  moduleNameMapper: {
    '^axios$': 'axios/dist/node/axios.cjs',
  },
};
