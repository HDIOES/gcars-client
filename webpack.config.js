var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtendedDefinePlugin = require('extended-define-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

var urlConfig = {
    URL: 'ws://localhost:8087/receive'
};

module.exports = {
    entry: './src/game.ts',
    output: {
        pathInfo: true,
        filename: '[name].bundle.js',
        path: path.resolve('./dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/assets',
                to: './assets'
            }
        ]),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
        }),
        new ExtendedDefinePlugin(urlConfig),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {test: /pixi\.js/, loader: 'expose?PIXI'},
            {test: /phaser-split\.js$/, loader: 'expose?Phaser'},
            {test: /p2\.js/, loader: 'expose?p2'},
            {test: /\.ts?$/, loader: 'ts', exclude: '/node_modules/'}
        ]
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        alias: {
            'phaser-ce': phaser,
            'pixi': pixi,
            'p2': p2
        }
    },
    devtool: 'source-map'
};
