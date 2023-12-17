const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO-CHECK: Add and configure workbox plugins for a service worker and manifest file.
// TODO-CHECK: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', 
        filename: 'index.html',
        chunks: ['main'],
      }),
      // new HtmlWebpackPlugin({
      //   template: './src/install.html', // Path to your install HTML template
      //   filename: 'install.html',
      //   chunks: ['install'],
      // }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Your personal text editor',
        background_color: '#ffffff',
        theme_color: '#2196f3',
        icons: [
          {
            src: path.resolve('src/images/logo.png'), 
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('images'/*, 'icons'*/),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
      ],
    },
  };
};