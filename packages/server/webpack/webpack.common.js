const { resolve } = require("path");

module.exports = {
  entry: {
    index: ["./src/index.ts"]
  },
  output: {
    filename: "[name].js",
    path: resolve("dist")
  },
  target: "node",
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    noParse: /ws|engine\.io/,
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
      // {
      //   test: /\.mjs$/,
      //   include: /node_modules/,
      //   type: "javascript/auto"
      // }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  }
};
