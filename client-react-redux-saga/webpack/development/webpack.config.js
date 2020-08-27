const path = require("path");

const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const I18nPlugin = require("i18n-webpack-plugin");

const definePluginData = require("./definePlugin.config.js");

const languages = {
  pl: require("../../locales/pl.json"),
};

const DEBUG = true;

module.exports = Object.keys(languages).map(function (language) {
  return {
    name: language,
    devtool: "cheap-module-source-map",
    entry: ["react-hot-loader/patch", "babel-polyfill", "./src/index.js"],
    output: {
      path: path.join(__dirname, "../../src/public/"),
      publicPath: "/",
      filename: "bundle." + language + ".js",
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({ debug: DEBUG }),
      new webpack.DefinePlugin(definePluginData),
      new MiniCssExtractPlugin({ filename: "nexss.css" }),
      new I18nPlugin(languages[language], { functionName: "i18n" }),
      // new HtmlWebPackPlugin({
      //   template: "./src/public/index.html",
      //   filename: "./index.html",
      // }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        // {
        //   test: /\.html$/,
        //   use: [
        //     {
        //       loader: "html-loader",
        //     },
        //   ],
        // },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".css"],
      alias: {
        "react-dom$": "react-dom/profiling",
        "scheduler/tracing": "scheduler/tracing-profiling",
      },
    },
    devServer: {
      contentBase: path.join(__dirname, "../../src/public/"),
      host: "127.0.0.1",
      port: 8080,
      hot: true,
      historyApiFallback: true,
    },
    devtool: "source-map",
  };
});
