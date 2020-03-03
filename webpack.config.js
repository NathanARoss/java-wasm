const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = {
    node: {
        fs: 'empty'
    },
    mode: 'production',
    entry: './src/webpack-entry.js',
    output: {
        path: __dirname,
        filename: "monaco.bundle.js",
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new MonacoWebpackPlugin({
            languages: ["cpp"]
        })
    ]
};