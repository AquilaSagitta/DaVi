const path = require("path"),
  debug = process.env.NODE_ENV !== "production",
  webpack = require('webpack'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ImageminPlugin = require('imagemin-webpack-plugin').default,
  Cleanup = require('webpack-cleanup-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  context: __dirname,
  devtool: debug ? "inline-sourcemaps" : false,
  entry: {
    main: [
      "./src/js/index.js",
      "./src/scss/main.scss"
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[hash].min.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer'),
                  require('cssnano')
                ];
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: debug ? [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].min.css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ImageminPlugin(),
    new Cleanup(),
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].min.css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ImageminPlugin(),
    new Cleanup(),
  ],
  optimization: {
    minimize: !debug
  }
};