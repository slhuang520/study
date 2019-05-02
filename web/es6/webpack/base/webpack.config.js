/**
 * Created by DreamCatcher on 2017/11/1.
 * 如果没有这个配置文件，需要使用如下命令手动打包：node_modules\.bin\webpack js\requireAddDiv1.js dist\bundle.js
 * 如果有这个配置文件，只需要使用如下命令就可以了：node_modules\.bin\webpack
 */
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    devtool: "eval-source-map",//生成Source Maps
    entry: "./js/requireAddDiv1.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle-[hash].js"
    },
    devServer: {
        contentBase: "./",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
        //hot: true
    },
    module: {
        /*在webpack2.0版本已经将 module.loaders 改为 module.rules 为了兼容性考虑以前的声明方法任然可用，
　　　　　　同时链式loader(用!连接)只适用于module.loader，
　　　　　　同时-loader不可省略
　　　　　　*/
        /*loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: "babel-loader"
            },
            {
                //test: /\.\/css\/*\.css$/,//这种方式精确定位
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ],*/
        rules: [
            /*{
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node-modules/ //注意这里没有使用引号
            },*/
            {
                test: /\.css$/,
                use: [ //引入多个loader的方法
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            // modules: true // 设置css模块化,详情参考https://github.com/css-modules/css-modules
                        }
                    },
                    /*{
                        loader: 'postcss-loader',
                        // 在这里进行配置，也可以在postcss.config.js中进行配置，详情参考https://github.com/postcss/postcss-loader
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }*/
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，盗版必究！'),
        new HtmlWebpackPlugin({
            template: __dirname + "/index.temp.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        //new webpack.HotModuleReplacementPlugin()
    ]
};