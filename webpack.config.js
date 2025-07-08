const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./customEditor/src/editor.tsx",
  output: {
    path: path.resolve(__dirname, "static", "editor"),
    filename: "bundle.js",
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devServer: {
    static: path.resolve(__dirname, "static"),
    compress: true,
    port: 3000,
    hot: true,
    watchFiles: ["customEditor/src/**/*"],
    open: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: require.resolve("process/browser"),
      Buffer: ["buffer", "Buffer"],
    }),
    new Dotenv(),
  ],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify"),
      process: require.resolve("process/browser"),
      util: require.resolve("util/"),
      crypto: require.resolve("crypto-browserify"),
      fs: false,
    },
    alias: {
      "process/browser": require.resolve("process/browser"),
      "@docusaurus": path.resolve(__dirname, "node_modules", "@docusaurus"),
      "@theme": path.resolve(
        __dirname,
        "node_modules",
        "@docusaurus",
        "theme-classic",
        "src",
        "theme"
      ),
      "@src": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
  optimization: {
    concatenateModules: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.mdx?$/,
        use: ["babel-loader", "@mdx-js/loader"],
      },
    ],
  },
};
