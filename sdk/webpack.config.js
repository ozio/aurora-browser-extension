const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: './sdk/src/index.ts',
  output: {
    filename: `./sdk/build/sdk.js`
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  devtool: 'source-map',

  module: {
    rules: [
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
        loader: 'awesome-typescript-loader'
      },
    ],
  },

  plugins: [
    new CheckerPlugin(),
  ],
};
