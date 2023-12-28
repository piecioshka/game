'use strict';

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'examples/top-down-view/assets/',
          to: 'top-down-view/assets',
        },
        {
          from: 'examples/side-view/assets/',
          to: 'side-view/assets',
        },
        {
          from: 'examples/index.html',
          to: 'index.html',
        },
      ],
    }),
  ],
};
