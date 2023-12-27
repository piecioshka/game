'use strict';

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'examples/no-collision-and-gravity/assets/',
          to: 'no-collision-and-gravity/assets',
        },
        {
          from: 'examples/index.html',
          to: 'index.html',
        },
      ],
    }),
  ],
};
