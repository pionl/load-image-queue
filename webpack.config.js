/* eslint-disable */
const webpack = require('webpack');
const DEBUG = process.env.NODE_ENV !== "production";

const libraryName = 'load-image-queue';
var outputFile = null;

if (DEBUG) {
    outputFile = libraryName + '.js';
} else {
    outputFile = libraryName + '.min.js';
}


// Create the options
const options = {
    entry: './src/index.js',
    output: {
        path: __dirname + "/dist",
        publicPath: '/',
        filename: outputFile,
        library: 'LoadImageQueue',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules|bower_components/
            }
        ]
    },
    plugins: [
        // Needed for hot-reloading
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};

// add extra data to the production env.
if (DEBUG) {
    options.devtool = "eval-source-maps";
} else {
    options.devtool = 'cheap-module-source-map';
    // optimize the code
    options.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true
        },
        sourceMap: true
    }));
}

module.exports = options;