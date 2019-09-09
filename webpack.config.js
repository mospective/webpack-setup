const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true,
                        interpolate: true
                    }
                }]
            },
            {
                test: /\.(scss|sass)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [autoprefixer({
                            grid: true
                        })]
                    }
                }, "sass-loader"]
            },

            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 5000,
                        name: "assets/[hash].[ext]",
                        quality: 75

                    }
                }]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/',
                      publicPath: 'fonts/'
                    }
                  }
                ]
              }



        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack template test',
            template: './src/index.html',
            inject: true,
            filename: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};