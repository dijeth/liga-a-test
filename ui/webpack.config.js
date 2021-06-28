const path = require('path');
const webpack = require('webpack');

const root = process.env.ROOT_ROUTE === 'false' ? '/' : process.env.ROOT_ROUTE;

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    open: false,
    port: 1338,
    historyApiFallback: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      ROOT_ROUTE: JSON.stringify(root),
    }),
  ],
};
