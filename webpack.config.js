const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: ["whatwg-fetch", "./src/index.js"],
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, "build")
    },
    devServer: {
        contentBase: path.join(__dirname, "/"),
        publicPath: "/build/",
        compress: true,
        port: 3000,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(html)$/,
                use: ["html-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
        ]},
            plugins: [
            new CopyPlugin([
                {
                from: "./index.html",
                to: "index.html",
                }
            ])
            ],
        devtool: "cheap-module-eval-source-map"
};