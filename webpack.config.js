const path = require("path");

module.exports = {
    entry: "./src/index.js",
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg)$/,  
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000
                        }
                    }
                ]
            }
        ]
    }
};
