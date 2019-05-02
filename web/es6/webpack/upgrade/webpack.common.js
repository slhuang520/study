const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: "./js/requireAddDiv.js"
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: "babel-loader?cacheDirectory=true", // 使用cache提升编译速度
                    options: {
                        presets: ["env", "react"],
                        plugins: ["transform-runtime"]// 避免重复引入
                    }
                },
                exclude: /node_modules/
            },
            {// 分离 css
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.html$/,
                use: "html-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.temp.html")
        })
    ]
};
