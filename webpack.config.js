const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const themeVariables = lessToJs(
    fs.readFileSync(path.resolve(__dirname, 'src/styles/variables.less'), 'utf8')
  );
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
                test: /\.(sc|c|le)ss$/,  //使用loader的文件类型
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                          sourceMap: true,
                          lessOptions: {
                            modifyVars: themeVariables,
                          },
                        },
                      },
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
            },
            {
                test: /\.(mp3|wav|ogg)$/i, // 匹配音频文件扩展名
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'audio/[name].[ext]', // 输出的文件路径和名称
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        // new UglifyJsPlugin({
        //     cache: true,
        //     parallel: true,
        //     // sourceMap: true // set to true if you want JS source maps
        // }),
        // new OptimizeCSSAssetsPlugin(),
        new webpack.DefinePlugin({
             // 在这里定义你的全局变量
             API_ADDRESS:JSON.stringify("http://127.0.0.1:80"),
            THEME:JSON.stringify('light')

        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        // new BundleAnalyzerPlugin({
        //     //   analyzerMode: 'server',
        //       analyzerHost: '127.0.0.1',
        //       analyzerPort: '9000',
        //     //   reportFilename: 'report.html',
        //     //   defaultSizes: 'parsed',
        //     //   openAnalyzer: true,
        //     //   generateStatsFile: false,
        //     //   statsFilename: 'stats.json',
        //     //   statsOptions: null,
        //     //   excludeAssets: null,
        //     //   logLevel: info
        // })  //创建一个可交互的树形地图，以展示打包后文件的大小
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}