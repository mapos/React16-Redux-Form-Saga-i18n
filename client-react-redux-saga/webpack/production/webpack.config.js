const path = require("path");

var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var CompressionPlugin = require('compression-webpack-plugin')
var I18nPlugin = require("i18n-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var definePluginData = require("./definePlugin.config.js");

var languages = {
  pl: require("../../locales/pl.json"),
};

const DEBUG = true;

module.exports = Object.keys(languages).map(function (language) {
  return {
    name: language,
    // devtool: 'source-map',
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
      path: path.join(__dirname, "../../dist/"),
      publicPath: "/",
      filename: "bundle." + language + ".js",
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({ debug: DEBUG }),
      new webpack.DefinePlugin(definePluginData),
      new ExtractTextPlugin("styles.css"),
      new I18nPlugin(languages[language], { functionName: "i18n" }),
      new UglifyJSPlugin(),
      //  new webpack.optimize.CommonsChunkPlugin('common'),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      //   new CompressionPlugin({
      //         asset: "[path].gz[query]",
      //         algorithm: "gzip",
      //         test: /\.js$|\.css$|\.html$/,
      //         threshold: 10240,
      //         minRatio: 0.8
      // })
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader",
          }),
        },
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".css"],
    },
  };
});
