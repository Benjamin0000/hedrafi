module.exports = {
  webpack: {
    configure: (config) => {
      config.ignoreWarnings = [/source map/];
      return config;
    }
  }
};
