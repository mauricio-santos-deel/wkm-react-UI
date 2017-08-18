var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    APP_DIR + '/main.js'
  ],
  
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  
  resolve: {
    extensions: ['.js', '.jsx']
  },
  
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        use : 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ]
  },

  devServer: {
    hot: true,
    contentBase: BUILD_DIR,
    publicPath: '/',
    port: 3000,
    historyApiFallback: true, // makes it compatible with react-router
    proxy: {
      '/product-service': {
        target: 'http://localhost:9999/',
        secure: false
      }
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ]
};

module.exports = config;