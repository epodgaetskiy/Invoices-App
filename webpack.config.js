const {resolve} = require("path")
const webpack = require("webpack")

const config = {
    entry: ["./public/app/index.js"],
    output: {
        filename: "bundle.js",
        path: resolve(__dirname, "./public/js"),
        publicPath: '/public/'
    },

    devtool: "",

    resolve: {
        extensions: [".jsx", ".js", ".json"]
    },

    context: resolve(__dirname),

    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    babelrc: false,
                    presets: [
                        "react",
                        ["es2015", {"modules": false}],
                        "stage-0"
                    ],
                    plugins: [
                        "transform-runtime",
                        "transform-decorators-legacy"
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ]
}

module.exports = config
