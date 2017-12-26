const path = require('path');
let webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {

    /**
     * Minimal build setup.
     * Create your app bundle.
     */

    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public', 'assets', 'scripts')
    },
    module: {
        rules: [
            {test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src')},
            {test: /pixi\.js/, use: ['expose-loader?PIXI']},
            {test: /phaser-split\.js$/, use: ['expose-loader?Phaser']},
            {test: /p2\.js/, use: ['expose-loader?p2']},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    },
    plugins: [],

    /**
     * Minimal development setup.
     * Serves files in ./public folder.
     * Refresh browser automatically when your bundle changes.
     */

    devServer: {
        publicPath: '/assets/scripts/',
        contentBase: path.join(__dirname, 'public'),
        port: 5050
    }

};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new UglifyJsPlugin()
    )
}