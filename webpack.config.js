const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: 
    { 
      app: './src/js/index.js'
    },
  mode: 'development',
  devServer: {
    open: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use:['style-loader', 'css-loader']
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/song-playing.html',
      filename: 'song-playing.html',
      chunks:['app']
    })
  ]
};