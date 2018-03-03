const { CheckerPlugin } = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const extensionInputPath = './src';
const extensionOutputPath = './build';

module.exports = {
  entry: {
    chrome: `${extensionInputPath}/chrome/index.ts`,
    firefox: `${extensionInputPath}/firefox/index.ts`,
  },

  output: {
    filename: `${extensionOutputPath}/[name]/extension.js`,
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'file-loader',
        options: {
          name: (file) => {
            const relativeManifestPath = file.split('/').slice(-2).join('/');
            return `${extensionOutputPath}/${relativeManifestPath}`;
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              failOnError: false,
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },

  plugins: [
    new CheckerPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};
