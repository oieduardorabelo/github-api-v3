var path = require('path');

var webpack = {
  entry: {
    app: path.join(__dirname, '/assets/js/main.js')
  },
  output: {
    path: path.join(__dirname, '/dist/js'),
    publicPath: '/dist/js',
    filename: 'main.output.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, '/assets/js'),
        exclude: '/node_modules',
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = webpack;
