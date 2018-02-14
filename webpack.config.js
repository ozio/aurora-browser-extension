const { CheckerPlugin } = require('awesome-typescript-loader');

const extensionInputPath = './extension/src';
const extensionOutputPath = './extension/build';

module.exports = {
  entry: {
    chrome: `${extensionInputPath}/chrome/index.ts`,
    firefox: `${extensionInputPath}/firefox/index.ts`
  },

  output: {
    filename: `${extensionOutputPath}/[name]/extension.js`
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
          }
        }
      },
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
