// es5
'use strict';

var webpack = require('webpack');
var postcss = require('postcss');
var path = require('path');
var sass = require('node-sass');
// var jquery = require('jquery');
// var backbone = require('backbone');
// var underscore = require('underscore');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require('webpack-vendor-chunk-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env.NODE_ENV;

if (env == 'development' || env == null) {
    var config = {
        devServer: {
            contentBase: './',
            port: 3000
        },
        devtool: 'source-map',
        cache: false,
        module: {
            loaders: [{
                test: /\.js$/,
                loaders: ['babel-loader?presets[]=react&presets[]=es2015&cacheDirectory'],
                exclude: /node_modules/
            }, {
                /* Use the line below when to load CSS separately*/ 
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader?sourceMap=inline')
                /* /Use the line below when to load CSS separately*/ 

                /* Use the line below when to load CSS from JS file*/ 
                    // test: /\.css$/,
                    // loaders: ['style-loader', 'css-loader', 'postcss-loader?sourceMap=inline']
                /* /Use the line below when to load CSS from JS file*/ 
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=10'
            }]
        },
        entry: {
            // vendor: ['jquery', 'backbone', 'underscore'],
            'index': 'index.js'
        },
        output: {
            path: __dirname,
            publicPath: __dirname,
            filename: './dist/index.js'
            // filename: './dist/[name].js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            /* Use the line below when to load CSS separately*/ 
                new ExtractTextPlugin('./dist/css/style.css', {
                    allChunks: true
                }),
            /* /Use the line below when to load CSS separately*/ 
        ],
        resolve: {
            extensions: ['', '.json', '.js', '.jsx'],
            modulesDirectories: ['node_modules', __dirname]
        }
    }
}


if (env == 'production') {
    var config = {
        devServer: {
            contentBase: './',
            port: 3000
        },
        devtool: 'source-map',
        module: {
            loaders: [{
                test: /\.js$/,
                loaders: ['babel-loader?presets[]=react&presets[]=es2015&cacheDirectory'],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader?sourceMap=inline']
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=10'
            }]
        },
        entry: {
            'index': 'index.js',
        },
        output: {
            path: __dirname,
            publicPath: __dirname,
            filename: './dist/index.js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new ExtractTextPlugin('./dist/css/style.css', {
                allChunks: true
            }),
            new CommonsChunkPlugin('commons.chunk.js')
        ],
        resolve: {
            extensions: ['', '.json', '.js', '.jsx'],
            modulesDirectories: ['node_modules', __dirname]
        }
    }
}

module.exports = config;
