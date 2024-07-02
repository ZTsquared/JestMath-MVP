// next.config.js

module.exports = {
  // Specify a custom directory for Next.js to look for pages
  pageExtensions: ["jsx"], // Include any other extensions you are using
  webpack(config, options) {
    config.resolve.alias["~"] = path.resolve(__dirname, "client/pages"); // Adjust the path as needed
    return config;
  },
};
