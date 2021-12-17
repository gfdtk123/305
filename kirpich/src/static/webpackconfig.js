var packageJSON = require("./package.json");
var path = require("path");
var webpack = require("webpack");
module.exports = {
  devtool: "source-map",
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "generated"),
    filename: "app-bundle.js"
  },
  resolve: { extensions: [".js", ".jsx"] },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: "3000",
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    hot: true,
    proxy: {
      "/*": {
        target: "http://localhost:8080"
      }
    }
  }
};
