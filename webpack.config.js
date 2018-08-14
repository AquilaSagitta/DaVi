const path = require("path"),
    debug = process.env.NODE_ENV !== "production",
    webpack = require('webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
    mode: 'production',
    context: __dirname,
    devtool: debug ? "inline-sourcemaps" : null,
    entry: {
        main: [
            "./src/js/index.js",
            "./src/scss/main.scss"
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].min.js"
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
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: debug ? [
        new MiniCssExtractPlugin({
            filename: 'css/[name].min.css'
        }),
        new HtmlWebpackPlugin(),
        new ImageminPlugin()
    ] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemaps: false}),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        }),
        new HtmlWebpackPlugin(),
        new ImageminPlugin()
    ]
};