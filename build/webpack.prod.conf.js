var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var merge = require('webpack-merge');
var WebpackChunkHash = require('webpack-chunk-hash');
var MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var baseWebapckConfig = require('./webpack.base.conf');
var config = require('./config');

var oEntry = baseWebapckConfig.entry,
    aEntry = Object.keys(oEntry);

var aPlugin = [
    new MiniCssExtractPlugin({
    　　filename: config.prod.path.style + "[name].[chunkhash:8].css",
    　　chunkFilename: config.prod.path.style + "[name].[chunkhash:8].css"
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEV__: JSON.stringify(JSON.parse('false'))
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.HashedModuleIdsPlugin(),    
    new WebpackChunkHash(),
    new BundleAnalyzerPlugin()
];

//html webpack
aEntry.forEach(function(item) {
    aPlugin.push(new HtmlWebpackPlugin({
        filename: item + '.html',
        template: config.sBase + 'pages/' + item + '/' + item + '.ejs',
        chunks: ['vendor', 'common', item],
        inject: 'body',
        title: item + 'Page',
        minify: {
            removeComments: false,
            collapseWhitespace: false,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
    }));
});

module.exports = merge(baseWebapckConfig, {
    mode: 'production',
    output: {
        path: config.sDist,
        filename: config.prod.path.script + '[name].[chunkhash:8].js',
        chunkFilename: config.prod.path.script + "[name].[chunkhash:8].js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { 
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        } 
                    },
                    { loader: 'postcss-loader'}
                ]
            },
            {
                test: /\.scss$/, 
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { 
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        } 
                    },
                    { loader: 'postcss-loader'},
                    { loader: 'sass-loader' }
                ]
            },
            // {
            //     test: /\.(svg)(\?.*)?$/,
            //     loader:'url',
            //     options: {
            //         limit: 2048,
            //         name: '/static/images/[name].[ext]'
            //     }
            // },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit:2048,
                            name:'/static/images/[name].[ext]'
                        }
                    },
                    // {
                    //     loader:'image-webpack-loader',
                    //     options:{
                    //         mozjpeg: {
                    //             quality: 65
                    //         },
                    //         pngquant:{
                    //             quality: "65-90",
                    //             speed: 4
                    //         },
                    //         svgo:{
                    //             plugins: [
                    //                 {
                    //                 removeViewBox: false
                    //                 },
                    //                 {
                    //                 removeEmptyAttrs: false
                    //                 }
                    //             ]
                    //         }
                    //     }
                    // }
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        runtimeChunk: {
            name: function(entry){
                return entry.name + '-manifest';
            }
        },
        splitChunks: {
            automaticNameDelimiter:'-',
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /react|react-dom|react-router|redux|react-redux|react-router-redux/,   // 指定是node_modules下的第三方包 /[\\/]node_modules[\\/]/
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10    
                },
                common: { // 抽离自己写的公共代码，utils这个名字可以随意起
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'common',  // 任意命名
                    enforce: true
                }
            }
        }
    },
    plugins: aPlugin,
    // devtool: 'cheap-module-source-map'
});