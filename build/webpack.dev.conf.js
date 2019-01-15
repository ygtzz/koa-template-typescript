var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var baseWebapckConfig = require('./webpack.base.conf');
var config = require('./config');
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var aPlugin = [
    //for dev show static images
    new CopyWebpackPlugin([{ from: 'src/static', to: 'static' }]),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        __DEV__: JSON.stringify(JSON.parse('true'))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
];

var oEntry = baseWebapckConfig.entry,
    aEntry = Object.keys(oEntry);

aEntry.forEach(function(item){
    aPlugin.push(new HtmlWebpackPlugin({
        filename: item + '.html',
        template: config.sBase + 'pages/' + item + '/' + item + '.ejs',
        chunks: [item],
        inject: 'body',
        title: item + ' Page'
    }));
});

module.exports = merge(baseWebapckConfig,{
    mode: 'development',    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader'},
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
                    { loader: 'style-loader' },
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
            {   
                test: /\.vue$/, 
                loader: 'vue-loader',
                options:{
                    loaders: {
                        css: "vue-style-loader!css-loader!postcss-loader",
                        sass: "vue-style-loader!css-loader!postcss-loader!sass-loader",
                        scss: "vue-style-loader!css-loader!postcss-loader!sass-loader"
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '/static/images/[name].[ext]'
                }
            }
        ]
    },
    plugins: aPlugin,
    devtool: 'cheap-source-map',
    devServer: {
        open:               true, 
        contentBase:        config.sDist,
        port:               config.dev.port,
        hot:                true,
        historyApiFallback: true,
        inline:             true,
        proxy: config.dev.proxy  
    }
});
