const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: './src/index.js', //入口文件
    output: {
        path: path.resolve(__dirname,'dist'), //输出文件夹
        filename: '[name].js',
        chunkFilename: '[name].[hash].js',
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,  //使用loader的文件类型
                exclude: /node_modules/,  //排除node_modules文件夹
                use: {
                    loader: 'babel-loader'  //使用babel-loader转译JavaScript
                }
            },
            {
                test: /\.css$/,  //使用loader的文件类型
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options:{
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}