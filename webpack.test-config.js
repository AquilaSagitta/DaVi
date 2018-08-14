const path = require("path");

module.exports = {
    mode: "development",
    target: 'node',
    node: {
        fs: 'empty',
        child_process: 'empty'
    },
    entry: "./test/test.js",
    output: {
        path: path.resolve(__dirname, "dist-test"),
        filename: "tests.js"
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
            }
        ]
    }
};