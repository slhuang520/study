const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");//根据模板html生成引入js后的html
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const I18nPlugin  = require("i18n-webpack-plugin");
const languages = {
    en: require("./resources/en.json"),
    cn: require("./resources/zh-cn.json")
};


module.exports = Object.keys(languages).map(function (language) {
    return {
        name: language,
        devtool: "eval-source-map",
        entry: "./js/requireAddDiv.js",
        output: {
            path: __dirname + "/dist",
            filename: language + ".bundle.js"
        },
        devServer: {
            contentBase: "./",
            historyApiFallback: true,
            inline: true
        },
        module: {
            rules: [
                {
                    test: /(\.jsx|\.js)$/,
                    use: {
                        loader: "babel-loader?cacheDirectory=true",
                        options: {
                            presets: ["env", "react"],
                            plugins: ["transform-runtime"]
                        }
                    },
                    exclude: /node_modules/
                },
                /*{//这种方式只是解析 css，并不会分离 css
                    test: /\.css$/,
                    use: [
                        "style-loader",// 将 JS 字符串生成为 style 节点
                        {
                            loader: "css-loader",// 将 CSS 转化成 CommonJS 模块
                            options: {
                                module: true
                            }
                        },
                        {
                            loader: "postcss-loader",//可以自动添加前缀
                            options: {
                                plugins: function () {
                                    return [
                                        require("autoprefixer")
                                    ];
                                }
                            }
                        }
                    ]
                }*/
                {//分离css需要使用这样的形式
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            "css-loader",
                            {
                                loader: "postcss-loader",//可以自动添加前缀
                                options: {
                                    plugins: function () {
                                        return [
                                            require("autoprefixer")
                                        ];
                                    }
                                }
                            }
                        ]
                    })
                },
                {//处理图片，会在 output 目录中生成图片文件，js 中需要使用 require("*.jpg")先行引入才可以，同样 html 中通过 background-image 设置的图片不可以，但 css 中通过 background-image 设置的图片可以
                    test: /\.(jpg|png)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            outputPath: "images/",//这里的 images 貌似没什么作用，但不写不行，可以是任意的一个或多个字符
                            name: "[name].[hash:8].[ext]",//8表示截取 hash 的长度
                            useRelativePath: true//这个必须与 outputPath 结合使用才可以处理 css 中的引入的图片
                        }
                    }
                },
                {//处理 html 中通过 img 引入的图片，background-image 设置的图片不可以
                    test: /\.html$/,
                    use: "html-loader"
                }
            ]
        },
        plugins: [
            new webpack.BannerPlugin("版权所有，盗版必究！"),
            new HtmlWebpackPlugin({
                template: __dirname + "/index.temp.html"
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false,  // remove all comments
                },
                compress: {
                    warnings: false
                }
            }),
            new ExtractTextPlugin("css/styles-[hash].css"),
            new I18nPlugin(languages[language])
        ]
    }
});
