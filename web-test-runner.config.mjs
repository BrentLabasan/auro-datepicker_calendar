export default {
  files: "test/**/*.test.js",
  nodeResolve: true,
  coverageConfig: {
    threshold: {
      statements: 20,
      branches: 20,
      functions: 20,
      lines: 20
    }
  }
};
