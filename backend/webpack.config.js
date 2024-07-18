const path = require("path");

module.exports = {
  entry: "./app.js", // Your main entry point
  output: {
    filename: "main.bundle.js", // Output filename
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    // Add loaders here (explained later)
  },

  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert/"),
      crypto: require.resolve("crypto-browserify"),
      fs: false,
      // Add other fallbacks if needed
    },
  },
};
