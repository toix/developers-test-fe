const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const mode = argv.mode === 'development' && !argv.p ? 'development' : 'production';
    console.log('-------------> building for '+ mode +' <-------------'+"\n");

    return {
        mode: mode,
        resolve: {
            // node modules path
            modules: ['node_modules']
        },
        entry: {
            // destination of wepack package
            index: './index.js',
        },
        output: {
            // destination of webpack package
            path: path.resolve(__dirname, ''),
            filename: 'public/bundle.js',
            publicPath: '../'
        },
        plugins: [
            // serve jQuery to included modules
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.$': 'jquery',
                'window.jQuery': 'jquery'
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "public/[name].css",
                chunkFilename: "public/[id].css"
            })
        ],
        // https://github.com/webpack-contrib/mini-css-extract-plugin/blob/master/README.md
        module: {
            rules: [
                {
                    // compile scss to css
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                sourceMap: true,
                                indentedSyntax: true
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                minimize: true,
                            }
                        }
                    ]
                },
                {
                    // Babel for ES6 compatibility
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                ['@babel/plugin-proposal-class-properties', { 'loose': true }],
                            ],
                        }
                    }
                }
            ]
        },
        optimization: {
            minimizer: [
                // minimize JavaScript
                new TerserPlugin({
                    exclude: /.*/,  // @todo define exclude for library
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                })
            ]
        },
    };
};