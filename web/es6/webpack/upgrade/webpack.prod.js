const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
    devtool: "source-map", // 生产环境也可以设置，有点儿影响性能，但方便调试
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {// 处理图片，会在 output 目录中生成图片文件，js 中需要使用 require("*.jpg")先行引入才可以，同样 html 中通过 background-image 设置的图片不可以，但 css 中通过 background-image 设置的图片可以
                test: /\.(jpg|png)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "images/", // 这里的 images 貌似没什么作用，但不写不行，可以是任意的一个或多个字符
                        name: "[name].[ext]",
                        useRelativePath: true// 这个必须与 outputPath 结合使用才可以处理 css 中的引入的图片
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin("版权所有，盗版必究！"),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        // new webpack.optimize.OccurrenceOrderPlugin(), // 现在是默认启用,不再需要手动启动
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false// remove all comments
            },
            compress: {
                warnings: false
            },
            sourceMap: true // 如果你在压缩代码时启用了 source map，或者想要让 uglifyjs 的警告能够对应到正确的代码行，你需要将 UglifyJsPlugin 的 sourceMap 设为 true。
        }),
        new ExtractTextPlugin("css/styles.css") // 可以单独设置css的路径
    ]
});
