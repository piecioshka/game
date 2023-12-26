'use strict';

const pkg = require('../../package.json');

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'string-replace-loader',
        options: {
          search: '{{game.version}}',
          replace: pkg.version,
        },
      },
    ],
  },
};
