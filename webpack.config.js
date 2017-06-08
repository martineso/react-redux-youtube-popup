var debug = process.env.NODE_ENV !== "production"
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/index.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            'react-html-attrs', 
            'transform-class-properties', 
            'transform-decorators-legacy',
            ],
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: [{
                loader: 'style-loader',
            }],
            use: [{
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                },
            },
          ],
        })
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('./css/styles.css')
  ],
  output: {
    path: __dirname + "/src/",
    filename: "bundle.min.js"
  },
};