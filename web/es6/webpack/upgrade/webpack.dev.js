const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
    devtool: "eval-source-map", // 仅在开发过程中使用
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[hash].js"
    },
    devServer: {
        contentBase: "./",
        historyApiFallback: true,
        inline: true
        // hot: true // hot module replacement. Depends on HotModuleReplacementPlugin
    },
    module: {
        rules: [
            {// 处理图片，会在 output 目录中生成图片文件，js 中需要使用 require("*.jpg")先行引入才可以，同样 html 中通过 background-image 设置的图片不可以，但 css 中通过 background-image 设置的图片可以
                test: /\.(jpg|png)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "images/", // 这里的 images 貌似没什么作用，但不写不行，可以是任意的一个或多个字符
                        name: "[name].[hash:8].[ext]", // 8表示截取 hash 的长度
                        useRelativePath: true// 这个必须与 outputPath 结合使用才可以处理 css 中的引入的图片
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/styles-[hash].css") // 可以单独设置css的路径
        // new webpack.NamedModulesPlugin(), // 以便更容易查看要修补(patch)的依赖
        // new webpack.HotModuleReplacementPlugin() // 使用 hot 导致页面不能自动刷新？
    ]
});
