'use strict';

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'examples/top-down-view/static/',
          to: 'top-down-view/static',
        },
        {
          from: 'examples/side-view/static/',
          to: 'side-view/static',
        },
        {
          from: 'examples/index.html',
          to: 'index.html',
        },
      ],
    }),
  ],
};
