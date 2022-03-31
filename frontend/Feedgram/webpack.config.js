const webpack = require('webpack');

module.exports = {
  entry:  './public/index.web.js',
  output: {
    filename: './dist/bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(react-native-elements|react-native-vector-icons)\/).*/,
        use: {
          loader: 'babel-loader',
        },
      },{
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  devServer: {
    allowedHosts: 'all',
  },
};
