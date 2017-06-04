'use strict';

const path = require('path'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        // gulp can't watch simulataneously w/ out subprocess
        './dist/spring.min': './src/spring.js',
        './example/spring.min': './src/spring.js',
    },
    output: {
        path: __dirname,
        filename: '[name].js',
        library: 'Spring',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src/spring.js'),
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new UglifyJSPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'example'),
        port: 5000,
        compress: true
    }
}