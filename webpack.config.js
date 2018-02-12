const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: {
    chrome: './extension/src/chrome/extension.ts'
  },

  output: {
    filename: './extension/build/[name]/extension.js'
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },

  plugins: [
      new CheckerPlugin()
  ]
};
