const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: './src/js/index.js',
  mode: 'development',
  devServer: {
    open: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    })
  ]
};