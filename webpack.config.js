const webpack = require('webpack'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  path = require('path'),
  devDir = path.resolve(__dirname, './app/dev/js'),
  distDir = path.resolve(__dirname, './app/dist/js'),
  paths = {
    context: devDir,
    output: distDir
  },
  isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

var config = [
  {
    context: paths.context,
    entry: {
      'common': './pages/common',
      'home-page': './pages/home-page'
    },
    output: {
      path: paths.output,
      filename: '[name].js'
    },
    resolve: {
      extensions: ['*', '.js'],
      modules: ['node_modules'],
      alias: {
        
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
              presets: ['env']
          }
        }
      ]
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    devtool: isDevelopment ? 'cheap-inline-module-source-map' : false,
    watch: isDevelopment
  }
];

if (!isDevelopment) {
  config.push({
    context: paths.context,
    entry: {
      'common.min': './pages/common',
      'home-page.min': './pages/home-page'
    },
    output: {
      path: paths.output,
      filename: '[name].js'
    },
    resolve: {
      extensions: ['*', '.js'],
      modules: ['node_modules'],
      alias: {
        
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      ]
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common.min'
      }),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new UglifyJSPlugin({
        compress: {
          warnings: false,
          unsafe: true
        },
        include: /\.min\.js$/
      })
    ],
    devtool: false,
    watch: false
  });
}

module.exports = config;
