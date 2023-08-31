const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    entry: './src/index.js', //入口文件
    output: {
        path: path.resolve(__dirname,'dist'), //输出文件夹
        filename: '[name].js',
        chunkFilename: '[name].[hash].js',
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        open:true, // 开启服务器时，自动打开页面
        port: 3000,
    },
    mode: "development",
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
        }),
        new BundleAnalyzerPlugin()  //创建一个可交互的树形地图，以展示打包后文件的大小
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}