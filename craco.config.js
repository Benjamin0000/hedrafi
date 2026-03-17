module.exports = {
  webpack: {
    configure: (config) => {
      config.ignoreWarnings = [/source map/];
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "@react-native-async-storage/async-storage": false,
      };
      return config;
    }
  },
  
  eslint: {
    enable: false 
  }
};