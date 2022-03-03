const path = require('path');
const pkg = require('./package.json');
const nodeExternals = require('webpack-node-externals');

// https://itnext.io/how-to-package-your-react-component-for-distribution-via-npm-d32d4bf71b4f
// https://github.com/facebook/react/issues/13991#issuecomment-435587809
module.exports = {
    entry: "./src/FileInput.js",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "main.js",
      library: pkg.name,
      libraryTarget: "umd",
      umdNamedDefine: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        }
      ]
    },
    target: 'node',
    resolve: {
      alias: {
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom')
      }
    },
    externals: [nodeExternals()]
};